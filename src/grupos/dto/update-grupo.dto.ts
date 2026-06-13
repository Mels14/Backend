import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateGrupoDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    nombre?: string;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    descripcion?: string;

    @IsString()
    @IsOptional()
    imagen?: string;

    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}