import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidente } from './entities/incidente.entity';
import { Foto } from '../fotos/entities/foto.entity';
import { ComentarioIncidente } from '../comentarios_incidentes/entities/comentarios_incidente.entity';
import { IncidentesService } from './incidentes.service';
import { IncidentesController } from '../incidentes/incidentes.controller';
import { BusesModule } from '../buses/buses.module';
import { ConductoresModule } from '../conductores/conductores.module';
import { TurnosModule } from '../turnos/turnos.module';
import { NotificacionesModule } from 'src/gateways/notifications/notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Incidente, Foto, ComentarioIncidente]),
        BusesModule,
        TurnosModule,
        ConductoresModule,
        NotificacionesModule,
    ],
    controllers: [IncidentesController],
    providers: [IncidentesService],
    exports: [IncidentesService],
})
export class IncidentesModule {}