import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { SecurityGuard } from '../common/guards/security.guard';

@UseGuards(SecurityGuard)
@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  // HU-2-001: Listar rutas con filtro opcional por nombre
  @Get()
  findAll(@Query('nombre') nombre?: string) {
    return this.rutasService.findAll(nombre);
  }

  // HU-2-001: Ver paraderos de una ruta en orden secuencial
  @Get(':id/paraderos')
  getParaderos(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.getParaderosPorRuta(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRutaDto) {
    return this.rutasService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateRutaDto>) {
    return this.rutasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.remove(id);
  }
}