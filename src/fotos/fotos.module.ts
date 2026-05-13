import { Module } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { FotosController } from './fotos.controller';

@Module({
  controllers: [FotosController],
  providers: [FotosService],
})
export class FotosModule {}
