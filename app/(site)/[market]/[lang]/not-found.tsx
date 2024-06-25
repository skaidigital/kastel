// import { PageNotFound } from '@/components/pages/PageNotFoundPage';
// import {
//   PageNotFoundPayload,
//   getPageNotFoundQuery,
//   pageNotFoundValidator
// } from '@/components/pages/PageNotFoundPage/hooks';
// import { CACHE_TAGS, LangValues, SANITY_SINGLETON_DOCUMENT_IDS } from '@/data/constants';
// import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
// import { loadQuery } from '@sanity/react-loader';

// function loadPageNotFoundPage(lang: LangValues) {
//   const query = getPageNotFoundQuery(lang);

//   return loadQuery<PageNotFoundPayload | null>(
//     query,
//     { id: SANITY_SINGLETON_DOCUMENT_IDS.NOT_FOUND_PAGE },
//     { next: { tags: [CACHE_TAGS.NOT_FOUND_PAGE] } }
//   );
// }

// interface Props {
//   params: { lang: LangValues };
// }

// export default async function pageNotFound({ params: { lang } }: Props) {
//   const initial = await loadPageNotFoundPage(lang);

//   const dataWitoutNullValues = nullToUndefined(initial.data);
//   const validatedData = pageNotFoundValidator.parse(dataWitoutNullValues);

//   return <PageNotFound data={validatedData} />;
// }
import { Button } from '@/components/Button'
import { CustomLink } from '@/components/CustomLink'
import { ROUTES } from '@/data/constants'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <h1 className="text-heading-xs font-medium uppercase tracking-widest text-brand-mid-grey">
        404
      </h1>
      <p className="mt-1 text-heading-sm font-bold uppercase">Page not found</p>
      <p className="mt-3 max-w-xs text-center text-heading-xs text-brand-mid-grey">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button asChild size="sm" className="mt-8">
        <CustomLink href={ROUTES.HOME}>Go to Homepage</CustomLink>
      </Button>
    </div>
  )
}
