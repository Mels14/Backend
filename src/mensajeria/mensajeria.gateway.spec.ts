import { Test, TestingModule } from '@nestjs/testing';
import { MensajeriaGateway } from './mensajeria.gateway';

describe('MensajeriaGateway', () => {
  let gateway: MensajeriaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MensajeriaGateway],
    }).compile();

    gateway = module.get<MensajeriaGateway>(MensajeriaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
