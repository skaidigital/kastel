import { useQuery } from '@tanstack/react-query';
import { getWishlist } from './getWishlist';

export async function isItemInWishlist(itemGid: string) {
  const wishlistResponse = await getWishlist();

  return wishlistResponse.includes(itemGid);
}

export function useIsItemInWishlist({ gid, isLoggedIn }: { gid: string; isLoggedIn: boolean }) {
  return useQuery({
    queryKey: ['isItemInWishlist', gid],
    queryFn: async () => {
      return isItemInWishlist(gid);
    },
    enabled: !!gid && !!isLoggedIn
  });
}
