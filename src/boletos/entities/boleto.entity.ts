import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('boletos')
export class Boleto {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'date' })
    marca_inicio?: Date;

    @Column({ type: 'date' })
    marca_fin?: Date;

    @Column()
    estado?: boolean;


}
