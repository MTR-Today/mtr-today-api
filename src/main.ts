import './worker.js'

import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'

import { AppModule } from './app.module.js'

const app = await NestFactory.create(AppModule)
app.use(helmet())
app.enableCors({
  origin: [
    'https://www.mtr.today',
    'https://mtr.today',
    'http://dev.mtr.today:5173',
  ],
})

await app.listen(3000)
