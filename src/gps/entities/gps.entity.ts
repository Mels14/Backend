import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('gps')
export class GPS {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('decimal', { precision: 10, scale: 7, default: 0 })
    latitud?: number;

    @Column('decimal', { precision: 10, scale: 7, default: 0 })
    longitud?: number;

    @Column({ default: false })
    activo?: boolean;

    @UpdateDateColumn()
    ultimaActualizacion?: Date;
}