import { AnnouncementBannerLayout } from '@/components/global/AnnouncementBanner/Layout';
import {
  AnnouncementBannerPayload,
  announcementBannerValidator,
  getAnnouncementBannerQuery
} from '@/components/global/AnnouncementBanner/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { draftMode } from 'next/headers';

function loadAnnouncementBanner(lang: LangValues) {
  const query = getAnnouncementBannerQuery(lang);

  return loadQuery<AnnouncementBannerPayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.ANNOUNCEMENT_BANNER, 'home'] } }
  );
}

interface Props {
  lang: LangValues;
}

export async function AnnouncementBanner({ lang }: Props) {
  const initial = await loadAnnouncementBanner(lang);
  const isDraftMode = draftMode().isEnabled;

  const dataWithoutNullValues = nullToUndefined(initial.data);
  let validatedData;

  if (isDraftMode) {
    validatedData = announcementBannerValidator.safeParse(dataWithoutNullValues);
  }

  const footer = isDraftMode ? validatedData?.data : dataWithoutNullValues;

  return <AnnouncementBannerLayout data={footer} />;
}
