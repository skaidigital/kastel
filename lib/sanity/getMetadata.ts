import { MarketValues } from '@/data/constants';
import { loadQuery } from '@/lib/sanity/store';
import { imageValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

const metadataValidator = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  noFollow: z.boolean(),
  noIndex: z.boolean(),
  ogImage: imageValidator.optional()
});

export type MetadataPayload = z.infer<typeof metadataValidator>;

export function getMetadataQuery(market: MarketValues) {
  const query = groq`
    *[_type == $schemaType && slug_${market}.current == $slug][0].metadata_${market}{
      metaTitle,
      metaDescription,
      noFollow,
      noIndex,
      ogImage
    }`;

  return query;
}

export async function loadMetadata({
  market,
  slug,
  schemaType
}: {
  market: MarketValues;
  slug: string;
  schemaType: string;
}) {
  const metadataQuery = getMetadataQuery(market);

  const metadata = await loadQuery<MetadataPayload | null>(
    metadataQuery,
    { slug, schemaType },
    { next: { tags: [`${schemaType}:${slug}:${market}`] } }
  );

  return metadata.data;
}
