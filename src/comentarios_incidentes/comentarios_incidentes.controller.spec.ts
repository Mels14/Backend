import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosIncidentesController } from './comentarios_incidentes.controller';
import { ComentariosIncidentesService } from './comentarios_incidentes.service';

describe('ComentariosIncidentesController', () => {
  let controller: ComentariosIncidentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentariosIncidentesController],
      providers: [ComentariosIncidentesService],
    }).compile();

    controller = module.get<ComentariosIncidentesController>(ComentariosIncidentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
