import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { BusesModule } from '../buses/buses.module';
import { ConductoresModule } from '../conductores/conductores.module';
import { GpsModule } from '../gps/gps.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Turno]),
        BusesModule,
        ConductoresModule,
        GpsModule,
    ],
    controllers: [TurnosController],
    providers: [TurnosService],
    exports: [TurnosService],
})
export class TurnosModule {}