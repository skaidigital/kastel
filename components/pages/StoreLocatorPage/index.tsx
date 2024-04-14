import { StoreLocatorLayout } from '@/components/pages/StoreLocatorPage/StoreLocatorLayout';
import {
  StoreLocatorPayload,
  getStoreLocatorQuery
} from '@/components/pages/StoreLocatorPage/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';

async function loadStoreLocator(market: MarketValues) {
  const query = getStoreLocatorQuery(market);
  return loadQuery<StoreLocatorPayload>(query, {}, { next: { tags: ['storeLocator'] } });
}

export async function StoreLocator() {
  const market = await getMarket();

  const initial = await loadStoreLocator(market);

  return <StoreLocatorLayout data={initial.data} />;
}
