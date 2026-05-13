import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Incidente } from "../../incidentes/entities/incidente.entity";

@Entity('fotos')
export class Foto {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    url?: string;

    @ManyToOne(() => Incidente, (incidente) => incidente.fotos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'incidente_id' })
    incidente!: Incidente;
}