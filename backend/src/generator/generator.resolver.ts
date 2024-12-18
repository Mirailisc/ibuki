import { Resolver, Query, Args } from '@nestjs/graphql'
import { GeneratorService } from './generator.service'
import { Generator } from './entities/generator.entity'
import { GeneratorInput } from './dto/generator.input'

const MAX_ATTEMPTS = 3

@Resolver(() => Generator)
export class GeneratorResolver {
  constructor(private readonly generatorService: GeneratorService) {}

  @Query(() => [Generator], { name: 'generator' })
  async generate(@Args('input') input: GeneratorInput): Promise<Generator[]> {
    const results: Generator[] = []
    const seenUrls = new Set<string>()

    const fetchData = async (character: string): Promise<void> => {
      let attempts = 0
      const promises: Promise<void>[] = []

      while (results.length < input.limit && attempts < MAX_ATTEMPTS) {
        attempts++
        promises.push(
          this.generatorService.getImagesFromApi(character).then((data) => {
            if (data && !seenUrls.has(data.original)) {
              results.push(data)
              seenUrls.add(data.original)
            }
          }),
        )
      }

      await Promise.all(promises)

      if (results.length < input.limit) {
        await fetchData(character)
      }
    }

    await fetchData(input.character)

    return results.slice(0, input.limit)
  }
}
