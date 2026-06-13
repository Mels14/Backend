import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mensaje } from "./mensaje.entity";
import { Grupo } from "../../grupos/entities/grupo.entity";

@Entity('destinatario_grupos')
export class DestinatarioGrupo {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Mensaje, (mensaje) => mensaje.destinatariosGrupo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mensaje_id' })
    mensaje!: Mensaje;

    @ManyToOne(() => Grupo, (grupo) => grupo.mensajes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'grupo_id' })
    grupo!: Grupo;
}