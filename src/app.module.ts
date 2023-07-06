import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'

import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { FaresModule } from './modules/fares/fares.module.js'
import { LinesModule } from './modules/lines/lines.module.js'
import { SchedulesModule } from './modules/schedules/schedules.module.js'
import { StopsModule } from './modules/stops/stops.module.js'

@Module({
  imports: [
    LinesModule,
    StopsModule,
    SchedulesModule,
    FaresModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/api/v1/graphql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault() as any],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
