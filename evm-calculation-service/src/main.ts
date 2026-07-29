import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // habilitar CORS
  app.enableCors();
  // Crean prefijo global
  app.setGlobalPrefix('api');

  //Validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const PORT = process.env.PORT ?? 3000;
  await app
    .listen(PORT)
    .then(() => console.log('Ejecutando micro servicio en el puerto 🚀', PORT));
}
bootstrap();
