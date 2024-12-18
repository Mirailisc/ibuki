import { useQuery } from '@apollo/client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { ThreeDot } from 'react-loading-indicators'
import MasonryImages from './MasonryImages'
import { gql } from '@apollo/client'

const GET_IMAGES = gql`
  query GetImages($character: String!, $limit: Int!) {
    generator(input: { character: $character, limit: $limit }) {
      original
      preview
    }
  }
`

const Gallery: React.FC = (): JSX.Element => {
  const [character] = useState<string>('koharu')
  const [images, setImages] = useState<{ preview: string; original: string }[]>([])
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const { data, loading, fetchMore } = useQuery(GET_IMAGES, {
    variables: { character, limit: 10 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data) {
      setImages((prev) => [...prev, ...data.generator])
      if (data.generator.length < 10) {
        setHasMore(false)
      }

      if (loadMoreRef.current) {
        loadMoreTrigger(loadMoreRef.current)
      }
    }
  }, [data])

  const loadMoreTrigger = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            handleLoadMore()
          }
        },
        { threshold: 1 },
      )

      if (node) observer.current.observe(node)
    },
    [hasMore, loading],
  )

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchMore({
        variables: {
          character,
          limit: 10,
        },
      })
    }
  }

  useEffect(() => {
    if (loadMoreRef.current) {
      loadMoreTrigger(loadMoreRef.current)
    }
  }, [loadMoreTrigger])

  return (
    <div className="mt-20 p-4">
      <MasonryImages images={images} />
      <div className="py-4 text-center">{loading && <ThreeDot color="#f7b65c" size="small" />}</div>
      <div ref={loadMoreRef} className="py-4 text-center" />
    </div>
  )
}

export default Gallery
