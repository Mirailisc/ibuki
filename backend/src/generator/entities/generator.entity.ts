import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Generator {
  @Field(() => String, { description: 'original image url' })
  original: string

  @Field(() => String, { description: 'preview image url' })
  preview: string
}
