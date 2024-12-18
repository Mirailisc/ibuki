import Masonry from 'react-masonry-css'

type Props = {
  images: { preview: string; original: string }[]
}

const MasonryImages: React.FC<Props> = ({ images }: Props): JSX.Element => {
  return (
    <Masonry
      breakpointCols={{
        default: 5,
        576: 1,
        768: 3,
        1024: 4,
      }}
      className="flex gap-4"
      columnClassName="masonry-column"
    >
      {images.map((image, i) => (
        <div key={i} className="mb-4 overflow-hidden rounded-lg">
          <div className="w-full">
            {image.preview && (
              <a href={image.original} target="_blank" rel="noopener noreferrer">
                <img src={image.preview} alt={`Image ${i}`} className="h-auto w-full rounded-md object-cover" />
              </a>
            )}
          </div>
        </div>
      ))}
    </Masonry>
  )
}

export default MasonryImages
