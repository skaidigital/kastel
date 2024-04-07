import { PageNotFound } from '@/components/pages/PageNotFoundPage';
import {
  PageNotFoundPayload,
  getPageNotFoundQuery,
  pageNotFoundValidator
} from '@/components/pages/PageNotFoundPage/hooks';
import { CACHE_TAGS, MarketValues, SANITY_SINGLETON_DOCUMENT_IDS } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@sanity/react-loader';

function loadPageNotFoundPage(market: MarketValues) {
  const query = getPageNotFoundQuery(market);

  return loadQuery<PageNotFoundPayload | null>(
    query,
    { id: SANITY_SINGLETON_DOCUMENT_IDS.NOT_FOUND_PAGE },
    { next: { tags: [CACHE_TAGS.NOT_FOUND_PAGE] } }
  );
}

export default async function pageNotFound() {
  const market = await getMarket();
  const initial = await loadPageNotFoundPage(market);

  const dataWitoutNullValues = nullToUndefined(initial.data);
  const validatedData = pageNotFoundValidator.parse(dataWitoutNullValues);

  return <PageNotFound data={validatedData} />;
}
