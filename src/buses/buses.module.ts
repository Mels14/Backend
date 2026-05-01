import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { EmpresasModule } from '../empresas/empresas.module';
import { GpsModule } from '../gps/gps.module';
import { Empresa } from 'src/empresas/entities/empresa.entity';
import { GPS } from 'src/gps/entities/gps.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bus, Empresa, GPS]),
        EmpresasModule,
        GpsModule,
    ],
    controllers: [BusesController],
    providers: [BusesService],
    exports: [BusesService],
})
export class BusesModule {}