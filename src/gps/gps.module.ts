import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GPS } from 'src/gps/entities/gps.entity';
import { GpsService } from './gps.service';
import { GpsController } from './gps.controller';

@Module({
    imports: [TypeOrmModule.forFeature([GPS])],
    controllers: [GpsController],
    providers: [GpsService],
    exports: [GpsService],
})
export class GpsModule {}