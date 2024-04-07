import { USPLayout } from '@/components/shared/USP/USPLayout';
import { USPPayload, getUSPQuery } from '@/components/shared/USP/hooks';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { loadQuery } from '@/lib/sanity/store';
// import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const USPPreview = dynamic(() => import('./USPPreview'));

async function loadUSP(market: MarketValues) {
  const query = getUSPQuery(market);

  return loadQuery<USPPayload>(query, {}, { next: { tags: [CACHE_TAGS.USPS] } });
}

export async function USP() {
  const market = await getMarket();
  const initial = await loadUSP(market);

  if (draftMode().isEnabled) {
    return <USPPreview initial={initial} market={market} />;
  }

  return <USPLayout data={initial.data} />;
}
