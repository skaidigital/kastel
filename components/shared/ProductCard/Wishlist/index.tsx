'use client';

import { WishlistButton } from '@/components/shared/ProductCard/Wishlist/WishlistButton';
import { useIsItemInWishlist } from '@/lib/shopify/metafields/isItemInWishlist';
import { useUser } from '@/lib/useUser';
import { cn } from '@/lib/utils';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/20/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

interface Props {
  gid: string;
  className?: string;
}

// TODO fix this in the account page
export function Wishlist({ gid, className }: Props) {
  const { isLoggedIn } = useUser();

  const { data: isInWishlist, isLoading } = useIsItemInWishlist({ gid, isLoggedIn });

  if (isLoading) {
    return <WishlistFallback className={className} />;
  }

  return (
    <WishlistButton
      gid={gid}
      isLoggedIn={isLoggedIn}
      itemIsInWislist={isInWishlist || false}
      className={cn('z-50 flex items-center justify-center rounded-full bg-white p-2', className)}
    >
      {isInWishlist ? (
        <HeartIconFilled className="size-4" />
      ) : (
        <HeartIconOutline className="size-4" />
      )}
    </WishlistButton>
  );
}

export function WishlistFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn('z-50 flex items-center justify-center rounded-full bg-white p-2', className)}
    >
      <HeartIconOutline className="size-4" />
    </div>
  );
}
