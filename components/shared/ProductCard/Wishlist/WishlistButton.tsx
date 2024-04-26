'use client';

import {
  addItemToWishlist,
  removeItemFromWishlist
} from '@/lib/shopify/metafields/adjustItemInWishlist';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  itemIsInWislist: boolean;
  isLoggedIn: boolean;
  gid: string;
  className?: string;
  disabled?: boolean;
}

// TODO get the actual customerGid
// TODO fix graphql error when clicking the button
export function WishlistButton({ children, itemIsInWislist, isLoggedIn, gid, className }: Props) {
  const router = useRouter();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (itemIsInWislist) {
      // Remove from wishlist
      const response = await removeItemFromWishlist(gid).then(() => router.refresh());
      return response;
    }

    const response = await addItemToWishlist(gid).then(() => router.refresh());
    return response;
  }

  return (
    <button
      disabled={!isLoggedIn}
      onClick={(e) => handleClick(e)}
      className={cn('z-10 rounded-full bg-white p-2', className)}
      title={isLoggedIn ? 'Add to wishlist' : 'Log in to add to wishlist'}
    >
      {children}
    </button>
  );
}
