import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateBusDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    placa?: string;

    @IsString()
    @IsNotEmpty()
    modelo?: string;

    @IsInt()
    @Min(1990)
    anio?: number;

    @IsInt()
    @Min(1)
    capacidadSentados?: number;

    @IsInt()
    @Min(0)
    capacidadParados?: number;

    @IsString()
    @IsIn(['operativo', 'mantenimiento', 'fuera_de_servicio'])
    estado?: string;

    @IsString()
    @IsOptional()
    fotoBus?: string;

    @IsInt()
    @IsNotEmpty()
    empresaId!: number;
}