import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Nodo } from '../../nodos/entities/nodo.entity';


@Entity('paraderos')
export class Paradero {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    latitud?: number;

    @Column()
    longitud?: number;

    @Column()
    clasificacion?: string;

    @OneToMany(()=> Nodo, (nodo)=> nodo.ruta)
    nodos?: Nodo[];

}
