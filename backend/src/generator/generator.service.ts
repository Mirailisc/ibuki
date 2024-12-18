import { Injectable, Logger } from '@nestjs/common'
import { Generator } from './entities/generator.entity'
import { axiosInstance } from 'src/lib/axios'

const MAX_PAGE_INDEX = 2000

export const isValidImageUrl = (url: string): boolean => {
  const imageRegex = /\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff)$/i
  return imageRegex.test(url)
}

@Injectable()
export class GeneratorService {
  private logger: Logger = new Logger('GeneratorService')
  private static cache: Map<string, Generator> = new Map()

  async getImagesFromApi(character: string): Promise<Generator | null> {
    const pageIndex = Math.floor(Math.random() * MAX_PAGE_INDEX)
    const cacheKey = `images:${character}:${pageIndex}`

    if (GeneratorService.cache.has(cacheKey)) {
      this.logger.log(
        `Cache hit for character: ${character}, pageIndex: ${pageIndex}`,
      )
      return GeneratorService.cache.get(cacheKey)!
    }

    try {
      const { data } = await axiosInstance.get(
        `https://danbooru.donmai.us/posts/random.json?tags=${character}_(blue_archive)&pages=${pageIndex}`,
      )

      if (!data.file_url || !data.media_asset?.variants?.length) {
        this.logger.warn(`Invalid data at pageIndex ${pageIndex}:`)
        return null
      }

      const previewUrl = data.media_asset.variants.find(
        (variant: { type: string; url: string }) => variant.type === '360x360',
      )?.url

      if (!previewUrl || !isValidImageUrl(previewUrl)) {
        this.logger.warn(
          `Invalid preview URL at pageIndex ${pageIndex}`,
          previewUrl,
        )
        return null
      }

      const result: Generator = {
        original: data.file_url,
        preview: previewUrl,
      }

      // Save the result to in-memory cache
      GeneratorService.cache.set(cacheKey, result)

      return result
    } catch (error) {
      this.logger.error(
        `Failed to fetch data for character: ${character}, pageIndex: ${pageIndex}`,
        error.message,
      )
      return null
    }
  }
}
