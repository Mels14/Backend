import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidente } from './entities/incidente.entity';
import { Foto } from '../fotos/entities/foto.entity';
import { ComentarioIncidente } from '../comentarios_incidentes/entities/comentarios_incidente.entity';
import { CreateIncidenteDto } from './dto/create-incidente.dto';
import { UpdateIncidenteDto } from './dto/update-incidente.dto';
import { CreateComentarioDto } from '../comentarios_incidentes/dto/create-comentarios_incidente.dto';
import { BusesService } from '../buses/buses.service';
import { ConductoresService } from '../conductores/conductores.service';
import { TurnosService } from '../turnos/turnos.service';
import { NotificacionesGateway } from '../gateways/notifications/notifications.gateway';

@Injectable()
export class IncidentesService {

    constructor(
        @InjectRepository(Incidente)
        private readonly incidenteRepository: Repository<Incidente>,
        @InjectRepository(Foto)
        private readonly fotoRepository: Repository<Foto>,
        @InjectRepository(ComentarioIncidente)
        private readonly comentarioRepository: Repository<ComentarioIncidente>,
        private readonly busesService: BusesService,
        private readonly conductoresService: ConductoresService,
        private readonly turnosService: TurnosService,
        private readonly notificacionesGateway: NotificacionesGateway,
    ) {}

    async findByBus(
        busId: number,
        tipo?: string,
        estado?: string,
    ): Promise<{ incidentes: Incidente[]; estadisticas: object }> {

        await this.busesService.findOne(busId);

        const query = this.incidenteRepository
            .createQueryBuilder('incidente')
            .leftJoinAndSelect('incidente.bus', 'bus')
            .leftJoinAndSelect('incidente.conductor', 'conductor')
            .leftJoinAndSelect('conductor.persona', 'persona')
            .leftJoinAndSelect('incidente.turno', 'turno')
            .leftJoinAndSelect('incidente.fotos', 'fotos')
            .leftJoinAndSelect('incidente.comentarios', 'comentarios')
            .where('bus.id = :busId', { busId })
            .orderBy('incidente.fecha', 'DESC');

        if (tipo) {
            const tiposValidos = ['accidente_menor', 'falla_mecanica', 'congestion_inesperada', 'problema_pasajeros'];
            if (!tiposValidos.includes(tipo)) {
                throw new BadRequestException(`Tipo inválido. Use: ${tiposValidos.join(', ')}`);
            }
            query.andWhere('incidente.tipo = :tipo', { tipo });
        }

        if (estado) {
            const estadosValidos = ['pendiente', 'en_revision', 'resuelto'];
            if (!estadosValidos.includes(estado)) {
                throw new BadRequestException(`Estado inválido. Use: ${estadosValidos.join(', ')}`);
            }
            query.andWhere('incidente.estado = :estado', { estado });
        }

        const incidentes = await query.getMany();

        const total = incidentes.length;
        const porTipo = incidentes.reduce((acc, inc) => {
            acc[inc.tipo] = (acc[inc.tipo] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const resueltos = incidentes.filter(i => i.estado === 'resuelto').length;
        const tasaResolucion = total > 0
            ? parseFloat(((resueltos / total) * 100).toFixed(2))
            : 0;

        return {
            incidentes,
            estadisticas: {
                total,
                porTipo,
                tasaResolucion: `${tasaResolucion}%`,
            },
        };
    }

    async findOne(id: number): Promise<Incidente> {
        const incidente = await this.incidenteRepository.findOne({
            where: { id },
            relations: ['bus', 'conductor', 'conductor.persona', 'turno', 'fotos', 'comentarios'],
        });
        if (!incidente) {
            throw new NotFoundException(`Incidente con id ${id} no encontrado`);
        }
        return incidente;
    }

    async create(dto: CreateIncidenteDto): Promise<Incidente> {
        const bus = await this.busesService.findOne(dto.busId);
        const conductor = await this.conductoresService.findOne(dto.conductorId);

        // Buscar turno activo del conductor automáticamente
        const turno = await this.turnosService.findTurnoActivo(dto.conductorId);

        const incidente = this.incidenteRepository.create({
            tipo: dto.tipo,
            gravedad: dto.gravedad,
            descripcion: dto.descripcion,
            estado: 'pendiente',
            notificadoSupervisor: false,
            bus,
            conductor,
            turno,
        });

        const incidenteGuardado = await this.incidenteRepository.save(incidente);

        // Guardar fotos si vienen
        if (dto.fotos && dto.fotos.length > 0) {
            const fotos = dto.fotos.map(f =>
                this.fotoRepository.create({
                    url: f.url,
                    incidente: incidenteGuardado,
                })
            );
            await this.fotoRepository.save(fotos);
        }

        // Notificar si gravedad es alta o crítica
        if (['alto', 'critico'].includes(dto.gravedad)) {
            this.notificacionesGateway.notificarIncidenteGrave({
                incidenteId: incidenteGuardado.id!,
                busId: bus.id!,
                conductorNombre: `${conductor.persona.nombre} ${conductor.persona.apellido}`,
                tipo: dto.tipo,
                gravedad: dto.gravedad,
                descripcion: dto.descripcion,
            });

            incidenteGuardado.notificadoSupervisor = true;
            await this.incidenteRepository.save(incidenteGuardado);
        }

        return this.findOne(incidenteGuardado.id!);
    }

    async actualizarEstado(id: number, dto: UpdateIncidenteDto): Promise<Incidente> {
        const incidente = await this.findOne(id);
        Object.assign(incidente, dto);
        return this.incidenteRepository.save(incidente);
    }

    async agregarComentario(id: number, dto: CreateComentarioDto): Promise<ComentarioIncidente> {
        const incidente = await this.findOne(id);
        const comentario = this.comentarioRepository.create({
            ...dto,
            incidente,
        });
        return this.comentarioRepository.save(comentario);
    }
}