import { getDictionary, reccommendedProductsValidator } from '@/app/dictionaries';
import { ReccommendedProductsLayout } from '@/components/shared/ReccommendedProducts/ReccommendedProductsLayout';
import {
  ReccommendedProductPayload,
  getReccommendedProductsQuery
} from '@/components/shared/ReccommendedProducts/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/store';

function loadReccommendedProducts(lang: LangValues) {
  const query = getReccommendedProductsQuery(lang);

  return loadQuery<ReccommendedProductPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.MERCHANDISING] } }
  );
}

interface Props {
  lang: LangValues;
}

export async function ReccommendedProducts({ lang }: Props) {
  const { reccommended_products: dictionary } = await getDictionary();

  reccommendedProductsValidator.parse(dictionary);

  const initial = await loadReccommendedProducts(lang);

  return <ReccommendedProductsLayout data={initial.data} dictionary={dictionary} />;
}
