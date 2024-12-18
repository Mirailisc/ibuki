import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class GeneratorInput {
  @Field(() => String, { description: 'character name' })
  character: string

  @Field(() => Int, {
    description: 'number of images to generate',
    defaultValue: 10,
  })
  limit: number
}
