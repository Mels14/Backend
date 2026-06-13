import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Grupo } from "./grupo.entity";

@Entity('grupo_personas')
export class GrupoPersona {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    userId?: string; // userId de Spring Boot

    @Column()
    nombre?: string;

    @Column({ default: 'miembro' })
    rol?: string; // admin | miembro

    @Column({ default: false })
    bloqueado?: boolean;

    @CreateDateColumn()
    fechaUnion?: Date;

    @ManyToOne(() => Grupo, (grupo) => grupo.miembros, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'grupo_id' })
    grupo!: Grupo;
}