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

    // userId → Socket completo (necesario para excluir al emisor en grupos)
    private usuariosConectados = new Map<string, Socket>();

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;
        if (userId) {
            this.usuariosConectados.set(userId, client);
            // Avisar al cliente que el socket está listo para emitir eventos
            client.emit('conexion_lista', { userId });
            this.logger.log(`Usuario conectado: ${userId} → socket ${client.id}`);
        }
    }

    handleDisconnect(client: Socket) {
        for (const [userId, socket] of this.usuariosConectados.entries()) {
            if (socket.id === client.id) {
                this.usuariosConectados.delete(userId);
                this.logger.log(`Usuario desconectado: ${userId}`);
                break;
            }
        }
    }

    @SubscribeMessage('unirse_grupo')
    handleUnirseGrupo(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { grupoId: number },
    ) {
        const room = `grupo_${data.grupoId}`;
        client.join(room);
        this.logger.log(`Cliente ${client.id} unido a sala ${room}`);
    }

    @SubscribeMessage('salir_grupo')
    handleSalirGrupo(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { grupoId: number },
    ) {
        const room = `grupo_${data.grupoId}`;
        client.leave(room);
        this.logger.log(`Cliente ${client.id} salió de sala ${room}`);
    }

    // Mensaje directo: solo al destinatario, nunca al emisor
    enviarMensajeDirecto(destinatarioId: string, mensaje: any) {
        const socket = this.usuariosConectados.get(destinatarioId);
        if (socket) {
            socket.emit('mensaje_directo', mensaje);
            this.logger.log(`Mensaje directo enviado a ${destinatarioId}`);
        } else {
            this.logger.log(`Usuario ${destinatarioId} no está conectado`);
        }
    }

    // Mensaje de grupo: emite a toda la sala EXCEPTO al emisor
    // Así el emisor no recibe su propio mensaje por socket y no hay duplicados
    enviarMensajeGrupo(grupoId: number, emisorId: string, mensaje: any) {
        const room = `grupo_${grupoId}`;
        const socketEmisor = this.usuariosConectados.get(emisorId);
        if (socketEmisor) {
            // broadcast desde el socket del emisor → excluye al emisor automáticamente
            socketEmisor.to(room).emit('mensaje_grupo', mensaje);
        } else {
            // Emisor no conectado → emitir a todos en la sala
            this.server.to(room).emit('mensaje_grupo', mensaje);
        }
        this.logger.log(`Mensaje de grupo ${grupoId} enviado (emisor ${emisorId} excluido)`);
    }

    // Alerta masiva: a todos los conectados
    enviarAlertaMasiva(alerta: any) {
        this.server.emit('alerta_masiva', alerta);
        this.logger.log(`Alerta masiva enviada a todos`);
    }

    // Notificar al emisor que su mensaje fue leído → activa ✓✓ en el frontend
    notificarMensajeLeido(emisorId: string, mensajeId: number) {
        const socket = this.usuariosConectados.get(emisorId);
        if (socket) {
            socket.emit('mensaje_leido', { mensajeId });
            this.logger.log(`Mensaje ${mensajeId} marcado como leído, notificado a ${emisorId}`);
        }
    }

    getUsuariosConectados(): number {
    return this.usuariosConectados.size;
}
}