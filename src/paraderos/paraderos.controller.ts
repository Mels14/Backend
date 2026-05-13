import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParaderosService } from './paraderos.service';
import { CreateParaderoDto } from './dto/create-paradero.dto';
import { UpdateParaderoDto } from './dto/update-paradero.dto';

@Controller('paraderos')
export class ParaderosController {
  constructor(private readonly paraderosService: ParaderosService) {}

  @Post()
  create(@Body() createParaderoDto: CreateParaderoDto) {
    return this.paraderosService.create(createParaderoDto);
  }

  @Get()
  findAll() {
    return this.paraderosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    /* Sólo en caso de que haya algún tipo de error, se puede colocar lo siguiente:
    const numericId = +id;
    if (isNaN(numericId)) {
      Se maneja o se coloca un log con el error que lo puede causar
    }
   */
    return this.paraderosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParaderoDto: UpdateParaderoDto) {
    return this.paraderosService.update(+id, updateParaderoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paraderosService.remove(+id);
  }
}
