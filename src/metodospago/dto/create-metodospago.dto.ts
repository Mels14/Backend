import { IsInt, IsString } from "class-validator";

export class CreateMetodoPagoDto {

    @IsString()
    tipo?: string;
    
}