import { AspectRatio } from '@/components/AspectRatio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { HotspotImage } from '@/components/HotspotImage';
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger
} from '@/components/HybridTooltip';
import LazyLoadedVideo from '@/components/LazyLoadedVideo';
import { Media } from '@/components/Media';
import { Quote } from '@/components/Quote';
import { TooltipProvider } from '@/components/Tooltip';
import { Container } from '@/components/base/Container';
import { ListItem } from '@/components/base/ListItem';
import { OL } from '@/components/base/OL';
import { Text } from '@/components/base/Text';
import { UL } from '@/components/base/UL';
import { BlogWidthContainer } from '@/components/pages/BlogPost/BlogWidthContainer';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityLink } from '@/components/sanity/SanityLink';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductCardProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';

export const portableTextBlogPostSerializer = {
  block: {
    'text-sm': ({ children }: any) => (
      <Text
        className="mx-auto mt-6 max-w-[--blog-post-container-md] text-brand-mid-grey"
        as="p"
        size="sm"
      >
        {children}
      </Text>
    ),
    normal: ({ children }: any) => (
      <Text
        size="md"
        className="mx-auto mt-6 max-w-[--blog-post-container-md] text-brand-mid-grey"
        as="p"
      >
        {children}
      </Text>
    ),
    'text-lg': ({ children }: any) => (
      <Text
        className="mx-auto mt-6 max-w-[--blog-post-container-md] text-brand-mid-grey"
        as="p"
        size="lg"
      >
        {children}
      </Text>
    ),
    h2: ({ children }: any) => (
      <h2
        data-name="h2"
        className="mx-auto mt-12 max-w-[--blog-post-container-md] text-balance text-heading-sm font-bold"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mx-auto mt-8 max-w-[--blog-post-container-md] text-heading-xs font-bold">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mx-auto mb-6 mt-12 max-w-[--blog-post-container-md] text-lg lg:text-lg">
        &ldquo;{children}&ldquo;
      </blockquote>
    )
    // TODO add h4
  },
  list: {
    bullet: ({ children, value }: any) => {
      const { level } = value;

      return (
        <UL
          level={level}
          className="mx-auto mt-5 flex max-w-[--blog-post-container-md] flex-col gap-y-2"
        >
          {children}
        </UL>
      );
    },
    number: ({ children, value }: any) => {
      const { level } = value;

      return (
        <OL
          level={level}
          className="mx-auto mt-5 flex max-w-[--blog-post-container-md] flex-col gap-y-2 first:bg-black"
        >
          {children}
        </OL>
      );
    }
  },
  listItem: {
    bullet: ({ children, value, index }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className={cn('pt-0 text-brand-mid-grey', index === 0 && 'mt-4')}>
          {children}
        </ListItem>
      );
    },
    number: ({ children, value, index }: any) => {
      const { level } = value;
      return (
        <ListItem level={level} className={cn('pt-0 text-brand-mid-grey', index === 0 && 'mt-4')}>
          {children}
        </ListItem>
      );
    }
  },

  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    muted: ({ children }: any) => <Text>{children}</Text>,
    inlineLink: ({ children, value }: any) => (
      <SanityLink link={value.link} className="underline">
        {children}
      </SanityLink>
    ),
    productLink: ({ children, value }: any) => {
      return (
        <TooltipProvider delayDuration={0}>
          <HybridTooltip>
            <HybridTooltipTrigger className="bg-brand-primary px-1 font-medium text-white">
              {children}
            </HybridTooltipTrigger>
            <HybridTooltipContent className="border-none p-0">
              {value.product && <ProductCard product={value.product} />}
            </HybridTooltipContent>
          </HybridTooltip>
        </TooltipProvider>
      );
    }
  },
  types: {
    image: ({ value }: any) => {
      return (
        <BlogWidthContainer width={value.width} className="relative">
          <figure className="my-10">
            {value?.asset?._ref && (
              <SanityImage
                image={value}
                sizes={
                  value.width === 'wide'
                    ? '(max-width: 768px) 100vw, 1100px'
                    : '(max-width: 768px) 100vw, 900px'
                }
              />
            )}
            {value.caption && (
              <Text size="eyebrow" as="p" className="mt-3" asChild>
                <figcaption>{value.caption}</figcaption>
              </Text>
            )}
          </figure>
        </BlogWidthContainer>
      );
    },
    imageGrid: ({ value }: any) => {
      return (
        <BlogWidthContainer
          width={value.width}
          className="relative my-10 flex flex-col gap-10 lg:flex-row"
        >
          {value?.images?.map((image: any, index: number) => (
            <figure key={index} className="w-full flex-1">
              <AspectRatio
                settings={image?.aspectRatioSettings}
                className="relative flex flex-col justify-start"
              >
                {image?.asset?._ref && <SanityImage image={image} fill className="absolute" />}
              </AspectRatio>
              {image.caption && (
                <Text size="sm" className="mt-3" asChild>
                  <figcaption>{image.caption}</figcaption>
                </Text>
              )}
            </figure>
          ))}
        </BlogWidthContainer>
      );
    },
    video: ({ value }: any) => {
      return (
        <BlogWidthContainer width={value.width} className="my-10">
          {value?.aspectRatioSettings && (
            <AspectRatio settings={value.aspectRatioSettings}>
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
        </BlogWidthContainer>
      );
    },
    hotspotImage: ({ value }: any) => {
      const aspectRatio: any = convertAspectRatio(value?.image?.image?.aspectRatio);

      return (
        <BlogWidthContainer width={value.width} className="mt-6">
          {value.image && value.image.hotspots && (
            <AspectRatio
              settings={{
                aspectRatio,
                sameAspectRatio: true
              }}
            >
              <HotspotImage
                type={value.image.type}
                image={value.image.image}
                hotspots={value.image.hotspots}
                sizes="100vw"
              />
            </AspectRatio>
          )}
        </BlogWidthContainer>
      );
    },
    quote: ({ value }: any) => <Quote quote={value} />,
    // TODO turn this into a component? Getting a bit big
    products: ({ value }: any) => {
      const productCount = value?.products?.length;

      if (productCount === 0 || productCount === 1) {
        return null;
      }

      if (productCount >= 2) {
        return (
          <>
            <div className="flex w-full flex-col gap-y-4 lg:hidden lg:gap-y-6">
              {value.title && (
                <h2 className="mx-4 text-heading-sm font-bold uppercase lg:text-heading-lg">
                  {value.title}
                </h2>
              )}
              <Carousel className="ml-4">
                <CarouselContent className="-ml-0">
                  {value?.products?.map((product: ProductCardProps) => (
                    <CarouselItem className="basis-[80%] pl-0" key={product.gid}>
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <BlogWidthContainer width="wide" className="hidden w-full py-12 lg:flex">
              <div className="flex w-full flex-col gap-y-4 lg:gap-y-6">
                {productCount === 2 && (
                  <div className="flex flex-col gap-y-4 lg:gap-y-6">
                    {value.title && (
                      <h2 className="text-heading-sm font-bold uppercase lg:text-heading-lg">
                        {value.title}
                      </h2>
                    )}
                    <div className="flex">
                      {value?.products?.map((product: ProductCardProps) => (
                        <div className="flex-1" key={product.gid}>
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {productCount > 2 && (
                  <Carousel className="flex flex-col gap-y-4 lg:gap-y-6">
                    <div className="flex items-center justify-between">
                      {value.title && (
                        <h2 className="text-heading-sm font-bold uppercase lg:text-heading-lg">
                          {value.title}
                        </h2>
                      )}
                      <div className="flex gap-x-2">
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </div>
                    <CarouselContent className="-ml-0 border border-brand-light-grey">
                      {value?.products?.map((product: ProductCardProps) => (
                        <CarouselItem className="pl-0 lg:basis-1/3" key={product.gid}>
                          <div className="m-[-1px]">
                            <ProductCard product={product} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
              </div>
            </BlogWidthContainer>
          </>
        );
      }
    },
    standout: ({ value }: any) => {
      return (
        <div
          style={{
            backgroundColor: value.backgroundColor ? value.backgroundColor : 'transparent'
          }}
          className="full-bleed my-10 px-4 py-10 lg:my-20 lg:py-20"
        >
          <BlogWidthContainer width="wide">
            <Container className="flex flex-col gap-x-10 lg:flex-row">
              <div className="flex flex-1 items-center">
                {value.content && (
                  <div className="noMarginFirstChild">
                    <PortableText
                      value={value.content}
                      components={portableTextBlogPostSerializer}
                    />
                  </div>
                )}
              </div>
              <div className="mt-10 flex-1 lg:mt-0">
                {value.type === 'media' && value.media && value.aspectRatioSettings && (
                  <AspectRatio settings={value.aspectRatioSettings} className="relative">
                    <Media media={value.media} loading="lazy" />
                  </AspectRatio>
                )}
                {value.type === 'product' && value.product && (
                  <ProductCard product={value.product} />
                )}
              </div>
            </Container>
          </BlogWidthContainer>
        </div>
      );
    }
  }
};

function convertAspectRatio(aspectRatio: number) {
  if (aspectRatio === 0) return '0:0'; // Handle edge case

  // Consider aspect ratio as width/height
  const width = aspectRatio;
  const height = 1;

  // Function to find the greatest common divisor (GCD) using Euclidean algorithm
  function gcd(a: number, b: number): any {
    return b === 0 ? a : gcd(b, a % b);
  }

  // Simplify the ratio
  const divisor = gcd(width, height);
  const simplifiedWidth = width / divisor;
  const simplifiedHeight = height / divisor;

  return `${simplifiedWidth}:${simplifiedHeight}`;
}
