import { LegalPage } from '@/components/pages/LegalPage';
import { LegalPagePayload, getLegalPageQuery } from '@/components/pages/LegalPage/hooks';
import { LangValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateStaticParams({ params: { lang } }: { params: { lang: LangValues } }) {
  const slugs = await generateStaticSlugs(lang, 'legalPage');

  return slugs;
}

function loadPage({ slug, lang }: { slug: string; lang: LangValues }) {
  const query = getLegalPageQuery({ lang });

  return loadQuery<LegalPagePayload | null>(
    query,
    { slug },
    { next: { tags: [`legalPage:${slug}`] } }
  );
}

interface Props {
  params: { slug: string; lang: LangValues };
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug, lang } = params;
  const initial = await loadPage({ slug, lang });

  const pageWithoutNullValues = nullToUndefined(initial.data);

  return <LegalPage data={pageWithoutNullValues} lang={lang} />;
}

export async function generateMetadata({
  params: { slug, lang }
}: {
  params: { slug: string; lang: LangValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    lang,
    slug,
    schemaType: 'legalPage'
  });

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
