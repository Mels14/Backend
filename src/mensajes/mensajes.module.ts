import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { DestinatarioPersona } from './entities/destinatario-persona.entity';
import { DestinatarioGrupo } from './entities/destinatario-grupo.entity';
import { Grupo } from '../grupos/entities/grupo.entity';
import { GrupoPersona } from '../grupos/entities/grupo-persona.entity';
import { MensajesService } from './mensajes.service';
import { MensajesController } from './mensajes.controller';
import { MensajeriaModule } from '../mensajeria/mensajeria.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Mensaje, DestinatarioPersona, DestinatarioGrupo, Grupo, GrupoPersona]),
        MensajeriaModule,
    ],
    controllers: [MensajesController],
    providers: [MensajesService],
    exports: [MensajesService],
})
export class MensajesModule {}