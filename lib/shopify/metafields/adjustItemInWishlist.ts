'use server';

import { METAFIELDS } from '@/data/constants';
import { shopifyAdminQuery } from '../admin';
import { getWishlist } from './getWishlist';
import { metafieldsSetMutation } from './query';

// TODO cache this shit
export async function addItemToWishlist(customerGid: string, itemGid: string) {
  const wishlist = await getWishlist();

  if (wishlist.includes(itemGid)) {
    return 'Item already in wishlist';
  }
  wishlist.push(itemGid);

  await adjustItemsInWishlistForUser({ customerGid, wishlist });

  return 'Item added to wishlist';
}

export async function removeItemFromWishlist(customerGid: string, itemGid: string) {
  const wishlist = await getWishlist();

  if (!wishlist.includes(itemGid)) {
    return 'Item not in wishlist';
  }

  const newWishlist = wishlist.filter((item) => item !== itemGid);

  await adjustItemsInWishlistForUser({ customerGid, wishlist: newWishlist });

  return 'Item removed from wishlist';
}

// Admin function, sets new wishlist
async function adjustItemsInWishlistForUser({
  customerGid,
  wishlist
}: {
  customerGid: string;
  wishlist: string[];
}) {
  const metafields = [
    {
      key: METAFIELDS.customer.wishlist.key,
      namespace: METAFIELDS.customer.wishlist.namespace,
      type: METAFIELDS.customer.wishlist.type,
      ownerId: customerGid,
      value: JSON.stringify(wishlist)
    }
  ];

  const addItemToWishlistResponse = await shopifyAdminQuery(metafieldsSetMutation, { metafields });

  return addItemToWishlistResponse;
}
