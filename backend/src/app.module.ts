import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GeneratorModule } from './generator/generator.module'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'schema.gql',
    }),
    GeneratorModule,
    process.env.NODE_ENV === 'production' &&
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/',
      }),
  ].filter(Boolean),
  controllers: [],
  providers: [],
})
export class AppModule {}
