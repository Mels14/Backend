import { IsBoolean, IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreatePreferenciasClimaDto {
  @IsBoolean()
  @IsOptional()
  alertasActivas?: boolean;

  @IsString()
  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/, { message: 'Formato HH:MM requerido' })
  horarioViaje?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  ciudad?: string;
}