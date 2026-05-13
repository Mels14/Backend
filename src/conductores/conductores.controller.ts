import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ConductoresService } from './conductores.service';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';

@Controller('conductores')
export class ConductoresController {

    constructor(private readonly conductoresService: ConductoresService) {}

    @Get()
    findAll() {
        return this.conductoresService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.conductoresService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateConductorDto) {
        return this.conductoresService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateConductorDto,
    ) {
        return this.conductoresService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.conductoresService.remove(id);
    }
}