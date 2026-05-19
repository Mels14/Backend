import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HistoriasService } from './historias.service';


@Controller('historias')
export class HistoriasController {
  constructor(private readonly historiasService: HistoriasService) {}

  // HU-2-005: Historial de viajes de un ciudadano
    @Get('ciudadano/:ciudadano_id')
    getHistorial(@Param('ciudadano_id') ciudadano_id: string) {
        return this.historiasService.getHistorialCiudadano(ciudadano_id);
    }
}