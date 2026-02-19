import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NoticiaService } from './noticia.service';
import { NoticiaDto } from './dto/noticia.dto/noticia.dto';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ha ocurrido un error inesperado';
}

@Controller('/api/v2/noticias')
export class NoticiaController {
  constructor(private readonly noticiaService: NoticiaService) {}

  @Post('agregar')
  async addNoticia(@Body() noticiaDto: NoticiaDto) {
    try {
      await this.noticiaService.addNoticia(noticiaDto);
      return {
        status: true,
        message: 'Noticia agregada',
      };
    } catch (error: unknown) {
      throw new BadRequestException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }

  @Get('')
  async getNoticias() {
    try {
      const data = await this.noticiaService.getNoticias();
      return {
        status: true,
        noticias: data,
      };
    } catch (error: unknown) {
      throw new BadRequestException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }

  @Put('update/:id')
  async updateNoticia(@Param('id') id: string, @Body() noticiaDto: NoticiaDto) {
    try {
      await this.noticiaService.updateNoticia(id, noticiaDto);
      return {
        status: true,
        message: 'Noticia actualizada',
      };
    } catch (error: unknown) {
      throw new BadRequestException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }

  @Delete('delete/:id')
  async deleteNoticia(@Param('id') id: string) {
    try {
      await this.noticiaService.deleteNoticia(id);
      return {
        status: true,
        message: 'Noticia eliminada',
      };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }

  @Get('unaNoticia/:id')
  async getNoticia(@Param('id') id: string) {
    try {
      const data = await this.noticiaService.getNoticiaById(id);
      return {
        status: true,
        noticia: data,
      };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }

  @Get('buscarNoticiaToA/:tituloAutor')
  async getNoticiaPorTituloAutor(@Param('tituloAutor') tituloAutor: string) {
    try {
      const data =
        await this.noticiaService.getNoticiaPorTituloAutor(tituloAutor);
      return {
        status: true,
        noticia: data,
      };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }

  @Get('secciones')
  async getSecciones() {
    try {
      const data = await this.noticiaService.getSecciones();
      return {
        status: true,
        noticia: data,
      };
    } catch (error: unknown) {
      throw new BadRequestException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }

  @Get('noticiasPorSeccion/:nombre')
  async getNoticiasPorNombreSeccion(@Param('nombre') nombre: string) {
    try {
      const data =
        await this.noticiaService.getNoticiasPorNombreSeccion(nombre);
      return {
        status: true,
        noticia: data,
      };
    } catch (error: unknown) {
      throw new BadRequestException({
        status: false,
        message: getErrorMessage(error),
      });
    }
  }
}
