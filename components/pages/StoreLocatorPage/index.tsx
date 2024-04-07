import { StoreLocatorLayout } from '@/components/pages/StoreLocatorPage/StoreLocatorLayout';
import {
  StoreLocatorPayload,
  getStoreLocatorQuery
} from '@/components/pages/StoreLocatorPage/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const StoreLocatorPreview = dynamic(() => import('./StoreLocatorPreview'));

async function loadStoreLocator(market: MarketValues) {
  const query = getStoreLocatorQuery(market);
  return loadQuery<StoreLocatorPayload>(query, {}, { next: { tags: ['storeLocator'] } });
}

export async function StoreLocator() {
  const market = await getMarket();

  const initial = await loadStoreLocator(market);

  if (draftMode().isEnabled) {
    return <StoreLocatorPreview initial={initial} market={market} />;
  }

  return <StoreLocatorLayout data={initial.data} />;
}
