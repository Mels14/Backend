import { Module } from '@nestjs/common';
import { NodosService } from './nodos.service';
import { NodosController } from './nodos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { Paradero } from 'src/paraderos/entities/paradero.entity';
import { Nodo } from './entities/nodo.entity';
import { RutasModule } from 'src/rutas/rutas.module';
import { ParaderosModule } from 'src/paraderos/paraderos.module';

@Module({
  imports:[TypeOrmModule.forFeature([Nodo, Paradero, Ruta]), NodosModule, RutasModule, ParaderosModule],
  controllers: [NodosController],
  providers: [NodosService],
})
export class NodosModule {}
