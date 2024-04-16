import { PageLayout } from '@/components/pages/PageLayout';
import {
  PagePayload,
  getPageQuery,
  pageValidator,
  removeEmptyPageBuilderObjects
} from '@/components/pages/PageLayout/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

function loadHomePage({ market, lang }: { market: MarketValues; lang: LangValues }) {
  const query = getPageQuery({ market, lang });

  return loadQuery<PagePayload | null>(query, { slug: 'home' }, { next: { tags: ['home'] } });
}

export default async function HomePage({
  params: { market, lang }
}: {
  params: { market: MarketValues; lang: LangValues };
}) {
  const initial = await loadHomePage({ market, lang });

  const pageWithoutNullValues = nullToUndefined(initial.data);
  const cleanedPageData = removeEmptyPageBuilderObjects(pageWithoutNullValues);
  const validatedPage = pageValidator.safeParse(cleanedPageData);

  if (!validatedPage.success) {
    console.error('Failed to validate page', validatedPage.error);
    return notFound();
  }

  return <PageLayout data={validatedPage.data} market={market} />;
}

export async function generateMetadata({
  params: { market }
}: {
  params: { market: MarketValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({ market, slug: 'home', schemaType: 'page' });

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
