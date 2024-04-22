import { HeartIcon as HeartIconFilled } from '@heroicons/react/20/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

interface Props {
  sku: string;
}

export async function Wishlist({}: Props) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const isInWishlist = true;
  return (
    <div className="z-50 flex items-center justify-center rounded-full bg-white p-2">
      {isInWishlist ? (
        <HeartIconFilled className="size-4" />
      ) : (
        <HeartIconOutline className="size-4" />
      )}
    </div>
  );
}

export function WishlistFallback() {
  return (
    <div className="z-50 flex items-center justify-center rounded-full bg-white p-2">
      <HeartIconOutline className="size-4" />
    </div>
  );
}
