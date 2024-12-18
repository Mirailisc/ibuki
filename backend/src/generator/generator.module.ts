import { Module } from '@nestjs/common'
import { GeneratorService } from './generator.service'
import { GeneratorResolver } from './generator.resolver'
import { APP_FILTER } from '@nestjs/core'
import { SentryGlobalFilter } from '@sentry/nestjs/setup'

@Module({
  providers: [
    GeneratorResolver,
    GeneratorService,
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
  ],
})
export class GeneratorModule {}
