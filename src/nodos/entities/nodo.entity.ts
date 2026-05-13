import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ruta } from '../../rutas/entities/ruta.entity';
import { Paradero } from '../../paraderos/entities/paradero.entity';

@Entity('nodos')
export class Nodo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orden!: number; // posición secuencial en la ruta

  @ManyToOne(() => Ruta, (ruta) => ruta.nodos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ruta_id' })
  ruta!: Ruta;

  @ManyToOne(() => Paradero, (paradero) => paradero.nodos)
  @JoinColumn({ name: 'paradero_id' })
  paradero!: Paradero;
}