import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramacionesService } from './programaciones.service';
import { CreateProgramacionDto } from './dto/create-programaciones.dto';
import { UpdateProgramacionDto } from './dto/update-programaciones.dto';

@Controller('programaciones')
export class ProgramacionesController {
  constructor(private readonly programacionesService: ProgramacionesService) {}

  @Post()
  async create(@Body() createProgramacioneDto: CreateProgramacionDto) {
      console.log('DTO recibido:', JSON.stringify(createProgramacioneDto));
      try {
          return await this.programacionesService.create(createProgramacioneDto);
      } catch(error) {
          console.error('Error creando programacion:', error.message);
          throw error;
      }
  }

  @Get()
  findAll() {
    return this.programacionesService.findAll();
  }

    @Get('horarios-rutas')
  findHorario() {
      return this.programacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramacioneDto: UpdateProgramacionDto) {
    return this.programacionesService.update(+id, updateProgramacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programacionesService.remove(+id);
  }
  
}
