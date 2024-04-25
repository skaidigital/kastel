'use client';

import { CustomLink } from '@/components/CustomLink';
import { LangValues, ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';

export function WishlistButton() {
  const { lang } = useBaseParams();
  const wishlistString = getWishlistString(lang);

  return (
    <CustomLink href={ROUTES.WISHLIST} className="text-sm font-medium text-brand-mid-grey">
      {wishlistString}
    </CustomLink>
  );
}

function getWishlistString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Wishlist';
    case 'no':
      return 'Ønskeliste';
    default:
      return 'Wishlist';
  }
}
