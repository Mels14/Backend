import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { Nodo } from 'src/nodos/entities/nodo.entity';
import { Paradero } from 'src/paraderos/entities/paradero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ruta, Nodo, Paradero])],
  controllers: [RutasController],
  providers: [RutasService],
  exports: [RutasService]
})
export class RutasModule {}
