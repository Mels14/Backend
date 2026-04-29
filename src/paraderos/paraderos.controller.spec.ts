import { Test, TestingModule } from '@nestjs/testing';
import { ParaderosController } from './paraderos.controller';
import { ParaderosService } from './paraderos.service';

describe('ParaderosController', () => {
  let controller: ParaderosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParaderosController],
      providers: [ParaderosService],
    }).compile();

    controller = module.get<ParaderosController>(ParaderosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
