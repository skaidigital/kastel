import { WishlistButton } from '@/components/shared/ProductCard/Wishlist/WishlistButton';
import { isItemInWishlist } from '@/lib/shopify/metafields/isItemInWishlist';
import { useUser } from '@/lib/useUser';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/20/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

interface Props {
  gid: string;
}

export async function Wishlist({ gid }: Props) {
  const { isLoggedIn } = useUser();

  let isInWishlist = false;

  if (isLoggedIn) {
    isInWishlist = await isItemInWishlist(gid);
  }

  return (
    <WishlistButton
      gid={gid}
      isLoggedIn={isLoggedIn}
      itemIsInWislist={isInWishlist}
      className="z-50 flex items-center justify-center rounded-full bg-white p-2"
    >
      {isInWishlist ? (
        <HeartIconFilled className="size-4" />
      ) : (
        <HeartIconOutline className="size-4" />
      )}
    </WishlistButton>
  );
}

export function WishlistFallback() {
  return (
    <div className="z-50 flex items-center justify-center rounded-full bg-white p-2">
      <HeartIconOutline className="size-4" />
    </div>
  );
}
