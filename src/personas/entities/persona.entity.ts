import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('personas')
export class Persona {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nombre?: string;

    @Column()
    apellido?: string;

    @Column({ unique: true })
    email?: string;

    @Column({ nullable: true })
    telefono?: string;
}