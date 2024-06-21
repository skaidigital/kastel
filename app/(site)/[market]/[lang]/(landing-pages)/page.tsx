import { DynamicPage } from '@/components/pages/DynamicPage';
import { PagePreview } from '@/components/pages/DynamicPage/Preview';
import {
  PagePayload,
  getPageQuery,
  removeEmptyPageBuilderObjects
} from '@/components/pages/DynamicPage/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';

export const dynamic = 'force-static';

// TODO dynamic import preview
function loadHomePage({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = getPageQuery({ market, lang });

  return loadQuery<PagePayload | null>(query, { slug: 'home' }, { next: { tags: ['page:home'] } });
}

interface Props {
  params: { market: MarketValues; lang: LangValues };
}

export default async function HomePage({ params: { market, lang } }: Props) {
  const initial = await loadHomePage({ market, lang });

  const pageWithoutNullValues = nullToUndefined(initial.data);
  const cleanedPageData = removeEmptyPageBuilderObjects(pageWithoutNullValues);

  // const validatedPage = pageValidator.safeParse(cleanedPageData);

  // if (!validatedPage.success) {
  //   console.error('Failed to validate page', validatedPage.error);
  //   return notFound();
  // }
  if (draftMode().isEnabled) {
    console.log('In draft mode');

    return <PagePreview initial={initial} market={market} lang={lang} />;
  }

  return <DynamicPage data={cleanedPageData} market={market} lang={lang} />;
}

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: LangValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({ lang, slug: 'home', schemaType: 'page' });

  const title = metadata?.metaTitle;
  const description = metadata?.metaDescription;
  const shouldIndex = !metadata?.noIndex;
  const shouldFollow = !metadata?.noFollow;
  const ogImage = metadata?.ogImage;
  const ogImageUrl = ogImage ? urlForOpenGraphImage(ogImage) : undefined;

  return {
    ...(title && { title }),
    ...(description && { description }),
    ...(ogImageUrl && {
      openGraph: {
        images: [ogImageUrl]
      }
    }),
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow
      }
    }
  };
}
