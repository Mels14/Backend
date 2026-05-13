import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bus } from "../../buses/entities/bus.entity";

@Entity('empresas')
export class Empresa {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nombre?: string;

    @Column()
    nit?: string;

    @Column()
    telefono?: string;

    @Column()
    email?: string;

    @Column({ default: true })
    activa?: boolean;

    @OneToMany(() => Bus, (bus) => bus.empresa)
    buses?: Bus[];
}