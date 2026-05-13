import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conductor } from "../../conductores/entities/conductor.entity";
import { Bus } from "../../buses/entities/bus.entity";
import { Incidente } from "../../incidentes/entities/incidente.entity";

@Entity('turnos')
export class Turno {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'datetime', nullable: true })
    fechaProgramada?: Date;

    @Column({ type: 'datetime', nullable: true })
    fechaInicio?: Date;

    @Column({ type: 'datetime', nullable: true })
    fechaFin?: Date;

    @Column({
        type: 'enum',
        enum: ['programado', 'en_curso', 'finalizado'],
        default: 'programado',
    })
    estado?: string;

    @Column({ type: 'text', nullable: true })
    observaciones?: string;

    @ManyToOne(() => Conductor, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'conductor_id' })
    conductor!: Conductor;

    @ManyToOne(() => Bus, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bus_id' })
    bus!: Bus;

    @OneToMany(() => Incidente, (incidente) => incidente.turno)
    incidentes!: Incidente[];
}