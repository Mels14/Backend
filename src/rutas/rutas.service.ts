import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ruta } from './entities/ruta.entity';
import { Nodo } from '../nodos/entities/nodo.entity';
import { Paradero } from '../paraderos/entities/paradero.entity';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RutasService {

    constructor(
        @InjectRepository(Ruta)
        private readonly rutaRepository: Repository<Ruta>,
        @InjectRepository(Nodo)
        private readonly nodoRepository: Repository<Nodo>,
        @InjectRepository(Paradero)
        private readonly paraderoRepository: Repository<Paradero>,
    ) {}

    async findAll(): Promise<Ruta[]> {
        return this.rutaRepository.find({
            where: { activa: true },
            relations: ['nodos', 'nodos.paradero'],
            order: { id: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Ruta> {
        const ruta = await this.rutaRepository.findOne({
            where: { id },
            relations: ['nodos', 'nodos.paradero'],
            order: { nodos: { orden: 'ASC' } },
        });
        if (!ruta) {
            throw new NotFoundException(`Ruta con id ${id} no encontrada`);
        }
        return ruta;
    }

    async create(dto: CreateRutaDto): Promise<Ruta> {
        // Validar que no haya paraderos duplicados
        const paraderoIds = dto.nodos.map(n => n.paraderoId);
        const paraderoIdsUnicos = new Set(paraderoIds);
        if (paraderoIds.length !== paraderoIdsUnicos.size) {
            throw new BadRequestException('No puede haber paraderos duplicados en la ruta');
        }

        // Validar que no haya órdenes duplicados
        const ordenes = dto.nodos.map(n => n.orden);
        const ordenesUnicos = new Set(ordenes);
        if (ordenes.length !== ordenesUnicos.size) {
            throw new BadRequestException('No puede haber órdenes duplicados en los nodos');
        }

        // Validar que todos los paraderos existen
        const paraderos = await Promise.all(
            paraderoIds.map(async (pid) => {
                const paradero = await this.paraderoRepository.findOne({ where: { id: pid } });
                if (!paradero) {
                    throw new NotFoundException(`Paradero con id ${pid} no encontrado`);
                }
                return paradero;
            })
        );

        // Generar código único
        const codigo = 'RUT-' + uuidv4().substring(0, 8).toUpperCase();

        // Crear ruta
        const ruta = this.rutaRepository.create({
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            tarifa: dto.tarifa,
            codigo,
            activa: true,
        });

        const rutaGuardada = await this.rutaRepository.save(ruta);

        // Crear nodos ordenados
        const nodos = dto.nodos.map((nodoDto, index) => {
            return this.nodoRepository.create({
                orden: nodoDto.orden,
                distanciaDesdeAnterior: nodoDto.distanciaDesdeAnterior,
                tiempoEstimado: nodoDto.tiempoEstimado,
                paradero: paraderos[index],
                ruta: rutaGuardada,
            });
        });

        await this.nodoRepository.save(nodos);

        return this.findOne(rutaGuardada.id!);
    }

    async update(id: number, dto: UpdateRutaDto): Promise<Ruta> {
        const ruta = await this.findOne(id);
        Object.assign(ruta, dto);
        return this.rutaRepository.save(ruta);
    }

    async remove(id: number): Promise<{ mensaje: string }> {
        const ruta = await this.findOne(id);
        ruta.activa = false;
        await this.rutaRepository.save(ruta);
        return { mensaje: 'Ruta desactivada correctamente' };
    }

    // Calcular tiempo total estimado de la ruta
    async tiempoTotal(id: number): Promise<{ tiempoTotal: number; unidad: string }> {
        const ruta = await this.findOne(id);
        const tiempoTotal = ruta.nodos?.reduce((acc, nodo) => {
            return acc + (nodo.tiempoEstimado || 0);
        }, 0) || 0;

        return {
            tiempoTotal,
            unidad: 'minutos',
        };
    }
}