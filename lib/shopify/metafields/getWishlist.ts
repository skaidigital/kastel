import { METAFIELDS } from '@/data/constants';
import { customerAccountFetch } from '../customer';

export async function getWishlist(): Promise<string[]> {
  const wishlistResponse = await getWishlistForUser();

  if (!wishlistResponse?.value) return [];

  return JSON.parse(wishlistResponse?.value) || [];
}

export async function getWishlistForUser() {
  const wishlistResponse = await customerAccountFetch<CustomerMetadata>({
    query: getWishlistQuery,
    variables: {
      key: METAFIELDS.customer.wishlist.key,
      namespace: METAFIELDS.customer.wishlist.namespace
    },
    cache: 'no-store'
  });

  return wishlistResponse.body?.data?.customer?.metafield;
}

type CustomerMetadata = {
  data: {
    customer: {
      metafield: {
        id: string;
        key: string;
        value: string;
      };
    };
  };
  variables: {
    key: string;
    namespace: string;
  };
};

const getWishlistQuery = /* GraphQL */ `
  query getWishlist($key: String!, $namespace: String!) {
    customer {
      metafield(key: $key, namespace: $namespace) {
        id
        key
        value
      }
    }
  }
`;
