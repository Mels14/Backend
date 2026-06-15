import { MensajesService } from './mensajes.service';
import { CreateMensajeDirectoDto } from './dto/create-mensaje-directo.dto';
import { CreateMensajeGrupoDto } from './dto/create-mensaje-grupo.dto';
import { CreateAlertaMasivaDto } from './dto/create-alerta-masiva.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MensajeriaGateway } from '../mensajeria/mensajeria.gateway';

@Controller('mensajes')
export class MensajesController {

    constructor(private readonly mensajesService: MensajesService,
    private readonly mensajeriaGateway: MensajeriaGateway,) {
        
    }

    @Get('recibidos/:userId')
    getMensajesRecibidos(@Param('userId') userId: string) {
        return this.mensajesService.getMensajesRecibidos(userId);
    }

    @Post('directo/:emisorId')
    enviarDirecto(
        @Param('emisorId') emisorId: string,
        @Body() body: CreateMensajeDirectoDto & { emisorNombre: string },
    ) {
        return this.mensajesService.enviarMensajeDirecto(emisorId, body.emisorNombre, body);
    }

    @Post('grupo/:emisorId')
    enviarGrupo(
        @Param('emisorId') emisorId: string,
        @Body() body: CreateMensajeGrupoDto & { emisorNombre: string },
    ) {
        return this.mensajesService.enviarMensajeGrupo(emisorId, body.emisorNombre, body);
    }

    @Post('alerta/:emisorId')
    enviarAlerta(
        @Param('emisorId') emisorId: string,
        @Body() body: CreateAlertaMasivaDto & { emisorNombre: string },
    ) {
        return this.mensajesService.enviarAlertaMasiva(emisorId, body.emisorNombre, body);
    }

    @Patch(':destinatarioId/leido/:userId')
    marcarLeido(
        @Param('destinatarioId', ParseIntPipe) destinatarioId: number,
        @Param('userId') userId: string,
    ) {
        return this.mensajesService.marcarComoLeido(destinatarioId, userId);
    }

    @Get('enviados/:userId')
    getMensajesEnviados(@Param('userId') userId: string) {
    return this.mensajesService.getMensajesEnviados(userId);
}
@Get('grupo/:grupoId/historial')
getHistorialGrupo(@Param('grupoId', ParseIntPipe) grupoId: number) {
    return this.mensajesService.getHistorialGrupo(grupoId);
}


@Delete(':mensajeId/grupo/:grupoId/admin/:adminId')
eliminarMensajeGrupo(
    @Param('mensajeId', ParseIntPipe) mensajeId: number,
    @Param('grupoId', ParseIntPipe) grupoId: number,
    @Param('adminId') adminId: string,
) {
    return this.mensajesService.eliminarMensajeGrupo(mensajeId, grupoId, adminId);
}

@Get('conectados/count')
getConectados() {
    return { total: this.mensajeriaGateway.getUsuariosConectados() };
}



}