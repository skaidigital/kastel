'use client';

import { logIn } from '@/lib/shopify/customer/actions';
import {
  addItemToWishlist,
  removeItemFromWishlist
} from '@/lib/shopify/metafields/adjustItemInWishlist';

interface Props {
  children: React.ReactNode;
  itemIsInWislist: boolean;
  isLoggedIn: boolean;
  gid: string;
  className?: string;
}

// TODO get the actual customerGid
// TODO fix graphql error when clicking the button
export function WishlistButton({ children, itemIsInWislist, isLoggedIn, gid, className }: Props) {
  const customerGid = 'gid://shopify/Customer/7742157848805';

  async function handleClick() {
    console.log('Clicked');

    if (!isLoggedIn) {
      console.log('Not logged in');

      await logIn();
      return;
    }

    if (itemIsInWislist) {
      console.log('Item is in wishlist');

      // Remove from wishlist
      const response = await removeItemFromWishlist(customerGid, gid);
      console.log(response);
      return response;
    }
    console.log('Item is not in wishlist');

    const response = await addItemToWishlist(customerGid, gid);
    console.log(response);
    return response;
  }

  return <button onClick={handleClick}>{children}</button>;
}
