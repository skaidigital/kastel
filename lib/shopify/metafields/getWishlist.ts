import { COOKIE_NAMES, METAFIELDS } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { cookies } from 'next/headers';

export async function getWishlist(): Promise<string[]> {
  const wishlistResponse = await getWishlistForUser();

  return JSON.parse(wishlistResponse?.value) || [];
}

export async function getWishlistForUser() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    throw new Error('No access token');
  }

  // const wishlistResponse = await shopifyFetch<CustomerMetadata>({
  const wishlistResponse = await customerAccountFetch<CustomerMetadata>({
    query: getWishlistQuery,
    variables: {
      token: accessToken,
      key: METAFIELDS.customer.wishlist.key,
      namespace: METAFIELDS.customer.wishlist.namespace
    },
    cache: 'no-store'
  });

  console.log(wishlistResponse);

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
