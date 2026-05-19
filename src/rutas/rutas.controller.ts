import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Get()
  findAll() {
    return this.rutasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.findOne(id);
  }

  // NUEVO ENDPOINT
  @Get(':id/paraderos')
  getParaderos(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.getParaderos(id);
  }

  @Get(':id/tiempo-total')
  tiempoTotal(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.tiempoTotal(id);
  }

  @Post()
  create(@Body() dto: CreateRutaDto) {
    return this.rutasService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRutaDto,
  ) {
    return this.rutasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.remove(id);
  }
}