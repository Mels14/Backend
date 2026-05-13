import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
})
export class NotificacionesGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server?: Server;

    handleConnection(client: Socket) {
        console.log(`Cliente conectado: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Cliente desconectado: ${client.id}`);
    }

    notificarIncidenteGrave(payload: {
        incidenteId: number;
        busId: number;
        conductorNombre: string;
        tipo: string;
        gravedad: string;
        descripcion: string;
    }) {
        console.warn(`⚠️ INCIDENTE GRAVE - Bus ${payload.busId} - ${payload.gravedad.toUpperCase()}`);
        this.server?.emit('incidente_grave', {
            mensaje: `Incidente grave reportado en bus ${payload.busId}`,
            ...payload,
            timestamp: new Date(),
        });
    }
}