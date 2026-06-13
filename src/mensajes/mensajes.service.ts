import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { DestinatarioPersona } from './entities/destinatario-persona.entity';
import { DestinatarioGrupo } from './entities/destinatario-grupo.entity';
import { Grupo } from '../grupos/entities/grupo.entity';
import { GrupoPersona } from '../grupos/entities/grupo-persona.entity';
import { CreateMensajeDirectoDto } from './dto/create-mensaje-directo.dto';
import { CreateMensajeGrupoDto } from './dto/create-mensaje-grupo.dto';
import { CreateAlertaMasivaDto } from './dto/create-alerta-masiva.dto';
import { MensajeriaGateway } from '../mensajeria/mensajeria.gateway';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
        @InjectRepository(DestinatarioPersona)
        private readonly destinatarioPersonaRepository: Repository<DestinatarioPersona>,
        @InjectRepository(DestinatarioGrupo)
        private readonly destinatarioGrupoRepository: Repository<DestinatarioGrupo>,
        @InjectRepository(Grupo)
        private readonly grupoRepository: Repository<Grupo>,
        @InjectRepository(GrupoPersona)
        private readonly grupoPersonaRepository: Repository<GrupoPersona>,
        private readonly mensajeriaGateway: MensajeriaGateway,
    ) {}

    // HU-3-004: Enviar mensaje directo
    async enviarMensajeDirecto(
        emisorId: string,
        emisorNombre: string,
        dto: CreateMensajeDirectoDto,
    ): Promise<Mensaje> {
        const mensaje = this.mensajeRepository.create({
            emisorId,
            emisorNombre,
            contenido: dto.contenido,
            tipo: 'directo',
        });

        const mensajeGuardado = await this.mensajeRepository.save(mensaje);

        const destinatario = this.destinatarioPersonaRepository.create({
            userId: dto.destinatarioId,
            nombre: dto.destinatarioNombre,
            leido: false,
            mensaje: mensajeGuardado,
        });

        await this.destinatarioPersonaRepository.save(destinatario);

        // Notificar en tiempo real via WebSocket
        this.mensajeriaGateway.enviarMensajeDirecto(dto.destinatarioId, {
            id: mensajeGuardado.id,
            emisorId,
            emisorNombre,
            contenido: dto.contenido,
            fechaEnvio: mensajeGuardado.fechaEnvio,
            tipo: 'directo',
        });

        return this.findOne(mensajeGuardado.id!);
    }

    // HU-3-005: Enviar mensaje a grupo
    async enviarMensajeGrupo(
        emisorId: string,
        emisorNombre: string,
        dto: CreateMensajeGrupoDto,
    ): Promise<Mensaje> {
        const grupo = await this.grupoRepository.findOne({
            where: { id: dto.grupoId },
            relations: ['miembros'],
        });

        if (!grupo) throw new NotFoundException('Grupo no encontrado');

        // Verificar que el emisor es miembro del grupo
        const esMiembro = grupo.miembros?.some(
            (m) => m.userId === emisorId && !m.bloqueado
        );
        if (!esMiembro) {
            throw new BadRequestException('No eres miembro de este grupo');
        }

        const mensaje = this.mensajeRepository.create({
            emisorId,
            emisorNombre,
            contenido: dto.contenido,
            tipo: 'grupo',
        });

        const mensajeGuardado = await this.mensajeRepository.save(mensaje);

        const destinatarioGrupo = this.destinatarioGrupoRepository.create({
            mensaje: mensajeGuardado,
            grupo,
        });

        await this.destinatarioGrupoRepository.save(destinatarioGrupo);

        // Notificar en tiempo real a todos los miembros del grupo
        this.mensajeriaGateway.enviarMensajeGrupo(dto.grupoId, {
            id: mensajeGuardado.id,
            emisorId,
            emisorNombre,
            contenido: dto.contenido,
            fechaEnvio: mensajeGuardado.fechaEnvio,
            grupoId: dto.grupoId,
            grupoNombre: grupo.nombre,
            tipo: 'grupo',
        });

        return this.findOne(mensajeGuardado.id!);
    }

    // HU-3-008: Enviar alerta masiva
    async enviarAlertaMasiva(
        emisorId: string,
        emisorNombre: string,
        dto: CreateAlertaMasivaDto,
    ): Promise<Mensaje> {
        const mensaje = this.mensajeRepository.create({
            emisorId,
            emisorNombre,
            contenido: dto.contenido,
            tipo: 'masivo',
            esUrgente: dto.esUrgente || false,
        });

        const mensajeGuardado = await this.mensajeRepository.save(mensaje);

        // Notificar a todos via WebSocket
        this.mensajeriaGateway.enviarAlertaMasiva({
            id: mensajeGuardado.id,
            emisorId,
            emisorNombre,
            contenido: dto.contenido,
            esUrgente: dto.esUrgente,
            alcance: dto.alcance,
            fechaEnvio: mensajeGuardado.fechaEnvio,
            tipo: 'masivo',
        });

        return mensajeGuardado;
    }

    // HU-3-007: Consultar mensajes recibidos
    async getMensajesRecibidos(userId: string): Promise<any[]> {
        // Mensajes directos
        const directos = await this.destinatarioPersonaRepository.find({
            where: { userId },
            relations: ['mensaje'],
            order: { mensaje: { fechaEnvio: 'DESC' } },
        });

        // Mensajes de grupos donde es miembro
        const grupos = await this.grupoPersonaRepository.find({
            where: { userId },
            relations: ['grupo'],
        });

        const grupoIds = grupos.map((g) => g.grupo.id!);
        let mensajesGrupo: any[] = [];

        if (grupoIds.length > 0) {
            mensajesGrupo = await this.destinatarioGrupoRepository
                .createQueryBuilder('dg')
                .leftJoinAndSelect('dg.mensaje', 'mensaje')
                .leftJoinAndSelect('dg.grupo', 'grupo')
                .where('dg.grupo_id IN (:...grupoIds)', { grupoIds })
                .orderBy('mensaje.fechaEnvio', 'DESC')
                .getMany();
        }

        // Combinar y formatear
        const directosFormateados = directos.map((d) => ({
            id: d.mensaje.id,
            tipo: 'directo',
            emisorId: d.mensaje.emisorId,
            emisorNombre: d.mensaje.emisorNombre,
            contenido: d.mensaje.contenido,
            leido: d.leido,
            fechaEnvio: d.mensaje.fechaEnvio,
            destinatarioId: d.id,
        }));

        const gruposFormateados = mensajesGrupo.map((dg) => ({
            id: dg.mensaje.id,
            tipo: 'grupo',
            emisorId: dg.mensaje.emisorId,
            emisorNombre: dg.mensaje.emisorNombre,
            contenido: dg.mensaje.contenido,
            leido: false,
            fechaEnvio: dg.mensaje.fechaEnvio,
            grupoNombre: dg.grupo.nombre,
            grupoId: dg.grupo.id,
        }));

        return [...directosFormateados, ...gruposFormateados]
            .sort((a, b) => new Date(b.fechaEnvio).getTime() - new Date(a.fechaEnvio).getTime());
    }

    async marcarComoLeido(destinatarioId: number, userId: string): Promise<void> {
        const destinatario = await this.destinatarioPersonaRepository.findOne({
            where: { id: destinatarioId, userId },
            relations: ['mensaje'],
        });

        if (!destinatario) throw new NotFoundException('Mensaje no encontrado');

        destinatario.leido = true;
        await this.destinatarioPersonaRepository.save(destinatario);

        // Notificar al emisor que fue leído
        this.mensajeriaGateway.notificarMensajeLeido(
            destinatario.mensaje.emisorId!,
            destinatario.mensaje.id!
        );
    }

    async findOne(id: number): Promise<Mensaje> {
        const mensaje = await this.mensajeRepository.findOne({
            where: { id },
            relations: ['destinatariosPersona', 'destinatariosGrupo', 'destinatariosGrupo.grupo'],
        });
        if (!mensaje) throw new NotFoundException('Mensaje no encontrado');
        return mensaje;
    }
}