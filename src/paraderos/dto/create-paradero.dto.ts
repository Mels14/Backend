import { IsNumber, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateParaderoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @Type(() => Number)
  latitud!: number;

  @IsNumber()
  @Type(() => Number)
  longitud!: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  clasificacion?: string;
}