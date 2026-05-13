import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {

    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>,
    ) {}

    async findAll(): Promise<Empresa[]> {
        return this.empresaRepository.find({
            where: { activa: true },
        });
    }

    async findOne(id: number): Promise<Empresa> {
        const empresa = await this.empresaRepository.findOne({
            where: { id }
        });

        if (!empresa) {
            throw new NotFoundException(`Empresa con id ${id} no encontrada`);
        }
        return empresa;
    }

    async create(dto: CreateEmpresaDto): Promise<Empresa> {
        const existente = await this.empresaRepository.findOne({
            where: { nit: dto.nit },
        });
        if (existente) {
            throw new BadRequestException('Ya existe una empresa con ese NIT');
        }

        const empresa = this.empresaRepository.create({
            ...dto,
            activa: true,
        });

        return this.empresaRepository.save(empresa);
    }

    async update(id: number, dto: UpdateEmpresaDto): Promise<Empresa> {
        const empresa = await this.findOne(id);
        Object.assign(empresa, dto);
        return this.empresaRepository.save(empresa);
    }

    async remove(id: number): Promise<{ mensaje: string }> {
        const empresa = await this.findOne(id);
        // Concepto de Soft Delete
        empresa.activa = false;
        await this.empresaRepository.save(empresa);
        return { mensaje: 'Empresa desactivada correctamente' };
    }
}