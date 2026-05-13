import { Test, TestingModule } from '@nestjs/testing';
import { GpsController } from './gps.controller';
import { GpsService } from './gps.service';
import { beforeEach, describe, it } from 'node:test';
import expectCookies from 'supertest/lib/cookies';

describe('GpsController', () => {
  let controller: GpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GpsController],
      providers: [GpsService],
    }).compile();

    controller = module.get<GpsController>(GpsController);
  });

  it('should be defined', () => {
    expectCookies(controller).toBeDefined();
  });
});
