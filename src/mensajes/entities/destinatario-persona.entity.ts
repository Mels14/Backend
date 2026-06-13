import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mensaje } from "./mensaje.entity";

@Entity('destinatario_personas')
export class DestinatarioPersona {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    userId?: string; // userId de Spring Boot

    @Column()
    nombre?: string;

    @Column({ default: false })
    leido?: boolean;

    @ManyToOne(() => Mensaje, (mensaje) => mensaje.destinatariosPersona, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mensaje_id' })
    mensaje!: Mensaje;
}