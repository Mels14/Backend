import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAlertaMasivaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    contenido!: string;

    @IsString()
    @IsIn(['todos', 'ruta', 'zona'])
    alcance!: string;

    @IsBoolean()
    @IsOptional()
    esUrgente?: boolean;
}