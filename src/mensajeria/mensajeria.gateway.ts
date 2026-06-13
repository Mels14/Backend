import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/mensajeria',
})
export class MensajeriaGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server!: Server;

    private readonly logger = new Logger('MensajeriaGateway');

    // Mapa de userId → socketId para saber quién está conectado
    private usuariosConectados = new Map<string, string>();

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;
        if (userId) {
            this.usuariosConectados.set(userId, client.id);
            this.logger.log(`Usuario conectado: ${userId} → socket ${client.id}`);
        }
    }

    handleDisconnect(client: Socket) {
        // Eliminar usuario del mapa al desconectarse
        for (const [userId, socketId] of this.usuariosConectados.entries()) {
            if (socketId === client.id) {
                this.usuariosConectados.delete(userId);
                this.logger.log(`Usuario desconectado: ${userId}`);
                break;
            }
        }
    }

    // Unirse a la sala de un grupo
    @SubscribeMessage('unirse_grupo')
    handleUnirseGrupo(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { grupoId: number },
    ) {
        const room = `grupo_${data.grupoId}`;
        client.join(room);
        this.logger.log(`Cliente ${client.id} unido a sala ${room}`);
    }

    // Salir de la sala de un grupo
    @SubscribeMessage('salir_grupo')
    handleSalirGrupo(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { grupoId: number },
    ) {
        const room = `grupo_${data.grupoId}`;
        client.leave(room);
        this.logger.log(`Cliente ${client.id} salió de sala ${room}`);
    }

    // Enviar mensaje directo a un usuario específico
    enviarMensajeDirecto(destinatarioId: string, mensaje: any) {
        const socketId = this.usuariosConectados.get(destinatarioId);
        if (socketId) {
            this.server.to(socketId).emit('mensaje_directo', mensaje);
            this.logger.log(`Mensaje directo enviado a ${destinatarioId}`);
        } else {
            this.logger.log(`Usuario ${destinatarioId} no está conectado`);
        }
    }

    // Enviar mensaje a todos los miembros de un grupo
    enviarMensajeGrupo(grupoId: number, mensaje: any) {
        const room = `grupo_${grupoId}`;
        this.server.to(room).emit('mensaje_grupo', mensaje);
        this.logger.log(`Mensaje enviado al grupo ${grupoId}`);
    }

    // Enviar alerta masiva a todos los conectados
    enviarAlertaMasiva(alerta: any) {
        this.server.emit('alerta_masiva', alerta);
        this.logger.log(`Alerta masiva enviada a todos`);
    }

    // Notificar que un mensaje fue leído
    notificarMensajeLeido(emisorId: string, mensajeId: number) {
        const socketId = this.usuariosConectados.get(emisorId);
        if (socketId) {
            this.server.to(socketId).emit('mensaje_leido', { mensajeId });
        }
    }
}