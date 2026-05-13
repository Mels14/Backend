import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentariosIncidentesService } from './comentarios_incidentes.service';
import { CreateComentarioDto } from './dto/create-comentarios_incidente.dto';
import { UpdateComentariosIncidenteDto } from './dto/update-comentarios_incidente.dto';

@Controller('comentarios-incidentes')
export class ComentariosIncidentesController {
  constructor(private readonly comentariosIncidentesService: ComentariosIncidentesService) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosIncidentesService.create(createComentarioDto);
  }

  @Get()
  findAll() {
    return this.comentariosIncidentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosIncidentesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentariosIncidenteDto: UpdateComentariosIncidenteDto) {
    return this.comentariosIncidentesService.update(+id, updateComentariosIncidenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosIncidentesService.remove(+id);
  }
}
