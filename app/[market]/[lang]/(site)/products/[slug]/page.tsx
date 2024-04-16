import { getDictionary } from '@/app/dictionaries';
import { Product, getProductQuery } from '@/components/pages/ProductPage/hooks';
import { CACHE_TAGS, LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugsProducts } from '@/lib/sanity/loader/generateStaticSlugs';
import { loadQuery } from '@/lib/sanity/store';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { SearchParams } from '@/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await generateStaticSlugsProducts();

  return slugs;
}

function loadProduct({
  slug,
  market,
  lang
}: {
  slug: string;
  market: MarketValues;
  lang: LangValues;
}) {
  const query = getProductQuery({ market, lang });

  return loadQuery<Product | null>(
    query,
    { slug },
    { next: { tags: [`${CACHE_TAGS.PRODUCT}${slug}`] } }
  );
}

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues };
  searchParams?: SearchParams;
}

export default async function SlugProductPage({ params }: Props) {
  const slug = params.slug;
  const market = params.market;
  const lang = params.lang;

  const initial = await loadProduct({ slug, market, lang });
  const { product_page: dictionary } = await getDictionary();

  if (!initial.data) {
    notFound();
  }

  // const productWithoutNullValues = nullToUndefined(initial.data);

  // const validatedProduct = productValidator.parse(productWithoutNullValues);

  // return (
  //   <ProductPageLayout
  //     data={validatedProduct}
  //     dictionary={dictionary}
  //     searchParams={searchParams}
  //   />
  // );
  return <div>Product</div>;
}

export async function generateMetadata({
  params: { slug, market }
}: {
  params: { slug: string; market: MarketValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    market,
    slug,
    schemaType: 'product'
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
