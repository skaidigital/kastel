import { getDictionary, reccommendedProductsValidator } from '@/app/dictionaries';
import { ReccommendedProductsLayout } from '@/components/shared/ReccommendedProducts/ReccommendedProductsLayout';
import {
  ReccommendedProductPayload,
  getReccommendedProductsQuery
} from '@/components/shared/ReccommendedProducts/hooks';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/store';

function loadReccommendedProducts(lang: LangValues, market: MarketValues) {
  const query = getReccommendedProductsQuery(lang, market);

  return loadQuery<ReccommendedProductPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.MERCHANDISING] } }
  );
}

interface Props {
  lang: LangValues;
  market: MarketValues;
}

export async function ReccommendedProducts({ lang, market }: Props) {
  const { reccommended_products: dictionary } = await getDictionary();

  reccommendedProductsValidator.parse(dictionary);

  const initial = await loadReccommendedProducts(lang, market);

  return <ReccommendedProductsLayout data={initial.data} dictionary={dictionary} />;
}
