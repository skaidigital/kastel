import { LangValues, MarketValues } from '@/data/constants';
import { getProductCard } from '@/lib/sanity/fragments';
import { loadQuery } from '@/lib/sanity/store';
import { productCardValidator } from '@/lib/sanity/validators';
import { groq } from 'next-sanity';
import { z } from 'zod';

export const wishlistProductsValidator = z.array(productCardValidator);

export type WishlistProductsProps = z.infer<typeof wishlistProductsValidator>;

function getWishlistProductsQuery({ lang, market }: { lang: LangValues; market: MarketValues }) {
  return groq`
    *[_type == "product" && defined(slug_${market}.current) && status_${market} == "ACTIVE" && gid_${market} in $productGids]{
        ${getProductCard(lang, market)}
    }
    `;
}

interface WishlistProductsQueryProps {
  market: MarketValues;
  lang: LangValues;
  productGids: string[];
}

export async function loadWishlistProducts({
  market,
  lang,
  productGids
}: WishlistProductsQueryProps) {
  const defaultMetadataQuery = getWishlistProductsQuery({ market, lang });

  const defaultMetadata = await loadQuery<WishlistProductsProps | null>(
    defaultMetadataQuery,
    { productGids }
    //   { next: { tags: [CACHE_TAGS.METADATA] } }
  );

  if (!defaultMetadata.data) {
    return [];
  }

  return defaultMetadata.data;
}
