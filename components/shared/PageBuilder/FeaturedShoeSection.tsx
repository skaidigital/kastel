import { Button } from '@/components/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { HotspotImage } from '@/components/HotspotImage';
import { Media } from '@/components/Media';
import { SectionHeader } from '@/components/SectionHeader';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { FeaturedShoeSectionProps } from '@/components/shared/PageBuilder/hooks';
import { ProductCard } from '@/components/shared/ProductCard';
import { resolveLink } from '@/lib/sanity/resolveLink';

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

  const href = resolveLink(link);

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
                    <CustomLink href={href}>{link.text}</CustomLink>
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
                  />
                ) : (
                  <Media media={firstContentItem} loading="lazy" />
                )
              ) : null}
            </CarouselItem>
            <CarouselItem className="basis-[80%] lg:basis-1/3 relative border-x border-t border-brand-light-grey pl-2 lg:pl-4">
              <div className="w-full">
                {product && (
                  <ProductCard
                    title={product.title}
                    gid={product.gid}
                    sku={product.sku}
                    slug={product.slug}
                    mainImage={product.mainImage}
                    lifestyleImage={product.lifestyleImage}
                    badges={product.badges}
                    type="product"
                  />
                )}
              </div>
            </CarouselItem>
            {restContentItems?.map((item, index) => (
              <CarouselItem key={index} className="basis-[80%] lg:basis-1/3">
                <div className="relative h-full w-full">
                  {item.type === 'hotspotImage' ? (
                    <HotspotImage type="hotspotImage" image={item.image} hotspots={item.hotspots} />
                  ) : (
                    <Media media={item} loading="lazy" />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {link?.text && (
            <Button size="sm" asChild className="mt-10 w-full lg:hidden">
              <CustomLink href={href}>{link.text}</CustomLink>
            </Button>
          )}
        </Container>
      </Carousel>
    </Section>
  );
};
