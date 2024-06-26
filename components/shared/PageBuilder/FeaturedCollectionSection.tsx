import { Button } from '@/components/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { Media } from '@/components/Media';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { FeaturedCollectionProps } from '@/components/shared/PageBuilder/hooks';
import { ProductCard } from '@/components/shared/ProductCard';

interface PropsWithExtra extends FeaturedCollectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const FeaturedCollectionSection = ({ data }: Props) => {
  const {
    index,
    pageId,
    pageType,
    title,
    description,
    media,
    slug,
    buttonText,
    products,
    sectionSettings
  } = data;

  return (
    <Section
      label="featuredCollection"
      srHeading={`Featured collection – ${title ? title : 'Untitled'}`}
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <div className="flex flex-col gap-y-10 lg:hidden">
        <MediaContent title={title} description={description} media={media} />
        <div className="">
          <Carousel
            opts={{
              align: 'start'
            }}
          >
            <CarouselContent className="-ml-0 border border-brand-light-grey">
              {products.map((product) => {
                return (
                  <CarouselItem key={product.title + product.sku} className="basis-[80%] pl-0">
                    <div className="m-[-1px]">
                      <ProductCard
                        product={product}
                        firstImage={'product'}
                        imageSizes="(max-width: 1024px) 80vw, 40vw"
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        {buttonText && slug && (
          <Container>
            <Button asChild size="sm" className="w-full">
              <CustomLink href={slug}>{buttonText}</CustomLink>
            </Button>
          </Container>
        )}
      </div>
      <Container className="hidden lg:block">
        <Carousel
          opts={{
            slidesToScroll: 2
          }}
          className="grid gap-y-10"
        >
          <div className="flex justify-end">
            <div className="flex gap-x-4">
              <div className="flex gap-x-2">
                <CarouselPrevious />
                <CarouselNext className="relative" />
              </div>
              {buttonText && (
                <Button asChild size="md">
                  <CustomLink href={slug}>{buttonText}</CustomLink>
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-x-10">
            <MediaContent title={title} description={description} media={media} />
            <div className="w-full grow">
              <CarouselContent className="-ml-0 border border-brand-light-grey">
                {products.map((product) => {
                  return (
                    <CarouselItem key={product.title + product.sku} className="pl-0 lg:basis-1/2">
                      <div className="m-[-1px]">
                        <ProductCard product={product} firstImage={'product'} />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </div>
          </div>
        </Carousel>
      </Container>
    </Section>
  );
};

function MediaContent({
  title,
  description,
  media
}: {
  title: string;
  description: string;
  media: FeaturedCollectionProps['media'];
}) {
  return (
    <div className="lg:basis-1/2">
      <div className="!lg:aspect-none aspect-h-4 aspect-w-3 relative h-full w-full bg-gradient-to-t from-black/80 from-0% to-black/20 to-30%">
        <Media media={{ ...media }} loading="lazy" sizes="(max-width: 1024px) 100vw, 33vw" />
        <div className="flex h-full items-end justify-start">
          <div className="flex h-fit w-fit flex-col gap-y-4 p-8 text-white">
            {title && (
              <Heading as="h2" size="xl">
                {title}
              </Heading>
            )}
            {description && <Text>{description}</Text>}
          </div>
        </div>
      </div>
    </div>
  );
}
