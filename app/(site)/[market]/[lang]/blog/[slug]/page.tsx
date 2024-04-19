import { BlogPost } from '@/components/pages/BlogPost';
import { BlogPostPayload, getBlogPostQuery } from '@/components/pages/BlogPost/hooks';
import { LangValues } from '@/data/constants';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/store';

export async function generateStaticParams() {
  const slugs = await generateStaticSlugs('blogPost');

  return slugs;
}

function loadBlogPost({ slug, lang }: { slug: string; lang: LangValues }) {
  const query = getBlogPostQuery({ lang });

  return loadQuery<BlogPostPayload | null>(
    query,
    { slug },
    { next: { tags: [`blogPost:${slug}`] } }
  );
}

interface Props {
  params: { slug: string; lang: LangValues };
}

export default async function BlogPostSlugRoute({ params }: Props) {
  const { slug, lang } = params;
  console.log(slug, lang);

  const initial = await loadBlogPost({ slug, lang });
  console.log(initial.data, lang);

  const pageWithoutNullValues = nullToUndefined(initial.data);
  console.log(pageWithoutNullValues);

  return <BlogPost data={pageWithoutNullValues} lang={lang} />;
}

// export async function generateMetadata({
//   params: { slug, market }
// }: {
//   params: { slug: string; market: MarketValues };
// }): Promise<Metadata> {
//   const metadata = await loadMetadata({
//     market,
//     slug,
//     schemaType: 'page'
//   });

//   const title = metadata?.metaTitle;
//   const description = metadata?.metaDescription;
//   const shouldIndex = !metadata?.noIndex;
//   const shouldFollow = !metadata?.noFollow;
//   const ogImage = metadata?.ogImage;
//   const ogImageUrl = ogImage ? urlForOpenGraphImage(ogImage) : undefined;

//   return {
//     ...(title && { title }),
//     ...(description && { description }),
//     ...(ogImageUrl && {
//       openGraph: {
//         images: [ogImageUrl]
//       }
//     }),
//     robots: {
//       index: shouldIndex,
//       follow: shouldFollow,
//       googleBot: {
//         index: shouldIndex,
//         follow: shouldFollow
//       }
//     }
//   };
// }
