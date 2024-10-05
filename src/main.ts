import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  //@ts-ignore
  await app.register(fastifyCookie, {

  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.setGlobalPrefix("api")

  await app.listen(3100);
}

bootstrap();
