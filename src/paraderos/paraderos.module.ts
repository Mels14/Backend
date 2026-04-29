import { Module } from '@nestjs/common';
import { ParaderosService } from './paraderos.service';
import { ParaderosController } from './paraderos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nodo } from 'src/nodos/entities/nodo.entity';
import { Paradero } from './entities/paradero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paradero, Nodo])],
  controllers: [ParaderosController],
  providers: [ParaderosService],
  exports: [ParaderosService]
})
export class ParaderosModule {}
