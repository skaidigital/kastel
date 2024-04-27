'use server';

import { getDictionary } from '@/app/dictionaries';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import {
  CarouselNext,
  CarouselPrevious
} from '@/components/shared/Cart/CrossSell/CrossSellCarouselButton';
import { CrossSellItem } from '@/components/shared/Cart/CrossSell/CrossSellItem';
import { CrossSellProducts, getCrossSellQuery } from '@/components/shared/Cart/CrossSell/hooks';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { env } from '@/env';
import { loadQuery } from '@/lib/sanity/store';
import { getCart } from '@/lib/shopify';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';

async function loadCrossSellProducts({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = getCrossSellQuery({ market, lang });

  return loadQuery<CrossSellProducts>(query, {}, { next: { tags: [CACHE_TAGS.MERCHANDISING] } });
}

interface Props {
  market: MarketValues;
  lang: LangValues;
  className?: string;
}

export async function CrossSell({ market, lang, className }: Props) {
  const cartId = cookies().get('cartId')?.value;

  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cart) {
    console.log('no cart');
    return null;
  }

  const currencyCode = env.NEXT_PUBLIC_SHOPIFY_CURRENCY;

  const dict = await getDictionary();
  const dictionary = dict.cart_drawer.cross_sell;
  const initial = await loadCrossSellProducts({ market, lang });

  if (!initial.data) {
    return null;
  }

  // const dataWithoutNullValues = nullToUndefined(initial.data);

  // const validatedData = crossSellProductsValidator.safeParse(dataWithoutNullValues);
  // console.log('validatedData', validatedData);

  // if (!validatedData.success) {
  //   console.error('Error validating cross sell products', validatedData.error);
  //   return null;
  // }
  // console.log('validatedData', validatedData);

  const pairsWellWithString = getPairsWellWithString(lang);

  return (
    <div className={cn(className)}>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className="relative flex flex-col gap-y-3 lg:gap-y-4"
      >
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">{pairsWellWithString}</h3>
          <div className="flex gap-x-1">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent className="-ml-4">
          {initial?.data?.map((item) => (
            <CarouselItem key={item.title} className="basis-[90%] bg-white pl-4">
              <CrossSellItem
                product={item}
                currencyCode={currencyCode}
                dictionary={dictionary}
                className="p-0 lg:p-0"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function getPairsWellWithString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Pairs well with';
    case 'no':
      return 'Passer godt sammen med';
    default:
      return 'Pairs well with';
  }
}
