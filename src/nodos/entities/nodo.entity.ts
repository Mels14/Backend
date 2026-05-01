import { Paradero } from "src/paraderos/entities/paradero.entity";
import { Ruta } from "src/rutas/entities/ruta.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('nodos')
export class Nodo {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Ruta, (ruta) => ruta.nodos, { onDelete: 'CASCADE' } )
    @JoinColumn({ name: 'ruta_id'})
    ruta?: Ruta;

    @ManyToOne(() => Paradero, (paradero) => paradero.nodos, { onDelete: 'CASCADE' } )
    @JoinColumn({ name: 'paradero_id'}) // Error corregido (antes decía 'ruta_id')
    paradero?: Paradero;
}
