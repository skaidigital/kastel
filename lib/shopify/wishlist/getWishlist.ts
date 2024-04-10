import { shopifyAdminQuery } from '../admin';
import { getWishlistQuery } from './wishlist';

export async function getWishlist() {
  const res = await shopifyAdminQuery(getWishlistQuery, {
    token: '7742157848805',
    key: 'wishlist',
    namespace: 'wishlist'
  });

  return res;
}
