import { Button } from '@/components/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { HotspotImage } from '@/components/HotspotImage';
import { Media } from '@/components/Media';
import { SectionHeader } from '@/components/SectionHeader';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { SanityLink } from '@/components/sanity/SanityLink';
import { FeaturedShoeSectionProps } from '@/components/shared/PageBuilder/hooks';
import { ProductCard } from '@/components/shared/ProductCard';

interface PropsWithExtra extends FeaturedShoeSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const FeaturedShoeSection = ({ data }: Props) => {
  const {
    index,
    pageId,
    pageType,
    title,
    description,
    link,
    badge,
    product,
    content,
    sectionSettings
  } = data;

  const firstContentItem = content?.[0];
  const restContentItems = content?.slice(1);

  const sizes = '(max-width: 1024px) 80vw, 40vw';

  return (
    <Section
      label="featuredShoe"
      srHeading={`Featured shoe – ${title ? title : 'Untitled'}`}
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <Carousel>
        <Container className="mr-0 flex flex-col gap-y-10">
          <SectionHeader
            title={title}
            badge={badge}
            description={description}
            className="lg:hidden"
          />
          <div className="hidden grid-cols-3 gap-4 lg:grid">
            <SectionHeader title={title} badge={badge} className="self-end" />
            {description && (
              <Text size="md" className="max-w-sm self-end text-brand-mid-grey">
                {description}
              </Text>
            )}
            <div className="flex items-end justify-end">
              <div className="flex gap-x-3">
                {link?.text && (
                  <Button size="md" asChild>
                    <SanityLink link={link}>{link.text}</SanityLink>
                  </Button>
                )}
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>
          <CarouselContent className="-ml-2 lg:-ml-4">
            <CarouselItem className="basis-[80%] lg:basis-1/3 relative pl-2 lg:pl-4">
              {firstContentItem ? (
                firstContentItem.type === 'hotspotImage' ? (
                  <HotspotImage
                    type="hotspotImage"
                    image={firstContentItem.image}
                    hotspots={firstContentItem.hotspots}
                    sizes={sizes}
                  />
                ) : (
                  <Media media={firstContentItem} loading="lazy" sizes={sizes} />
                )
              ) : null}
            </CarouselItem>
            <CarouselItem className="basis-[80%] lg:basis-1/3 relative pl-2 lg:pl-4">
              <div className="w-full">
                {product && <ProductCard product={product} imageSizes={sizes} />}
              </div>
            </CarouselItem>
            {restContentItems?.map((item, index) => (
              <CarouselItem key={index} className="basis-[80%] lg:basis-1/3">
                <div className="relative h-full w-full">
                  {item.type === 'hotspotImage' ? (
                    <HotspotImage
                      type="hotspotImage"
                      image={item.image}
                      hotspots={item.hotspots}
                      sizes={sizes}
                    />
                  ) : (
                    <Media media={item} loading="lazy" sizes={sizes} />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {link?.text && (
            <Button size="sm" asChild className="w-full lg:hidden">
              <SanityLink link={link}>{link.text}</SanityLink>
            </Button>
          )}
        </Container>
      </Carousel>
    </Section>
  );
};
