import { PageNotFound } from '@/components/pages/PageNotFoundPage';
import {
  PageNotFoundPayload,
  getPageNotFoundQuery,
  pageNotFoundValidator
} from '@/components/pages/PageNotFoundPage/hooks';
import { CACHE_TAGS, LangValues, SANITY_SINGLETON_DOCUMENT_IDS } from '@/data/constants';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@sanity/react-loader';

function loadPageNotFoundPage(lang: LangValues) {
  const query = getPageNotFoundQuery(lang);

  return loadQuery<PageNotFoundPayload | null>(
    query,
    { id: SANITY_SINGLETON_DOCUMENT_IDS.NOT_FOUND_PAGE },
    { next: { tags: [CACHE_TAGS.NOT_FOUND_PAGE] } }
  );
}

interface Props {
  params: { lang: LangValues };
}

export default async function pageNotFound({ params: { lang } }: Props) {
  const initial = await loadPageNotFoundPage(lang);

  const dataWitoutNullValues = nullToUndefined(initial.data);
  const validatedData = pageNotFoundValidator.parse(dataWitoutNullValues);

  return <PageNotFound data={validatedData} />;
}
