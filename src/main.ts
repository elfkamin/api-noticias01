import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins = process.env.CORS_ORIGIN?.split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  app.enableCors({
    origin: corsOrigins?.length ? corsOrigins : true,
    credentials: Boolean(corsOrigins?.length),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 8080);
  console.log('Servidor corriendo y Mongo conectado');
}

void bootstrap();
