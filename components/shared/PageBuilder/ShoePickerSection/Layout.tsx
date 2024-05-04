import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { Media } from '@/components/Media';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { TypeSelector } from '@/components/shared/PageBuilder/ShoePickerSection/TypeSelector';
import { ShoePickerProps } from '@/components/shared/PageBuilder/hooks';
import { ProductCard } from '@/components/shared/ProductCard';

interface Props {
  index: number;
  pageId: string;
  pageType: string;
  title: string;
  types: ShoePickerProps['types'];
  activeType: ShoePickerProps['types'][0];
  activeTypeName: string;
  sectionSettings: ShoePickerProps['sectionSettings'];
}

export function ShoePickerLayout({
  index,
  pageId,
  pageType,
  title,
  types,
  activeType,
  activeTypeName,
  sectionSettings
}: Props) {
  return (
    <Section
      label="shoePickerSection"
      srHeading={`A selection of shoes based on characteristics`}
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 1
        }}
        className="flex flex-col gap-y-8 lg:gap-y-10"
      >
        <Container className="flex items-end justify-between">
          <div className="flex flex-col gap-y-4 lg:shrink-0 lg:flex-row lg:items-end lg:gap-x-6 lg:gap-y-0">
            {title && (
              <Heading className="max-w-[90%] text-balance text-heading-lg lg:max-w-md lg:shrink-0 lg:text-heading-xl">
                {title}
              </Heading>
            )}
            {activeType?.title && <TypeSelector types={types} activeTypeName={activeTypeName} />}
          </div>
          <div className="hidden gap-2 lg:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Container>
        <CarouselContent className="-ml-0 border-y border-brand-light-grey">
          {activeType?.items.map((item, index) => {
            if (item.type === 'product') {
              return (
                <CarouselItem
                  key={item.title + index}
                  className="m-[-1px] basis-[80%] pl-0 lg:basis-[25%]"
                >
                  <ProductCard
                    firstImage={'product'}
                    product={item}
                    imageSizes="(max-width: 1024px) 80vw, 30vw"
                  />
                </CarouselItem>
              );
            }
            return (
              <CarouselItem
                key={index}
                className="relative m-[-1px] h-auto basis-[80%] pl-0 lg:basis-[25%]"
              >
                <Media media={item} loading="lazy" sizes="(max-width: 1024px) 80vw, 30vw" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
