import { WishlistPage } from '@/components/pages/WishlistPage';
import { loadWishlistProducts } from '@/components/pages/WishlistPage/hooks';
import { LangValues, MarketValues } from '@/data/constants';
import { getWishlist } from '@/lib/shopify/metafields/getWishlist';
import { Metadata } from 'next';

interface Props {
  params: { market: MarketValues; lang: LangValues };
}

export default async function Page({ params: { market, lang } }: Props) {
  const wishlistProductGids = await getWishlist();

  const wishlistProducts = await loadWishlistProducts({
    market,
    lang,
    productGids: wishlistProductGids
  });

  const hasAnyProducts = wishlistProducts.length > 0;
  const products = hasAnyProducts ? wishlistProducts : undefined;

  return <WishlistPage lang={lang} products={products} />;
}

export const metadata: Metadata = {
  title: getTitle()
};

function getTitle() {
  const market = 'no' as MarketValues;

  switch (market) {
    case 'no':
      return 'Ønskeliste';
    case 'sv':
      return 'Önskelista';
  }
}
