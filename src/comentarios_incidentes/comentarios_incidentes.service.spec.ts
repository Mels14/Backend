import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosIncidentesService } from './comentarios_incidentes.service';

describe('ComentariosIncidentesService', () => {
  let service: ComentariosIncidentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentariosIncidentesService],
    }).compile();

    service = module.get<ComentariosIncidentesService>(ComentariosIncidentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
