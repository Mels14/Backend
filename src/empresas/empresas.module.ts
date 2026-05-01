import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { Bus } from 'src/buses/entities/bus.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Empresa, Bus])],
    controllers: [EmpresasController],
    providers: [EmpresasService],
    exports: [EmpresasService],
})
export class EmpresasModule {}