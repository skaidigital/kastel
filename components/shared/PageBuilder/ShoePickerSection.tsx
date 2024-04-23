'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/form/RadixSelect';
import { ShoePickerProps } from '@/components/shared/PageBuilder/hooks';
import { ProductCard } from '@/components/shared/ProductCard';
import { useState } from 'react';

interface PropsWithExtra extends ShoePickerProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const ShoePickerSection = ({ data }: Props) => {
  const { index, pageId, pageType, title, types, sectionSettings } = data;

  // TODO fix should not be undefined-able
  const [activeTypeName, setActiveTypeName] = useState<string | undefined>(types[0]?.title);
  const activeType = types.find((type) => type.title === activeTypeName);

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
            {activeType?.title && (
              <Select value={activeTypeName} onValueChange={setActiveTypeName}>
                <SelectTrigger className="w-fit shrink-0 bg-brand-primary px-6 py-4 text-overline-md font-bold uppercase text-white">
                  <SelectValue>{activeTypeName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {types?.map((type) => (
                    <SelectItem
                      key={type.title}
                      value={type.title}
                      className="rounded-none bg-white text-overline-md uppercase hover:bg-brand-primary hover:text-white focus:bg-brand-primary focus:text-white"
                    >
                      {type.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="hidden gap-2 lg:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Container>
        <CarouselContent className="divide-x divide-brand-light-grey">
          {activeType?.items.map((item, index) => {
            if (item.type === 'product') {
              return (
                <CarouselItem key={item.title + index} className="basis-[80%] pl-0 lg:basis-[25%]">
                  <ProductCard
                    title={item.title}
                    firstImage={'product'}
                    mainImage={item.mainImage}
                    lifestyleImage={item.lifestyleImage}
                    badges={item.badges}
                    slug={item.slug}
                    type={item.type}
                  />
                </CarouselItem>
              );
            }
            // TODO find a better key
            return (
              <CarouselItem key={index} className="relative h-auto basis-[80%] pl-0 lg:basis-[25%]">
                <Media media={item} loading="lazy" />j
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </Section>
  );
};
