import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductor } from './entities/conductor.entity';
import { Persona } from '../personas/entities/persona.entity';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Conductor, Persona])],
    controllers: [ConductoresController],
    providers: [ConductoresService],
    exports: [ConductoresService],
})
export class ConductoresModule {}