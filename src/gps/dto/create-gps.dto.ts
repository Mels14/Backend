import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateGpsDto {

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud?: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

}