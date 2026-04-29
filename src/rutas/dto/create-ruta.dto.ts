import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRutaDto {
    @IsString()
    name?: string;

    @IsString()
    descripcion?: string;

    @IsInt()
    tarifa?: number;

}


//Id, nombre, descripcion y tarifa: number
