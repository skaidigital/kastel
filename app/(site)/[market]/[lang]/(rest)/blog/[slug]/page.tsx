import { BlogPost } from '@/components/pages/BlogPost';
import { BlogPostPreview } from '@/components/pages/BlogPost/Preview';
import { BlogPostPayload, getBlogPostQuery } from '@/components/pages/BlogPost/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
// import dynamic from 'next/dynamic';

// const DynamicBlostPostPreview = dynamic(() => import('@/components/pages/BlogPost/Preview').then((mod) => mod.BlogPostPreview))

export const dynamic = 'force-static';

export async function generateStaticParams({ params: { lang } }: { params: { lang: LangValues } }) {
  const slugs = await generateStaticSlugs(lang, 'blogPost');

  return slugs;
}

// TODO dynamically load blog post
function loadBlogPost({
  slug,
  lang,
  market
}: {
  slug: string;
  lang: LangValues;
  market: MarketValues;
}) {
  const query = getBlogPostQuery({ lang, market });

  return loadQuery<BlogPostPayload | null>(
    query,
    { slug },
    { next: { tags: [`blogPost:${slug}`] } }
  );
}

interface Props {
  params: { slug: string; lang: LangValues; market: MarketValues };
}

export default async function BlogPostSlugRoute({ params }: Props) {
  const { slug, market, lang } = params;
  const isInDraftMode = draftMode().isEnabled;

  const initial = await loadBlogPost({ slug, lang, market });

  if (!initial.data) {
    return notFound();
  }

  if (isInDraftMode) {
    return <BlogPostPreview post={initial.data} market={market} lang={lang} />;
  }

  const pageWithoutNullValues = nullToUndefined(initial.data);

  return <BlogPost data={pageWithoutNullValues} lang={lang} />;
}

export async function generateMetadata({
  params: { slug, lang }
}: {
  params: { slug: string; lang: LangValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    lang,
    slug,
    schemaType: 'blogPost'
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
