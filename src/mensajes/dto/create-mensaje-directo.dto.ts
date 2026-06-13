import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMensajeDirectoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    contenido!: string;

    @IsString()
    @IsNotEmpty()
    destinatarioId!: string; // userId de Spring Boot

    @IsString()
    @IsNotEmpty()
    destinatarioNombre!: string;
}