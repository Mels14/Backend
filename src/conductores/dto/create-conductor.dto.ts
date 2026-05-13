import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class CreatePersonaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    nombre?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    apellido?: string;

    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsOptional()
    telefono?: string;
}

export class CreateConductorDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    licencia?: string;

    @ValidateNested()
    @Type(() => CreatePersonaDto)
    persona!: CreatePersonaDto;
}