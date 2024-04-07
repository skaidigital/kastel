import { InfoBannerLayout } from '@/components/global/InfoBanner/InfoBannerLayout';
import {
  InfoBannerPayload,
  getInfoBannerQuery,
  infoBannerValidator
} from '@/components/global/InfoBanner/hooks';
import { MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const InfoBannerPreview = dynamic(() => import('./InfoBannerPreview'));

function loadInfoBanner(market: MarketValues) {
  const query = getInfoBannerQuery(market);

  return loadQuery<InfoBannerPayload>(query, {}, { next: { tags: ['infoBanner', 'home'] } });
}

export async function InfoBanner() {
  const market = await getMarket();
  const initial = await loadInfoBanner(market);

  if (draftMode().isEnabled) {
    return <InfoBannerPreview initial={initial} market={market} />;
  }

  const dataWithoutNullValues = nullToUndefined(initial.data);
  const validatedData = infoBannerValidator.parse(dataWithoutNullValues);

  return <InfoBannerLayout data={validatedData} />;
}
