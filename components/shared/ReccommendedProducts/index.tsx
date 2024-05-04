import { getDictionary } from '@/app/dictionaries';
import { ReccommendedProductsLayout } from '@/components/shared/ReccommendedProducts/ReccommendedProductsLayout';
import {
  ReccommendedProductPayload,
  getReccommendedProductsQuery,
  reccommmendedProductsValidator
} from '@/components/shared/ReccommendedProducts/hooks';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
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
  const { reccommended_products: dictionary } = await getDictionary({ lang });

  const initial = await loadReccommendedProducts(lang, market);

  if (!initial.data) return null;

  const withoutNullValues = nullToUndefined(initial.data);

  const validatedProducts = reccommmendedProductsValidator.safeParse(withoutNullValues);

  if (!validatedProducts.success) {
    return null;
  }

  return <ReccommendedProductsLayout data={validatedProducts.data} dictionary={dictionary} />;
}
