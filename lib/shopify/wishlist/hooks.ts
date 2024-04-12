import { METAFIELDS } from '@/data/constants';
import { getWishlistForUser } from '..';
import { shopifyAdminQuery } from '../admin';
import { deleteWishlistQuery, metafieldsSetMutation } from './query';

// Get wishlist for user, returns array of product GIDs or empty array
export async function getWishlist(): Promise<string[]> {
  const wishlistResponse = await getWishlistForUser();

  return JSON.parse(wishlistResponse?.value) || [];
}

export async function deleteWishlist() {
  const wishlistResponse = await getWishlistForUser();

  if (!wishlistResponse) {
    return 'No wishlist found';
  }

  await deleteWishlistForUser({ gid: wishlistResponse.id });

  return 'Delete the wishlist';
}

// Check if item is in wishlist, returns boolean
export async function isItemInWishlist(itemGid: string) {
  const wishlistResponse = await getWishlist();

  return wishlistResponse.includes(itemGid);
}

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

// Admin function, removes wishlist
async function deleteWishlistForUser({ gid }: { gid: string }) {
  const deleteWishlistResponse = await shopifyAdminQuery(deleteWishlistQuery, {
    id: gid
  });

  return deleteWishlistResponse;
}
