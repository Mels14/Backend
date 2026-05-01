import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GPS } from 'src/gps/entities/gps.entity';
import { UpdateGpsDto } from 'src/gps/dto/update-gps.dto';

@Injectable()
export class GpsService {

    constructor(
        @InjectRepository(GPS)
        private readonly gpsRepository: Repository<GPS>,
    ) {}

    async crear(): Promise<GPS> {
        const gps = this.gpsRepository.create({
            latitud: 0,
            longitud: 0,
            activo: false,
        });
        return this.gpsRepository.save(gps);
    }

    async findOne(id: number): Promise<GPS> {
        const gps = await this.gpsRepository.findOne({ where: { id } });
        if (!gps) {
            throw new NotFoundException(`GPS con id ${id} no encontrado`);
        }
        return gps;
    }

    async actualizarUbicacion(id: number, dto: UpdateGpsDto): Promise<GPS> {
        const gps = await this.findOne(id);
        Object.assign(gps, dto);
        return this.gpsRepository.save(gps);
    }

    async activar(id: number): Promise<GPS> {
        const gps = await this.findOne(id);
        gps.activo = true;
        return this.gpsRepository.save(gps);
    }

    async desactivar(id: number): Promise<GPS> {
        const gps = await this.findOne(id);
        gps.activo = false;
        return this.gpsRepository.save(gps);
    }
}