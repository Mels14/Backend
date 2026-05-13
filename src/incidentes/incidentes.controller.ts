import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { IncidentesService } from './incidentes.service';
import { CreateIncidenteDto } from './dto/create-incidente.dto';
import { UpdateIncidenteDto } from './dto/update-incidente.dto';
import { CreateComentarioDto } from '../comentarios_incidentes/dto/create-comentarios_incidente.dto';

@Controller('incidentes')
export class IncidentesController {

    constructor(private readonly incidentesService: IncidentesService) {}

    // GET /incidentes/bus/:busId?tipo=falla_mecanica&estado=pendiente
    @Get('bus/:busId')
    findByBus(
        @Param('busId', ParseIntPipe) busId: number,
        @Query('tipo') tipo?: string,
        @Query('estado') estado?: string,
    ) {
        return this.incidentesService.findByBus(busId, tipo, estado);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.incidentesService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateIncidenteDto) {
        return this.incidentesService.create(dto);
    }

    @Patch(':id/estado')
    actualizarEstado(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateIncidenteDto,
    ) {
        return this.incidentesService.actualizarEstado(id, dto);
    }

    @Post(':id/comentarios')
    agregarComentario(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateComentarioDto,
    ) {
        return this.incidentesService.agregarComentario(id, dto);
    }
}