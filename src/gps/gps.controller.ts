import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { GpsService } from './gps.service';
import { UpdateGpsDto } from './dto/update-gps.dto';

@Controller('gps')
export class GpsController {

    constructor(private readonly gpsService: GpsService) {}

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gpsService.findOne(id);
    }

    @Patch(':id/ubicacion')
    actualizarUbicacion(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateGpsDto,
    ) {
        return this.gpsService.actualizarUbicacion(id, dto);
    }

    @Patch(':id/activar')
    activar(@Param('id', ParseIntPipe) id: number) {
        return this.gpsService.activar(id);
    }

    @Patch(':id/desactivar')
    desactivar(@Param('id', ParseIntPipe) id: number) {
        return this.gpsService.desactivar(id);
    }
}