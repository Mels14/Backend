import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Controller('grupos')
export class GruposController {

    constructor(private readonly gruposService: GruposService) {}

    @Get()
    findAll() {
        return this.gruposService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gruposService.findOne(id);
    }

    @Get('usuario/:userId')
    findByUsuario(@Param('userId') userId: string) {
        return this.gruposService.findByUsuario(userId);
    }

    @Post(':adminId/:adminNombre')
    create(
        @Param('adminId') adminId: string,
        @Param('adminNombre') adminNombre: string,
        @Body() dto: CreateGrupoDto,
    ) {
        return this.gruposService.create(adminId, adminNombre, dto);
    }

    @Post(':id/unirse/:userId/:nombre')
    unirse(
        @Param('id', ParseIntPipe) id: number,
        @Param('userId') userId: string,
        @Param('nombre') nombre: string,
    ) {
        return this.gruposService.unirse(id, userId, nombre);
    }

    @Delete(':id/salir/:userId')
    salir(
        @Param('id', ParseIntPipe) id: number,
        @Param('userId') userId: string,
    ) {
        return this.gruposService.salir(id, userId);
    }

    @Delete(':id/remover/:adminId/:userId')
    remover(
        @Param('id', ParseIntPipe) id: number,
        @Param('adminId') adminId: string,
        @Param('userId') userId: string,
    ) {
        return this.gruposService.removerMiembro(id, adminId, userId);
    }

    @Patch(':id/bloquear/:adminId/:userId')
    bloquear(
        @Param('id', ParseIntPipe) id: number,
        @Param('adminId') adminId: string,
        @Param('userId') userId: string,
    ) {
        return this.gruposService.bloquearMiembro(id, adminId, userId);
    }

    @Patch(':id/promover/:adminId/:userId')
    promover(
        @Param('id', ParseIntPipe) id: number,
        @Param('adminId') adminId: string,
        @Param('userId') userId: string,
    ) {
        return this.gruposService.promoverMiembro(id, adminId, userId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateGrupoDto,
    ) {
        return this.gruposService.update(id, dto);
    }
}