'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { CustomLink } from '@/components/CustomLink';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import {
  CarouselNext,
  CarouselPrevious
} from '@/components/shared/Cart/CrossSell/CrossSellCarouselButton';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ProductSiblings } from './hooks';

interface Props {
  products: ProductSiblings;
}

export function ColorSelect({ products }: Props) {
  const pathname = usePathname();
  const { lang } = useBaseParams();
  const urlSlug = pathname.split('/').pop();

  const activeProduct = products.find((product) => product.slug === urlSlug);

  const colorString = getColorString(lang);

  return (
    <Carousel className="" opts={{ align: 'start' }}>
      <div className="flex justify-between">
        <Text as="p" size="xs" className="mb-3">
          {colorString}: {activeProduct?.title}
        </Text>
        <div className="hidden gap-x-1 lg:flex">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent className="-ml-1">
        {products.map((product) => (
          <CarouselItem key={product.title} className="basis-[22%] pl-1">
            <CustomLink key={product.mainImage.asset._ref} href={`/products/${product.slug}`}>
              <div
                className={cn(
                  'aspect-h-4 aspect-w-3 relative h-0 w-full rounded-sm border-2',
                  urlSlug === product.slug ? ' border-brand-primary' : ' border-brand-light-grey'
                )}
              >
                <SanityImage
                  image={product.mainImage}
                  fill
                  className="absolute object-cover object-top"
                />
              </div>
            </CustomLink>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function getColorString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Color';
    case 'no':
      return 'Farge';
    default:
      return 'Color';
  }
}
