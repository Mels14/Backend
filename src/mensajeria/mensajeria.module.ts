import { Module } from '@nestjs/common';
import { MensajeriaGateway } from './mensajeria.gateway';

@Module({
    providers: [MensajeriaGateway],
    exports: [MensajeriaGateway],
})
export class MensajeriaModule {}