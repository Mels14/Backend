import { IsNotEmpty } from "class-validator";
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { Paradero} from 'src/paraderos/entities/paradero.entity';

export class CreateNodoDto {
    @IsNotEmpty()
    ruta?: Ruta;

    @IsNotEmpty()
    paradero?: Paradero;
}
