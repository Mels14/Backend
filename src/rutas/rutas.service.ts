import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { Ruta } from './entities/ruta.entity';

@Injectable()
export class RutasService {
  constructor(
    @InjectRepository(Ruta)
    private readonly rutaRepo: Repository<Ruta>,
  ) {}

  // HU-2-001: Listar todas las rutas con filtro por nombre
  async findAll(nombre?: string): Promise<Ruta[]> {
    const query = this.rutaRepo.createQueryBuilder('ruta');

    if (nombre) {
      query.where('ruta.nombre LIKE :nombre', { nombre: `%${nombre}%` });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Ruta> {
    const ruta = await this.rutaRepo.findOne({
      where: { id },
      relations: ['nodos', 'nodos.paradero'],
    });
    if (!ruta) throw new NotFoundException(`Ruta #${id} no encontrada`);
    return ruta;
  }

  // HU-2-001: Paraderos de una ruta en orden secuencial
  async getParaderosPorRuta(id: number) {
    const ruta = await this.rutaRepo.findOne({
      where: { id },
      relations: ['nodos', 'nodos.paradero'],
    });

    if (!ruta) throw new NotFoundException(`Ruta #${id} no encontrada`);

    // Ordenar por el campo orden del nodo
    const paraderos = ruta.nodos
      .sort((a, b) => a.orden - b.orden)
      .map((nodo) => ({
        orden: nodo.orden,
        paradero: nodo.paradero,
      }));

    return {
      ruta: {
        id: ruta.id,
        nombre: ruta.nombre,
        descripcion: ruta.descripcion,
        tarifa: ruta.tarifa,
        tiempo_estimado: ruta.tiempo_estimado,
      },
      paraderos,
    };
  }

  async create(dto: CreateRutaDto): Promise<Ruta> {
    const ruta = this.rutaRepo.create(dto);
    return await this.rutaRepo.save(ruta);
  }

  async update(id: number, dto: Partial<CreateRutaDto>): Promise<Ruta> {
    const ruta = await this.findOne(id);
    const updated = Object.assign(ruta, dto);
    return await this.rutaRepo.save(updated);
  }

  async remove(id: number) {
    const ruta = await this.findOne(id);
    await this.rutaRepo.remove(ruta);
    return { message: `Ruta #${id} eliminada` };
  }
}