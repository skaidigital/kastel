'use server';

import { getConfiguratorPricesQuery } from '@/components/pages/ConfiguratorPage/hooks';
import { MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/store';

interface Props {
  params?: { [key: string]: string | string[] | undefined };
}

function loadConfiguratorPrices(ids: string[], market: MarketValues) {
  const query = getConfiguratorPricesQuery(market);

  return loadQuery<any>(
    query,
    { ids },
    { next: { tags: [`configuratorPrices:${ids.join(',')}`] } }
  );
}

// function loadConfiguratorEsimatePrices(skus: string[], market: MarketValues) {
//     const query = getConfiguratorPricesQuery(market);

//     return loadQuery<any>(
//       query,
//       { ids },
//       { next: { tags: [`configuratorPrices:${ids.join(',')}`] } }
//     );
//   }

export async function ConfiguratorPrices({ params }: Props) {
  const variants = Array.isArray(params?.variants)
    ? params.variants
    : params?.variants
      ? [params.variants]
      : [];

  //todo add estimate prices based on range
  if (variants.length < 3) {
    // const initial = await loadConfiguratorEsimatePrices('no');
    // return <span className="text-[14px] text-brand-dark-grey">3500 NOK</span>;
    return null;
  }

  const initial = await loadConfiguratorPrices(variants, 'no');

  const total = initial.data.reduce((sum: any, item: any) => {
    return sum + (item.discountedPrice || item.price);
  }, 0);

  const currency = initial.data[0].currency;

  return (
    <span className="text-[14px] text-brand-dark-grey">
      {total} {currency}
    </span>
  );
}
