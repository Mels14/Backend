import { IsBoolean, IsDateString, IsInt , IsString} from "class-validator";

export class CreateBoletoDto {
    @IsInt()
    costo?: number;

    @IsDateString({}, { message: '(YYYY-MM-DD)' })
    marca_inicio?: string;

    @IsDateString({}, { message: '(YYYY-MM-DD)' })
    marca_fin?: string;

    @IsBoolean()
    estado?: boolean;



}
