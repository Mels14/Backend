import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Incidente } from "../../incidentes/entities/incidente.entity";

@Entity('comentarios_incidente')
export class ComentarioIncidente {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'text' })
    contenido?: string;

    @Column()
    autor?: string;

    @CreateDateColumn()
    fecha?: Date;

    @ManyToOne(() => Incidente, (incidente) => incidente.comentarios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'incidente_id' })
    incidente!: Incidente;
}