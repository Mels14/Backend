import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { GrupoPersona } from './entities/grupo-persona.entity';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { MensajeriaGateway } from '../mensajeria/mensajeria.gateway';

@Injectable()
export class GruposService {

    constructor(
        @InjectRepository(Grupo)
        private readonly grupoRepository: Repository<Grupo>,
        @InjectRepository(GrupoPersona)
        private readonly grupoPersonaRepository: Repository<GrupoPersona>,
        private readonly mensajeriaGateway: MensajeriaGateway,
    ) {}

    async findAll(): Promise<Grupo[]> {
        return this.grupoRepository.find({
            where: { activo: true, tipo: 'publico' },
            relations: ['miembros'],
        });
    }

    async findOne(id: number): Promise<Grupo> {
        const grupo = await this.grupoRepository.findOne({
            where: { id },
            relations: ['miembros'],
        });
        if (!grupo) throw new NotFoundException('Grupo no encontrado');
        return grupo;
    }

    async findByUsuario(userId: string): Promise<Grupo[]> {
        const membresías = await this.grupoPersonaRepository.find({
            where: { userId, bloqueado: false },
            relations: ['grupo', 'grupo.miembros'],
        });
        return membresías.map((m) => m.grupo);
    }

    // HU-3-006: Crear grupo
    async create(
        adminId: string,
        adminNombre: string,
        dto: CreateGrupoDto,
    ): Promise<Grupo> {
        if (dto.miembros.length < 2) {
            throw new BadRequestException('El grupo debe tener al menos 2 miembros además del creador');
        }

        const grupo = this.grupoRepository.create({
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            imagen: dto.imagen,
            tipo: dto.tipo,
            adminId,
            adminNombre,
            activo: true,
        });

        const grupoGuardado = await this.grupoRepository.save(grupo);

        // Agregar al admin como miembro
        const adminMiembro = this.grupoPersonaRepository.create({
            userId: adminId,
            nombre: adminNombre,
            rol: 'admin',
            grupo: grupoGuardado,
        });
        await this.grupoPersonaRepository.save(adminMiembro);

        // Agregar los demás miembros
        const miembros = dto.miembros.map((m) =>
            this.grupoPersonaRepository.create({
                userId: m.userId,
                nombre: m.nombre,
                rol: 'miembro',
                grupo: grupoGuardado,
            })
        );
        await this.grupoPersonaRepository.save(miembros);

        // Notificar a los miembros via WebSocket
        dto.miembros.forEach((m) => {
            this.mensajeriaGateway.enviarMensajeDirecto(m.userId, {
                tipo: 'bienvenida_grupo',
                grupoId: grupoGuardado.id,
                grupoNombre: grupoGuardado.nombre,
                mensaje: `Fuiste agregado al grupo "${grupoGuardado.nombre}"`,
            });
        });

        return this.findOne(grupoGuardado.id!);
    }

    async unirse(grupoId: number, userId: string, nombre: string): Promise<GrupoPersona> {
        const grupo = await this.findOne(grupoId);

        if (grupo.tipo === 'privado') {
            throw new BadRequestException('Este grupo es privado, solo por invitación');
        }

        const yaEsMiembro = await this.grupoPersonaRepository.findOne({
            where: { grupo: { id: grupoId }, userId },
        });

        if (yaEsMiembro) {
            if (yaEsMiembro.bloqueado) {
                throw new BadRequestException('Estás bloqueado de este grupo');
            }
            throw new BadRequestException('Ya eres miembro de este grupo');
        }

        const miembro = this.grupoPersonaRepository.create({
            userId,
            nombre,
            rol: 'miembro',
            grupo,
        });

        return this.grupoPersonaRepository.save(miembro);
    }

    async salir(grupoId: number, userId: string): Promise<{ mensaje: string }> {
        const miembro = await this.grupoPersonaRepository.findOne({
            where: { grupo: { id: grupoId }, userId },
            relations: ['grupo'],
        });

        if (!miembro) throw new NotFoundException('No eres miembro de este grupo');

        await this.grupoPersonaRepository.remove(miembro);

        return { mensaje: 'Saliste del grupo correctamente' };
    }

    async removerMiembro(grupoId: number, adminId: string, userId: string): Promise<{ mensaje: string }> {
        const grupo = await this.findOne(grupoId);

        if (grupo.adminId !== adminId) {
            throw new BadRequestException('Solo el administrador puede remover miembros');
        }

        const miembro = await this.grupoPersonaRepository.findOne({
            where: { grupo: { id: grupoId }, userId },
        });

        if (!miembro) throw new NotFoundException('El miembro no existe en este grupo');

        // Notificar al miembro removido
        this.mensajeriaGateway.enviarMensajeDirecto(userId, {
            tipo: 'removido_grupo',
            grupoId,
            grupoNombre: grupo.nombre,
            mensaje: `Fuiste removido del grupo "${grupo.nombre}"`,
        });

        await this.grupoPersonaRepository.remove(miembro);
        return { mensaje: 'Miembro removido correctamente' };
    }

    async bloquearMiembro(grupoId: number, adminId: string, userId: string): Promise<{ mensaje: string }> {
        const grupo = await this.findOne(grupoId);

        if (grupo.adminId !== adminId) {
            throw new BadRequestException('Solo el administrador puede bloquear miembros');
        }

        const miembro = await this.grupoPersonaRepository.findOne({
            where: { grupo: { id: grupoId }, userId },
        });

        if (!miembro) throw new NotFoundException('El miembro no existe');

        miembro.bloqueado = true;
        await this.grupoPersonaRepository.save(miembro);
        return { mensaje: 'Miembro bloqueado correctamente' };
    }

    async promoverMiembro(grupoId: number, adminId: string, userId: string): Promise<GrupoPersona> {
        const grupo = await this.findOne(grupoId);

        if (grupo.adminId !== adminId) {
            throw new BadRequestException('Solo el administrador puede promover miembros');
        }

        const miembro = await this.grupoPersonaRepository.findOne({
            where: { grupo: { id: grupoId }, userId },
        });

        if (!miembro) throw new NotFoundException('El miembro no existe');

        miembro.rol = 'admin';
        return this.grupoPersonaRepository.save(miembro);
    }

    async update(id: number, dto: UpdateGrupoDto): Promise<Grupo> {
        const grupo = await this.findOne(id);
        Object.assign(grupo, dto);
        return this.grupoRepository.save(grupo);
    }
}