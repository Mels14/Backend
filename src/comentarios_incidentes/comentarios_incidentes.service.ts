import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentarios_incidente.dto';
import { UpdateComentariosIncidenteDto } from './dto/update-comentarios_incidente.dto';

@Injectable()
export class ComentariosIncidentesService {
  create(CreateComentarioDto: CreateComentarioDto) {
    return 'This action adds a new comentariosIncidente';
  }

  findAll() {
    return `This action returns all comentariosIncidentes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentariosIncidente`;
  }

  update(id: number, updateComentariosIncidenteDto: UpdateComentariosIncidenteDto) {
    return `This action updates a #${id} comentariosIncidente`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentariosIncidente`;
  }
}
