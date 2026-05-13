import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTurnoDto {
    @IsDateString()
    @IsOptional()
    fechaProgramada?: Date;

    @IsInt()
    @IsNotEmpty()
    conductorId!: number;

    @IsInt()
    @IsNotEmpty()
    busId!: number;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    observaciones?: string;
}