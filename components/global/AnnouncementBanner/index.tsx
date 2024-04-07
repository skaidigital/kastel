import { AnnouncementBannerLayout } from '@/components/global/AnnouncementBanner/Layout';
import {
  AnnouncementBannerPayload,
  announcementBannerValidator,
  getAnnouncementBannerQuery
} from '@/components/global/AnnouncementBanner/hooks';
import { CACHE_TAGS, MarketValues } from '@/data/constants';
import { getMarket } from '@/lib/getMarket';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const AnnouncementBannerPreview = dynamic(() => import('./Preview'));

function loadAnnouncementBanner(market: MarketValues) {
  const query = getAnnouncementBannerQuery(market);

  return loadQuery<AnnouncementBannerPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.ANNOUNCEMENT_BANNER, 'home'] } }
  );
}

export async function AnnouncementBanner() {
  const market = await getMarket();
  const initial = await loadAnnouncementBanner(market);

  if (draftMode().isEnabled) {
    return <AnnouncementBannerPreview initial={initial} market={market} />;
  }

  const dataWithoutNullValues = nullToUndefined(initial.data);
  const validatedData = announcementBannerValidator.parse(dataWithoutNullValues);

  return <AnnouncementBannerLayout data={validatedData} />;
}
