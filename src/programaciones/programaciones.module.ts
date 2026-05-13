import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ProgramacionesService } from './programaciones.service';
import { ProgramacionesController } from './programaciones.controller';

@Module({
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramacionesService } from './programaciones.service';
import { ProgramacionesController } from './programaciones.controller';
import { Programacion } from './entities/programaciones.entity';
import { RutasModule } from '../rutas/rutas.module';
import { BusesModule } from '../buses/buses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Programacion]), RutasModule, BusesModule],
>>>>>>> respaldo-hu011-hu016
  controllers: [ProgramacionesController],
  providers: [ProgramacionesService],
})
export class ProgramacionesModule {}
<<<<<<< HEAD
=======



>>>>>>> respaldo-hu011-hu016
