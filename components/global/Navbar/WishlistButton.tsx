import { CustomLink } from '@/components/CustomLink';
import { ROUTES } from '@/data/constants';

export const WishlistButton = () => {
  return (
    <CustomLink href={ROUTES.WISHLIST} aria-label="Go to wishlist" className="text-sm">
      Wishlist
    </CustomLink>
  );
};
