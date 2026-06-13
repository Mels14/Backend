import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GrupoPersona } from "./grupo-persona.entity";
import { DestinatarioGrupo } from "../../mensajes/entities/destinatario-grupo.entity";

@Entity('grupos')
export class Grupo {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nombre?: string;

    @Column({ type: 'text', nullable: true })
    descripcion?: string;

    @Column({ nullable: true })
    imagen?: string;

    @Column({ default: 'publico' })
    tipo?: string; // publico | privado

    @Column()
    adminId?: string; // userId de Spring Boot

    @Column()
    adminNombre?: string;

    @Column({ default: true })
    activo?: boolean;

    @CreateDateColumn()
    fechaCreacion?  : Date;

    @OneToMany(() => GrupoPersona, (gp) => gp.grupo, { cascade: true })
    miembros?: GrupoPersona[];

    @OneToMany(() => DestinatarioGrupo, (dg) => dg.grupo)
    mensajes?: DestinatarioGrupo[];
}