import { shopifyAdminQuery } from '../admin';
import { getWishlistForUser } from './getWishlist';

export async function deleteWishlist() {
  const wishlistResponse = await getWishlistForUser();

  if (!wishlistResponse) {
    return 'No wishlist found';
  }

  await deleteWishlistForUser({ gid: wishlistResponse.id });

  return 'Delete the wishlist';
}

// Admin function, removes wishlist
async function deleteWishlistForUser({ gid }: { gid: string }) {
  const deleteWishlistResponse = await shopifyAdminQuery(deleteWishlistQuery, {
    id: gid
  });

  return deleteWishlistResponse;
}

export const deleteWishlistQuery = /* GraphQL */ `
  mutation metafieldDelete($id: ID!) {
    metafieldDelete(input: { id: $id }) {
      deletedId
      userErrors {
        field
        message
      }
    }
  }
`;
