import { IsOptional, IsString, MaxLength } from "class-validator";

export class IniciarTurnoDto {
    @IsString()
    @IsOptional()
    @MaxLength(500)
    observaciones?: string;
}