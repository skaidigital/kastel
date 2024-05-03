import { KastelClubPage } from '@/components/pages/KastelClubPage';
import {
  KastelClubPagePayload,
  getKastelClubPageQuery
} from '@/components/pages/KastelClubPage/hooks';
import { CACHE_TAGS, LangValues } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

async function loadKastelClubPage(lang: LangValues) {
  const query = getKastelClubPageQuery(lang);

  return loadQuery<KastelClubPagePayload>(
    query,
    {},
    { next: { tags: [CACHE_TAGS.KASTEL_CLUB_PAGE] } }
  );
}

interface Props {
  params: { lang: LangValues };
}

export default async function Page({ params: { lang } }: Props) {
  const initial = await loadKastelClubPage(lang);

  if (!initial.data) return null;

  // const isDraftMode = draftMode().isEnabled;

  const withoutNullValues = nullToUndefined(initial.data);
  // let validatedData;

  // if (!isDraftMode) {
  //   validatedData = helpCenterPageValidator.safeParse(withoutNullValues);
  // }

  // const page = isDraftMode ? withoutNullValues : validatedData?.data;

  // if (!page) {
  //   return null;
  // }

  return <KastelClubPage data={withoutNullValues} />;
}
