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
    private readonly rutasRepository: Repository<Ruta>,
  ) {}

  async create(createRutaDto: CreateRutaDto): Promise<Ruta> {
    const ruta = this.rutasRepository.create({ ...createRutaDto });
    return this.rutasRepository.save(ruta);
  }

  findAll(): Promise<Ruta[]> {
    return this.rutasRepository.find({ relations: ['nodos'] });
  }

  async findOne(id: number): Promise<Ruta> {
    const ruta = await this.rutasRepository.findOne({
      where: { id },
      relations: ['nodos'],
    });
    if (!ruta) throw new NotFoundException(`Ruta with id ${id} not found`);
    return ruta;
  }

  async update(id: number, updateRutaDto: UpdateRutaDto): Promise<Ruta> {
    const ruta = await this.rutasRepository.preload({ id, ...updateRutaDto });
    if (!ruta) throw new NotFoundException(`Ruta with id ${id} not found`);
    return this.rutasRepository.save(ruta);
  }

  async remove(id: number): Promise<void> {
    const ruta = await this.findOne(id);
    await this.rutasRepository.remove(ruta);
  }
}