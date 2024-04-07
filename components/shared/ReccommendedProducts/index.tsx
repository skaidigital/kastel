import { getDictionary, reccommendedProductsValidator } from '@/app/dictionaries';
import { ReccommendedProductsLayout } from '@/components/shared/ReccommendedProducts/ReccommendedProductsLayout';
import {
  ReccommendedProductPayload,
  getReccommendedProductsQuery
} from '@/components/shared/ReccommendedProducts/hooks';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const ReccommendedProductsPreview = dynamic(() => import('./ReccommendedProductsPreview'));

function loadReccommendedProducts(market: MarketValues) {
  const query = getReccommendedProductsQuery(market);

  return loadQuery<ReccommendedProductPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.MERCHANDISING] } }
  );
}

export async function ReccommendedProducts() {
  const { reccommended_products: dictionary } = await getDictionary();
  const market = await getMarket();

  reccommendedProductsValidator.parse(dictionary);

  const initial = await loadReccommendedProducts(market);

  if (draftMode().isEnabled) {
    return (
      <ReccommendedProductsPreview initial={initial} dictionary={dictionary} market={market} />
    );
  }

  return <ReccommendedProductsLayout data={initial.data} dictionary={dictionary} />;
}
