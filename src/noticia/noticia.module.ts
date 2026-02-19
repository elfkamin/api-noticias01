import { Module } from '@nestjs/common';
import { NoticiaController } from './noticia.controller';
import { NoticiaService } from './noticia.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticiaSchema } from './schema/noticia.schema/noticia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Noticia',
        schema: NoticiaSchema,
        collection: 'noticias2526',
      },
    ]),
  ],
  controllers: [NoticiaController],
  providers: [NoticiaService],
})
export class NoticiaModule {}
