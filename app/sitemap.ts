import { LANG, ROUTES } from '@/data/constants';
import { env } from '@/env';
import { generateStaticSlugs } from '@/lib/sanity/loader/generateStaticSlugs';
import { MetadataRoute } from 'next/types';

interface SitemapFile {
  url: string;
  lastModified?: string;
  changeFrequency?: 'monthly' | 'always' | 'hourly' | 'daily' | 'weekly' | 'yearly' | 'never';
  priority?: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.BASE_URL;

  const [
    pageSlugsNo,
    pageSlugsEn,
    collectionSlugsNo,
    collectionSlugEn,
    productSlugsNo,
    productSlugsEn,
    legalPageSlugsNo,
    legalPageSlugsEn,
    blogPostSlugsNo,
    blogPostSlugsEn
  ] = await Promise.all([
    generateStaticSlugs(LANG.no.id, 'page'),
    generateStaticSlugs(LANG.en.id, 'page'),
    generateStaticSlugs(LANG.no.id, 'collection'),
    generateStaticSlugs(LANG.en.id, 'collection'),
    generateStaticSlugs(LANG.no.id, 'product'),
    generateStaticSlugs(LANG.en.id, 'product'),
    generateStaticSlugs(LANG.no.id, 'legalPage'),
    generateStaticSlugs(LANG.en.id, 'legalPage'),
    generateStaticSlugs(LANG.no.id, 'blogPost'),
    generateStaticSlugs(LANG.en.id, 'blogPost')
  ]);

  const pageSlugsNoWithoutHome = pageSlugsNo.filter((slug) => slug.slug !== 'home');
  const pageSlugsEnWithoutHome = pageSlugsEn.filter((slug) => slug.slug !== 'home');

  const formattedPageSlugsNo = pageSlugsNoWithoutHome.map((slug) => ({
    url: `${baseUrl}/no/no/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  const formattedPageSlugsEn = pageSlugsEnWithoutHome.map((slug) => ({
    url: `${baseUrl}/no/en/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const formattedCollectionSlugsNo = collectionSlugsNo.map((slug) => ({
    url: `${baseUrl}/no/no/collections/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  const formattedCollectionSlugsEn = collectionSlugEn.map((slug) => ({
    url: `${baseUrl}/no/en/collections/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const formattedProductSlugsNo = productSlugsNo.map((slug) => ({
    url: `${baseUrl}/no/no/products/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  const formattedProductSlugsEn = productSlugsEn.map((slug) => ({
    url: `${baseUrl}/no/en/products/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const formattedLegalPageSlugsNo = legalPageSlugsNo.map((slug) => ({
    url: `${baseUrl}/no/no/legal/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  const formattedLegalPageSlugsEn = legalPageSlugsEn.map((slug) => ({
    url: `${baseUrl}/no/en/legal/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const formattedBlogPostSlugsNo = blogPostSlugsNo.map((slug) => ({
    url: `${baseUrl}/no/no/blog/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  const formattedBlogPostSlugsEn = blogPostSlugsEn.map((slug) => ({
    url: `${baseUrl}/no/en/blog/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const HARD_CODED_ROUTES = [
    ROUTES.HOME,
    ROUTES.BLOG,
    ROUTES.KASTEL_CLUB,
    ROUTES.ABOUT,
    ROUTES.HELP_CENTER,
    ROUTES.STORE_LOCATOR
  ];

  const MARKETS = [{ id: 'no' }];

  // Map each hard-coded route to create variations for each market
  const hardCodedRoutesNo: SitemapFile[] = HARD_CODED_ROUTES.flatMap((route) => {
    return MARKETS.map((market) => ({
      url: `${baseUrl}/${market.id}/no${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: route === ROUTES.HOME ? 1 : 0.8 // Assuming higher priority for the homepage
    }));
  });
  const hardCodedRoutesEn: SitemapFile[] = HARD_CODED_ROUTES.flatMap((route) => {
    return MARKETS.map((market) => ({
      url: `${baseUrl}/${market.id}/en${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: route === ROUTES.HOME ? 1 : 0.8 // Assuming higher priority for the homepage
    }));
  });

  return [
    ...hardCodedRoutesNo,
    ...hardCodedRoutesEn,
    ...formattedPageSlugsNo,
    ...formattedPageSlugsEn,
    ...formattedCollectionSlugsNo,
    ...formattedCollectionSlugsEn,
    ...formattedProductSlugsNo,
    ...formattedProductSlugsEn,
    ...formattedLegalPageSlugsNo,
    ...formattedLegalPageSlugsEn,
    ...formattedBlogPostSlugsNo,
    ...formattedBlogPostSlugsEn
  ];
}
