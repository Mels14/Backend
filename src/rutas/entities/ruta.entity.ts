import { Nodo } from "src/nodos/entities/nodo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Programacion } from "../../programaciones/entities/programaciones.entity";

@Entity('rutas')
export class Ruta {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    descripcion?: string;

    @Column()
    tarifa?: number

    @OneToMany(()=> Nodo, (nodo)=>nodo.paradero)
    nodos?: Nodo[];

    @OneToMany(() => Programacion, (programacion) => programacion.ruta)
    programaciones?: Programacion[];
}

