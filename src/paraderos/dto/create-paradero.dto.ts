import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateParaderoDto {
    @IsString()
    nombre?: string;

    @IsInt()
    latitud?: number;

    @IsInt()
    longitud?: number;

    @IsString()
    clasificacion?: string;

}
