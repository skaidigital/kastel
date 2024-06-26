import { CACHE_TAGS } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { Address } from '@/lib/shopify/types';

type ShopifyResponse = {
  data: {
    customer: {
      addresses: {
        nodes: Address[];
      };
    };
  };
};

const customerAddressesQuery = /* GraphQL */ `
  {
    customer {
      addresses(first: 10) {
        nodes {
          id
          firstName
          lastName
          phoneNumber
          address1
          address2
          zip
          city
          territoryCode
          formatted
        }
      }
    }
  }
`;

export async function getAddresses(id: string) {
  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerAddressesQuery,
    cache: 'no-store',
    tags: [`${CACHE_TAGS.CUSTOMER_ADDRESS}:${id}`]
  });

  const addresses = res.body.data.customer.addresses.nodes;

  const activeAddress = addresses.find((address) => address.id === addAddressGid(id));

  return activeAddress;
}

function addAddressGid(id: string) {
  return `gid://shopify/CustomerAddress/${id}`;
}
