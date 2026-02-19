import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApiResponseNoticia,
  Seccion,
} from './interfaces/noticia/noticia.interface';
import { Model } from 'mongoose';
import { NoticiaDto } from './dto/noticia.dto/noticia.dto';

@Injectable()
export class NoticiaService {
  constructor(
    @InjectModel('Noticia') private noticiaModel: Model<ApiResponseNoticia>,
  ) {}

  async addNoticia(noticiaDTO: NoticiaDto): Promise<any> {
    const noticia = new this.noticiaModel(noticiaDTO);
    return noticia.save();
  }

  async getNoticias(): Promise<ApiResponseNoticia[]> {
    return this.noticiaModel.find().exec();
  }

  async getNoticiaById(id: string): Promise<ApiResponseNoticia> {
    const noticia = await this.noticiaModel.findById(id).exec();

    if (!noticia) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado la noticia',
      });
    }

    return noticia;
  }

  async getNoticiaPorTituloAutor(texto: string): Promise<ApiResponseNoticia[]> {
    return this.noticiaModel
      .find({
        $or: [
          { titulo: { $regex: texto, $options: 'i' } },
          { autor: { $regex: texto, $options: 'i' } },
        ],
      })
      .exec();
  }

  async getNoticiasPorNombreSeccion(
    nombre: string,
  ): Promise<ApiResponseNoticia[]> {
    return this.noticiaModel.find({ 'seccion.nombre': nombre }).exec();
  }

  async updateNoticia(idNoticia: string, noticiaDTO: NoticiaDto): Promise<any> {
    const updateNoticia = await this.noticiaModel
      .findByIdAndUpdate(idNoticia, { $set: noticiaDTO }, { new: true })
      .exec();
    if (!updateNoticia) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado la noticia',
      });
    }
    return updateNoticia;
  }

  async deleteNoticia(idNoticia: string): Promise<any> {
    const deletedNoticia = await this.noticiaModel
      .findByIdAndDelete(idNoticia)
      .exec();
    if (!deletedNoticia) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado la noticia',
      });
    }
    return deletedNoticia;
  }

  async getSecciones(): Promise<Seccion[]> {
    const secciones = await this.noticiaModel.distinct('seccion').exec();

    if (secciones.length === 0) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado ninguna seccion',
      });
    }
    return secciones;
  }
}
