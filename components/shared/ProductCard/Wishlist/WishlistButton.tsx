'use client';

import { logIn } from '@/lib/shopify/customer/actions';
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
export function WishlistButton({
  children,
  itemIsInWislist,
  isLoggedIn,
  gid,
  className,
  disabled
}: Props) {
  const router = useRouter();
  const customerGid = 'gid://shopify/Customer/7742157848805';

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('clicked');

    if (!isLoggedIn) {
      await logIn();
      return;
    }

    if (itemIsInWislist) {
      // Remove from wishlist
      const response = await removeItemFromWishlist(customerGid, gid).then(() => router.refresh());
      return response;
    }

    const response = await addItemToWishlist(customerGid, gid).then(() => router.refresh());
    return response;
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn('z-10 rounded-full bg-white p-2', className)}
    >
      {children}
    </button>
  );
}
