import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DestinatarioPersona } from "./destinatario-persona.entity";
import { DestinatarioGrupo } from "./destinatario-grupo.entity";

@Entity('mensajes')
export class Mensaje {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    emisorId?: string; // userId de Spring Boot

    @Column()
    emisorNombre?: string;

    @Column({ type: 'text' })
    contenido?: string;

    @Column({ default: 'directo' })
    tipo?: string; // directo | grupo | masivo

    @Column({ default: false })
    esUrgente?: boolean;

    @CreateDateColumn()
    fechaEnvio?: Date;

    @OneToMany(() => DestinatarioPersona, (dp) => dp.mensaje, { cascade: true })
    destinatariosPersona?: DestinatarioPersona[];

    @OneToMany(() => DestinatarioGrupo, (dg) => dg.mensaje, { cascade: true })
    destinatariosGrupo?: DestinatarioGrupo[];
}