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
  const customerGid = 'gid://shopify/Customer/7742157848805';

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (itemIsInWislist) {
      // Remove from wishlist
      const response = await removeItemFromWishlist(customerGid, gid).then(() => router.refresh());
      console.log('Response from removeItemFromWishlist:', response);

      return response;
    }

    const response = await addItemToWishlist(customerGid, gid).then(() => router.refresh());
    console.log('Response from addItemToWishlist:', response);

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
