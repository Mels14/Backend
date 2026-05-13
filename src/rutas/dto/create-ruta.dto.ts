import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ArrayMinSize, MaxLength, Min, MinLength, ValidateNested } from "class-validator";

export class CreateNodoRutaDto {
    @IsInt()
    @IsNotEmpty()
    paraderoId?: number;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    orden?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    distanciaDesdeAnterior?: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    tiempoEstimado?: number;
}

export class CreateRutaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(150)
    nombre?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    descripcion?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    tarifa?: number;

    @IsArray()
    @ArrayMinSize(3, { message: 'La ruta debe tener al menos 3 paraderos' })
    @ValidateNested({ each: true })
    @Type(() => CreateNodoRutaDto)
    nodos!: CreateNodoRutaDto[];
}