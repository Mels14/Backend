import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateMensajeGrupoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    contenido!: string;

    @IsNumber()
    @IsNotEmpty()
    grupoId!: number;
}