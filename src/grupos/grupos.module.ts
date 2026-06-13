import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { GrupoPersona } from './entities/grupo-persona.entity';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { MensajeriaModule } from '../mensajeria/mensajeria.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Grupo, GrupoPersona]),
        MensajeriaModule,
    ],
    controllers: [GruposController],
    providers: [GruposService],
    exports: [GruposService],
})
export class GruposModule {}