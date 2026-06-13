import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateGrupoDto {
    @IsString()
    @IsNotEmpty()
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

    @IsString()
    @IsIn(['publico', 'privado'])
    tipo?: string;

    @IsArray()
    @IsNotEmpty()
    miembros!: { userId: string; nombre: string }[];
}