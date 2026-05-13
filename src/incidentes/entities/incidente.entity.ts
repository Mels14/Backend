import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bus } from "../../buses/entities/bus.entity";
import { Conductor } from "../../conductores/entities/conductor.entity";
import { Foto } from "../../fotos/entities/foto.entity";
import { ComentarioIncidente } from "../../comentarios_incidentes/entities/comentarios_incidente.entity";
import { Turno } from "../../turnos/entities/turno.entity";

@Entity('incidentes')
export class Incidente {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'enum',
        enum: ['accidente_menor', 'falla_mecanica', 'congestion_inesperada', 'problema_pasajeros'],
    })
    tipo!: string;

    @Column({
        type: 'enum',
        enum: ['bajo', 'medio', 'alto', 'critico'],
    })
    gravedad!: string;

    @Column({
        type: 'enum',
        enum: ['pendiente', 'en_revision', 'resuelto'],
        default: 'pendiente',
    })
    estado?: string;

    @Column({ type: 'text' })
    descripcion!: string;

    @Column({ default: false })
    notificadoSupervisor?: boolean;

    @CreateDateColumn()
    fecha?: Date;

    @ManyToOne(() => Bus, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bus_id' })
    bus?: Bus;

    @ManyToOne(() => Conductor, { eager: true, onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'conductor_id' })
    conductor!: Conductor;

    @ManyToOne(() => Turno, (turno) => turno.incidentes, { eager: true, onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'turno_id' })
    turno!: Turno;

    @OneToMany(() => Foto, (foto) => foto.incidente, { cascade: true, eager: true })
    fotos?: Foto[];

    @OneToMany(() => ComentarioIncidente, (comentario) => comentario.incidente, { cascade: true })
    comentarios?: ComentarioIncidente[];
}