import { Module } from '@nestjs/common'
import { GeneratorService } from './generator.service'
import { GeneratorResolver } from './generator.resolver'

@Module({
  providers: [GeneratorResolver, GeneratorService],
})
export class GeneratorModule {}
