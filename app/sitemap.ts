import { ROUTES } from '@/data/constants';
import { env } from '@/env';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { MetadataRoute } from 'next/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.BASE_URL;

  const [pageSlugs, collectionSlugs, productSlugs] = await Promise.all([
    generateStaticSlugs('page'),
    generateStaticSlugs('collection'),
    generateStaticSlugs('product')
  ]);

  const pageSlugsWithoutHome = pageSlugs.filter((slug) => slug.slug !== 'home');

  const formattedPageSlugs = pageSlugsWithoutHome.map((slug) => ({
    url: `${baseUrl}/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  const formattedCollectionSlugs = collectionSlugs.map((slug) => ({
    url: `${baseUrl}/collections/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  const formattedProductSlugs = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${baseUrl}${ROUTES.STORE_LOCATOR}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    ...formattedPageSlugs,
    ...formattedCollectionSlugs,
    ...formattedProductSlugs
  ];
}
