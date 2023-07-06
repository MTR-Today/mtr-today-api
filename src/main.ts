import './worker.js'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'

const app = await NestFactory.create(AppModule)
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  })
)

app.enableCors({
  origin: [
    'https://www.mtr.today',
    'https://mtr.today',
    'http://dev.mtr.today:5173',
  ],
})

await app.listen(3000)
