'use client';

import { ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import Link from 'next/link';

export const WishlistButton = () => {
  const { market, lang } = useBaseParams();

  return (
    <Link
      href={`/${market}/${lang}${ROUTES.WISHLIST}`}
      aria-label="Go to wishlist"
      className="text-text-sm text-brand-dark-grey"
    >
      Wishlist
    </Link>
  );
};
