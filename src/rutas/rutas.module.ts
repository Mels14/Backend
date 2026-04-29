import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { Nodo } from 'src/nodos/entities/nodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ruta, Nodo])],
  controllers: [RutasController],
  providers: [RutasService],
  exports: [RutasService]
})
export class RutasModule {}
