import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class UpdateRutaDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(150)
    nombre?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    descripcion?: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    tarifa?: number;

    @IsBoolean()
    @IsOptional()
    activa?: boolean;
}