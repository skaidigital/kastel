import { AnnouncementBannerLayout } from '@/components/global/AnnouncementBanner/Layout';
import {
  AnnouncementBannerPayload,
  announcementBannerValidator,
  getAnnouncementBannerQuery
} from '@/components/global/AnnouncementBanner/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

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

  const dataWithoutNullValues = nullToUndefined(initial.data);
  const validatedData = announcementBannerValidator.safeParse(dataWithoutNullValues);

  if (!validatedData.success) {
    return null;
  }

  return <AnnouncementBannerLayout data={validatedData.data} />;
}
