'use server';

import { getDictionary } from '@/app/dictionaries';
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '@/components/Carousel';
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
    <div className={cn('flex flex-col gap-y-3', className)}>
      <h3 className="text-sm font-medium">{pairsWellWithString}</h3>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className="relative"
      >
        <CarouselContent className="-ml-2">
          {initial?.data?.map((item) => (
            <CarouselItem key={item.title} className="basis-[80%] bg-white pl-2">
              <CrossSellItem product={item} currencyCode={currencyCode} dictionary={dictionary} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext
          size="icon"
          className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 items-center bg-white lg:block"
        />
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
