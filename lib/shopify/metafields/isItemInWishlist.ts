import { getWishlist } from './getWishlist';

export async function isItemInWishlist(itemGid: string) {
  const wishlistResponse = await getWishlist();

  return wishlistResponse.includes(itemGid);
}
