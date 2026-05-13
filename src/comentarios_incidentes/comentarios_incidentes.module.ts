import { Module } from '@nestjs/common';
import { ComentariosIncidentesService } from './comentarios_incidentes.service';
import { ComentariosIncidentesController } from './comentarios_incidentes.controller';

@Module({
  controllers: [ComentariosIncidentesController],
  providers: [ComentariosIncidentesService],
})
export class ComentariosIncidentesModule {}
