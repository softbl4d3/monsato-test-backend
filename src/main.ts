import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap(): Promise<void> {
  const adapter = new ExpressAdapter();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, adapter, {
    abortOnError: false,
    autoFlushLogs: true,
    bufferLogs: true,
    bodyParser: true,
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.enableShutdownHooks();

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    enableDebugMessages: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: false,
    stopAtFirstError: true,
    validateCustomDecorators: true,
    transform: true,
  }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Monsato Test Assignment Backend')
    .addServer('/')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/swagger', app, swaggerDocument);

  const serverPort = parseInt(process.env.HTTP_PORT ?? '3000');
  const server = await app.listen(serverPort);
  server.setTimeout(5000);

  console.log(`API Server is running on port ${serverPort}`);
}

void bootstrap();
