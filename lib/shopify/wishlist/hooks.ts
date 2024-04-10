import { getWishlistForUser } from '..';
import { shopifyAdminQuery } from '../admin';
import { deleteWishlistQuery } from './query';

export async function getWishlist() {
  const wishlistResponse = await getWishlistForUser();

  return JSON.parse(wishlistResponse?.value) || [];
}

export async function deleteWishlist() {
  const wishlistResponse = await getWishlistForUser();

  if (!wishlistResponse) {
    return 'No wishlist found';
  }
  console.log('wishlistResponse: ', wishlistResponse);

  await deleteWishlistForUser({ gid: wishlistResponse.id });

  return 'Delete the wishlist';
}

export async function isItemInWishlist(gid: string) {
  const wishlistResponse = await getWishlist();

  if (wishlistResponse.includes(gid)) {
    return true;
  }

  return false;
}

export async function addItemToWishlist(gid: string) {
  const wishlistResponse = await getWishlist();

  if (wishlistResponse.includes(gid)) {
    return 'Item already in wishlist';
  }

  wishlistResponse.push(gid);
  console.log('wishlistResponse: ', wishlistResponse);

  return 'Item added to wishlist';
}

async function deleteWishlistForUser({ gid }: { gid: string }) {
  const deleteWishlistResponse = await shopifyAdminQuery(deleteWishlistQuery, {
    id: gid
  });

  return deleteWishlistResponse;
}
