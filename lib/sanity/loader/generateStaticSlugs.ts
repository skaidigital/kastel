import 'server-only';

import { groq } from 'next-sanity';

import { env } from '@/env';
import { client } from '@/lib/sanity/client';

export function generateStaticSlugs(type: string) {
  const market = 'no';

  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token: env.SANITY_API_READ_TOKEN,
      perspective: 'published',
      useCdn: false,
      stega: false
    })
    .fetch<{ slug: string }[]>(
      groq`*[_type == $type && defined(slug_${market}.current)]{"slug": slug_${market}.current}`,
      { type }
    );
}

export function generateStaticSlugsProducts() {
  const market = 'no';

  // Not using loadQuery as it's optimized for fetching in the RSC lifecycle
  return client
    .withConfig({
      token: env.SANITY_API_READ_TOKEN,
      perspective: 'published',
      useCdn: false,
      stega: false
    })
    .fetch<{ slug: string }[]>(
      groq`*[_type == $type && defined(slug_${market}.current) && status_${market} == "ACTIVE"]{"slug": slug_${market}.current}`,
      { type: 'product' }
    );
}
