import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentarios_incidente.dto';

export class UpdateComentariosIncidenteDto extends PartialType(CreateComentarioDto) {}
