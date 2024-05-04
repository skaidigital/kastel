import 'server-only';

import { groq } from 'next-sanity';

import { LangValues, MarketValues } from '@/data/constants';
import { env } from '@/env';
import { client } from '@/lib/sanity/client';

export function generateStaticSlugs(lang: LangValues, type: string) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token: env.SANITY_API_READ_TOKEN,
      perspective: 'published',
      useCdn: false,
      stega: false
    })
    .fetch<{ slug: string }[]>(
      groq`*[_type == $type && defined(slug_${lang}.current) && metadata.noIndex != true]{"slug": slug_${lang}.current}`,
      { type }
    );
}

export async function generateStaticSlugsProducts(lang: LangValues, market: MarketValues) {
  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token: env.SANITY_API_READ_TOKEN,
      perspective: 'published',
      useCdn: false,
      stega: false
    })
    .fetch<{ slug: string }[]>(
      groq`*[_type == $type && defined(slug_${lang}.current) && status_${market} == "ACTIVE"]{"slug": slug_${lang}.current}`,
      { type: 'product' }
    );
}
