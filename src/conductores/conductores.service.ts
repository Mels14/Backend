import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conductor } from './entities/conductor.entity';
import { Persona } from '../personas/entities/persona.entity';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';

@Injectable()
export class ConductoresService {
  constructor(
    @InjectRepository(Conductor)
    private readonly conductorRepository: Repository<Conductor>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async findAll(): Promise<Conductor[]> {
    return this.conductorRepository.find({
      relations: ['persona'],
    });
  }

  async findOne(id: number): Promise<Conductor> {
    const conductor = await this.conductorRepository.findOne({
      where: { id },
      relations: ['persona'],
    });
    if (!conductor) {
      throw new NotFoundException(`Conductor con id ${id} no encontrado`);
    }
    return conductor;
  }

  async create(dto: CreateConductorDto): Promise<Conductor> {
    const licenciaExiste = await this.conductorRepository.findOne({
      where: { licencia: dto.licencia },
    });
    if (licenciaExiste) {
      throw new BadRequestException('Ya existe un conductor con esa licencia');
    }

    const emailExiste = await this.personaRepository.findOne({
      where: { email: dto.persona.email },
    });
    if (emailExiste) {
      throw new BadRequestException('Ya existe una persona con ese email');
    }

    const persona = this.personaRepository.create(dto.persona);
    const personaGuardada = await this.personaRepository.save(persona);

    const conductor = this.conductorRepository.create({
      licencia: dto.licencia,
      persona: personaGuardada,
    });

    return this.conductorRepository.save(conductor);
  }

  async update(id: number, dto: UpdateConductorDto): Promise<Conductor> {
    const conductor = await this.findOne(id);

    if (dto.licencia) {
      conductor.licencia = dto.licencia;
    }

    if (dto.persona) {
      Object.assign(conductor.persona, dto.persona);
      await this.personaRepository.save(conductor.persona);
    }

    return this.conductorRepository.save(conductor);
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const conductor = await this.findOne(id);
    await this.conductorRepository.remove(conductor);
    return { mensaje: 'Conductor eliminado correctamente' };
  }
}
