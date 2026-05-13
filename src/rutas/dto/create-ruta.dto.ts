import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRutaDto {
    @IsString()
    nombre?: string;

    @IsString()
    descripcion?: string;

    @IsInt()
    tarifa?: number;

    @IsInt()
    tiempo_estimado?: number;

}


//Id, nombre, descripcion y tarifa: number
