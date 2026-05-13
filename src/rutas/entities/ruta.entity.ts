import { Nodo } from "src/nodos/entities/nodo.entity";
import { Programacion } from "src/programaciones/entities/programacione.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rutas')
export class Ruta {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nombre?: string;

    @Column()
    descripcion?: string;

    @Column()
    tarifa?: number

    @OneToMany(()=> Nodo, (nodo)=>nodo.paradero)
    nodos?: Nodo[];

    @Column({ nullable: true })
    tiempo_estimado!: number;

    @OneToMany(() => Programacion, (prog) => prog.ruta)
    programaciones!: Programacion[];

    @OneToMany(() => Programacion, (programacion) => programacion.ruta)
    programaciones?: Programacion[];
}

