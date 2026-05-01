import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEmpresaDto {
    @IsString()
    @IsNotEmpty()
    nombre?: string;

    @IsString()
    @IsNotEmpty()
    nit?: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}