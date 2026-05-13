import { Module } from '@nestjs/common';
import { NotificacionesGateway } from './notifications.gateway';

@Module({
    providers: [NotificacionesGateway],
    exports: [NotificacionesGateway],
})
export class NotificacionesModule {}