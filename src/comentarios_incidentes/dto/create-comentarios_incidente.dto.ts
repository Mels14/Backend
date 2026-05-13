import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateComentarioDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    contenido?: string;

    @IsString()
    @IsNotEmpty()
    autor!: string;
}