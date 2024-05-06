import { useQuery } from '@tanstack/react-query';
import { getWishlist } from './getWishlist';

export async function isItemInWishlist(itemGid: string) {
  const wishlistResponse = await getWishlist();

  return wishlistResponse.includes(itemGid);
}

export function useIsItemInWishlist(itemGid: string) {
  return useQuery({
    queryKey: ['isItemInWishlist', itemGid],
    queryFn: async () => {
      return isItemInWishlist(itemGid);
    },
    enabled: !!itemGid
  });
}
