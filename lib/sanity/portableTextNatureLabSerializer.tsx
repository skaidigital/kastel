import { AspectRatio } from '@/components/AspectRatio'
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel'
import LazyLoadedVideo from '@/components/LazyLoadedVideo'
import { ListItem } from '@/components/base/ListItem'
import { OL } from '@/components/base/OL'
import { Text } from '@/components/base/Text'
import { UL } from '@/components/base/UL'
import { ProductHoverCard } from '@/components/sanity/ProductHoverCard'
import { Quote } from '@/components/sanity/Quote'
import { SanityImage } from '@/components/sanity/SanityImage'
import { SanityLink } from '@/components/sanity/SanityLink'
import { ProductCard } from '@/components/shared/ProductCard'
import { ProductCardProps } from '@/lib/sanity/types'

export const portableTextNatureLabSerializer = {
  block: {
    normal: ({ children }: any) => (
      <p className="mt-6 font-nature-lab-body text-nature-lab-md text-brand-mid-grey">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-12 font-nature-lab-heading uppercase text-nature-lab-dark-grey text-nature-lab-heading-md">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-12 font-nature-lab-heading uppercase text-nature-lab-dark-grey text-nature-lab-heading-sm">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mt-6 font-nature-lab-body text-nature-lab-dark-grey text-nature-lab-lg">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children, value }: any) => {
      const { level } = value

      return (
        <UL level={level} className="font-nature-lab-body text-nature-lab-md pb-0 lg:pb-0">
          {children}
        </UL>
      )
    },
    number: ({ children, value }: any) => {
      const { level } = value

      return (
        <OL
          level={level}
          className="font-nature-lab-body text-nature-lab-md list-inside lg:pl-4 pb-0 lg:pb-0"
        >
          {children}
        </OL>
      )
    }
  },
  listItem: {
    bullet: ({ children, value }: any) => {
      const { level } = value
      return (
        <ListItem level={level} className="text-brand-mid-grey">
          {children}
        </ListItem>
      )
    },
    number: ({ children, value }: any) => {
      const { level } = value
      return (
        <ListItem level={level} className="text-brand-mid-grey">
          {children}
        </ListItem>
      )
    }
  },

  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    inlineLink: ({ children, value }: any) => (
      <SanityLink link={value.link} className="underline">
        {children}
      </SanityLink>
    ),
    productLink: ({ children, value }: any) => {
      return <ProductHoverCard value={value}>{children}</ProductHoverCard>
    }
  },

  // # Custom types
  types: {
    image: ({ value }: any) => {
      return (
        <figure className="my-10">
          <SanityImage image={value} />
          {value.caption && (
            <figcaption>
              <Text size="eyebrow" as="p" className="mt-3">
                {value.caption}
              </Text>
            </figcaption>
          )}
        </figure>
      )
    },
    video: ({ value }: any) => {
      return (
        <div className="relative mt-6 w-full">
          {value?.aspectRatio && (
            <AspectRatio settings={{ sameAspectRatio: true, aspectRatio: value.aspectRatio }}>
              {value.videoUrl && (
                <LazyLoadedVideo
                  playbackId={value.videoUrl}
                  loading="lazy"
                  resolution="HD"
                  controls
                />
              )}
            </AspectRatio>
          )}
        </div>
      )
    },
    quote: ({ value }: any) => <Quote quote={value} type="natureLab" />,
    // TODO fix products going being limited by the container
    products: ({ value }: any) => {
      const productCount = value?.products?.length

      if (productCount === 0) {
        return null
      }

      return (
        <div className="mt-12">
          {/* Mobile */}
          <div className="flex w-full flex-col gap-y-4 lg:gap-y-6">
            {value.title && (
              <h2 className="mt-12 font-nature-lab-heading uppercase text-nature-lab-dark-grey text-nature-lab-heading-md">
                {value.title}
              </h2>
            )}
            {/* Mobile */}
            <Carousel className="lg:hidden">
              <CarouselContent className="-ml-0">
                {value?.products?.map((product: ProductCardProps) => (
                  <CarouselItem className="basis-[80%] lg:basis-1/2 pl-0" key={product.gid}>
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Desktop */}
            <div className="hidden lg:grid lg:grid-cols-2">
              {value?.products?.map((product: ProductCardProps) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </div>
      )
    }
  }
}
