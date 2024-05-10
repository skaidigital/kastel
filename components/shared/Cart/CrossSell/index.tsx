'use server';

import { getDictionary } from '@/app/dictionaries';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { CarouselButtons } from '@/components/shared/Cart/CrossSell/CarouselButtons';
import { CrossSellProducts, getCrossSellQuery } from '@/components/shared/Cart/CrossSell/hooks';
import { CrossSellItem } from '@/components/shared/Cart/CrossSellItem';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { env } from '@/env';
import { loadQuery } from '@/lib/sanity/store';
import { cn } from '@/lib/utils';

async function loadCrossSellProducts({
  market,
  lang,
  gid
}: {
  market: MarketValues;
  lang: LangValues;
  gid?: string;
}) {
  const query = getCrossSellQuery({ market, lang });
  return loadQuery<CrossSellProducts>(
    query,
    { gid: gid || null },
    { next: { tags: [CACHE_TAGS.MERCHANDISING] } }
  );
}

interface Props {
  market: MarketValues;
  lang: LangValues;
  className?: string;
  crossSellItemClassName?: string;
  gid?: string;
}

export async function CrossSell({ market, lang, className, crossSellItemClassName, gid }: Props) {
  const currencyCode = env.NEXT_PUBLIC_SHOPIFY_CURRENCY;

  const dict = await getDictionary({ lang });
  const dictionary = dict.cart_drawer.cross_sell;
  const initial = await loadCrossSellProducts({ market, lang, gid });

  if (!initial.data) {
    return null;
  }

  const pairsWellWithString = getPairsWellWithString(lang);

  const hasOnlyOneItem = initial.data.length === 1;

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
          <CarouselButtons />
        </div>
        <CarouselContent className="-ml-4">
          {initial?.data?.map((item, index) => (
            <CarouselItem
              key={item.title + index}
              className={cn('pl-4', hasOnlyOneItem ? 'basis-full' : 'basis-[90%]')}
            >
              <CrossSellItem
                product={item}
                currencyCode={currencyCode}
                dictionary={dictionary}
                className={cn('bg-white', crossSellItemClassName)}
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
