import { getDictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { CollectionPage } from '@/components/pages/CollectionPage';
import { Breadcrumbs } from '@/components/pages/CollectionPage/Breadcrumbs';
import { CollectionSettingsBarDesktop } from '@/components/pages/CollectionPage/CollectionSettingsBarDesktop';
import { loadCollectionProductDataV2 } from '@/components/pages/CollectionPage/actions';
import { ActiveFilters } from '@/components/pages/CollectionPage/filter/ActiveFilters';
import {
  CollectionBasePayload,
  collectionBaseValidator,
  getCollectionBaseQuery
} from '@/components/pages/CollectionPage/hooks';
import { PageBuilder } from '@/components/shared/PageBuilder';
import { LangValues, MarketValues } from '@/data/constants';
import { loadMetadata } from '@/lib/sanity/getMetadata';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { nullToUndefined } from '@/lib/sanity/nullToUndefined';
import { loadQuery } from '@/lib/sanity/storeServer';
import { urlForOpenGraphImage } from '@/lib/sanity/urlForOpenGraphImage';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-static';

export async function generateStaticParams({ params: { lang } }: { params: { lang: LangValues } }) {
  const slugs = await generateStaticSlugs(lang, 'collection');

  return slugs;
}

interface SanityQueryProps<T> {
  data: T;
}

function loadCollectionBase({
  slug,
  market,
  lang
}: {
  slug: string;
  market: MarketValues;
  lang: LangValues;
}) {
  const query = getCollectionBaseQuery({ market, lang });

  return loadQuery<SanityQueryProps<CollectionBasePayload | null>>(
    query,
    { slug },
    { next: { tags: [`collection:${slug}`] } }
  );
}

interface Props {
  params: { slug: string; market: MarketValues; lang: LangValues };
}

export default async function SlugCollectionPage({ params }: Props) {
  const { market, lang, slug } = params;
  const paramValues = null;
  const sortKey = undefined;
  const queryClient = new QueryClient();
  const searchParams = undefined;

  const initialBase = await loadCollectionBase({ slug, market, lang });

  if (!initialBase) {
    console.error('No collection found');
    notFound();
  }

  const collectionBaseWithoutNullValues = nullToUndefined(initialBase.data);
  const validatedBase = collectionBaseValidator.safeParse(collectionBaseWithoutNullValues);

  if (!validatedBase.success) {
    console.error(validatedBase.error);
    notFound();
  }

  const { collection_page } = await getDictionary({ lang });

  await queryClient.prefetchQuery({
    queryKey: ['collectionProducts', slug, lang],
    queryFn: () =>
      loadCollectionProductDataV2({ lang, market, slug, currentPage: 1, sortKey, paramValues })
  });

  const { title, descriptionShort, pageBuilder, descriptionLong, id, moods } = validatedBase.data;

  const productCount = 0;

  return (
    <>
      <Section
        size="sm"
        label="collection-hero"
        srHeading="Collection hero"
        hasBottomBorder={false}
        className="pb-8 pt-10 lg:pt-10"
      >
        <Container className="mb-2 lg:mb-4">
          <Breadcrumbs collectionName={title} lang={lang} />
        </Container>
        <Container className="flex flex-col justify-between gap-y-3 lg:flex-row lg:gap-y-0">
          {title && (
            <Heading as="h1" size="xl" className="max-w-lg font-bold">
              {title}
            </Heading>
          )}
          {descriptionShort && (
            <Text as="p" className="h-fit max-w-sm text-brand-mid-grey">
              {descriptionShort}
            </Text>
          )}
          <ActiveFilters className="mt-3 lg:hidden" />
        </Container>
      </Section>
      <CollectionSettingsBarDesktop
        numberOfProducts={productCount}
        dictionary={collection_page}
        market={market}
        lang={lang}
        className="hidden min-h-32 lg:block"
      />
      <Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CollectionPage
            moods={moods}
            slug={slug}
            market={market}
            lang={lang}
            dictionary={collection_page}
          />
        </HydrationBoundary>
      </Suspense>
      <Section label="description-long-products" srHeading="Description">
        <Container className="grid gap-2 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-2">
            <h2 className="mb-4 text-overline-md font-medium uppercase text-brand-mid-grey">
              {collection_page.description}:
            </h2>
            {descriptionLong && (
              <p
                className="text-md lg:text-lg"
                dangerouslySetInnerHTML={{ __html: descriptionLong.replace(/\n/g, '<br />') }}
              />
            )}
          </div>
        </Container>
      </Section>
      {pageBuilder?.map((block, index: number) => (
        <PageBuilder
          key={block.key}
          data={block}
          index={index}
          market={market}
          lang={lang}
          pageId={id}
          pageType={'collection'}
        />
      ))}
    </>
  );
}

export async function generateMetadata({
  params: { slug, lang }
}: {
  params: { slug: string; lang: LangValues };
}): Promise<Metadata> {
  const metadata = await loadMetadata({
    lang,
    slug,
    schemaType: 'collection'
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
