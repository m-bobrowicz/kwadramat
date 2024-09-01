/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { default as cookieParser } from 'cookie-parser';
import { loadConfiguration } from './app/config/config';
import { AppModule } from './app/app.module';

const config = loadConfiguration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.http.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${config.http.port}/${globalPrefix}`
  );
}
bootstrap();
