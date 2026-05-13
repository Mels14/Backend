import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateParaderoDto {
    @IsString()
    @IsNotEmpty()
    nombre?: string;

    @IsInt()
    @IsNotEmpty()
    latitud?: number;

    @IsInt()
    @IsNotEmpty()
    longitud?: number;

    @IsString()
    @IsNotEmpty()
    clasificacion?: string;

}
