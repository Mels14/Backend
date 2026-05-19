import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Nodo } from '../../nodos/entities/nodo.entity';

@Entity('paraderos')
export class Paradero {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre?: string;

  @Column('decimal', { precision: 10, scale: 8 })
  latitud?: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitud?: number;

  @Column({ nullable: true })  // ← nullable
  clasificacion?: string;

  @Column({ nullable: true })  // ← agregar descripcion
  descripcion?: string;

  @OneToMany(() => Nodo, (nodo) => nodo.paradero)  // ← era nodo.ruta, debe ser nodo.paradero
  nodos?: Nodo[];
}