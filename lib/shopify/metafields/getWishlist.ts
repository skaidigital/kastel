import { METAFIELDS } from '@/data/constants';
import { cookies } from 'next/headers';
import { shopifyFetch } from '..';

export async function getWishlist(): Promise<string[]> {
  const wishlistResponse = await getWishlistForUser();

  return JSON.parse(wishlistResponse?.value) || [];
}

export async function getWishlistForUser() {
  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('No access token');
  }

  const wishlistResponse = await shopifyFetch<CustomerMetadata>({
    query: getWishlistQuery,
    variables: {
      token: accessToken,
      key: METAFIELDS.customer.wishlist.key,
      namespace: METAFIELDS.customer.wishlist.namespace
    },
    cache: 'no-store'
  });

  return wishlistResponse.body.data?.customer?.metafield;
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
    token: string;
    key: string;
    namespace: string;
  };
};

const getWishlistQuery = /* GraphQL */ `
  query getWishlist($token: String!, $key: String!, $namespace: String!) {
    customer(customerAccessToken: $token) {
      metafield(key: $key, namespace: $namespace) {
        id
        key
        value
      }
    }
  }
`;
