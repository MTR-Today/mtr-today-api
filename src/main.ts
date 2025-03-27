import './worker.js';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module.js';

const app = await NestFactory.create(AppModule);
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }),
);

const config = new DocumentBuilder()
  .setTitle('MTR Today API')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api/v1', app, document);

app.enableCors({
  origin: [
    'https://www.mtr.today',
    'https://mtr.today',
    'http://dev.mtr.today:5173',
  ],
});

await app.listen(3000);
