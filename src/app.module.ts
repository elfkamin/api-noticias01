import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticiaModule } from './noticia/noticia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri =
          configService.get<string>('URI') ?? configService.get<string>('URL');

        if (!mongoUri) {
          throw new Error(
            'Falta la variable de entorno URI para conectar a MongoDB',
          );
        }

        return { uri: mongoUri };
      },
    }),
    NoticiaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
