import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ThrottlerGuard } from './guards/ThrottlerGuard.js';
import { FaresModule } from './modules/fares/fares.module.js';
import { LinesModule } from './modules/lines/lines.module.js';
import { SchedulesModule } from './modules/schedules/schedules.module.js';
import { StopsModule } from './modules/stops/stops.module.js';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000,
          limit: 1,
        },
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/api/v1/graphql',
      playground: false,
      // biome-ignore lint/suspicious/noExplicitAny: cast type
      plugins: [ApolloServerPluginLandingPageLocalDefault() as any],
      // biome-ignore lint/suspicious/noExplicitAny: unknown type
      context: (req: any, res: any) => ({ req, res }),
    }),
    ScheduleModule.forRoot(),

    LinesModule,
    StopsModule,
    SchedulesModule,
    FaresModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
