import { Test, TestingModule } from '@nestjs/testing';
import { ParaderosService } from './paraderos.service';

describe('ParaderosService', () => {
  let service: ParaderosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParaderosService],
    }).compile();

    service = module.get<ParaderosService>(ParaderosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
