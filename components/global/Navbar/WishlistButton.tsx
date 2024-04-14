import { ROUTES } from '@/data/constants';
import Link from 'next/link';

export const WishlistButton = () => {
  return (
    <Link
      href={ROUTES.WISHLIST}
      aria-label="Go to wishlist"
      className="text-text-sm text-brand-dark-grey"
    >
      Wishlist
    </Link>
  );
};
