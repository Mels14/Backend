import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { IniciarTurnoDto } from './dto/iniciar-turno.dto';

@Controller('turnos')
export class TurnosController {

    constructor(private readonly turnosService: TurnosService) {}

    @Get()
    findAll() {
        return this.turnosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.turnosService.findOne(id);
    }

    @Get('conductor/:conductorId/activo')
    findTurnoActivo(@Param('conductorId', ParseIntPipe) conductorId: number) {
        return this.turnosService.findTurnoActivo(conductorId);
    }

    @Post()
    create(@Body() dto: CreateTurnoDto) {
        return this.turnosService.create(dto);
    }

    // Iniciar turno — el conductor confirma estado del bus y arranca
    @Patch('conductor/:conductorId/iniciar')
    iniciarTurno(
        @Param('conductorId', ParseIntPipe) conductorId: number,
        @Body() dto: IniciarTurnoDto,
    ) {
        return this.turnosService.iniciarTurno(conductorId, dto);
    }

    // Finalizar turno — desactiva GPS automáticamente
    @Patch('conductor/:conductorId/finalizar')
    finalizarTurno(@Param('conductorId', ParseIntPipe) conductorId: number) {
        return this.turnosService.finalizarTurno(conductorId);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTurnoDto,
    ) {
        return this.turnosService.update(id, dto);
    }
}