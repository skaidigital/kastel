import { WishlistPage } from '@/components/pages/WishlistPage';
import { LangValues, MarketValues } from '@/data/constants';
import { getWishlist } from '@/lib/shopify/metafields/getWishlist';
import { Metadata } from 'next';

interface Props {
  params: { lang: LangValues };
}

export default async function Page({ params: { lang } }: Props) {
  const wishlist = await getWishlist();

  console.log({ wishlist });

  return <WishlistPage lang={lang} />;
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
