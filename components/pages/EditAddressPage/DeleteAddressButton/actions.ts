import { UserError } from '@/app/api/shopify/types';
import { CACHE_TAGS } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';

type ShopifyResponse = {
  data: {
    customerAddressDelete: {
      deletedAddressId: string | null;
      userErrors: UserError[];
    };
  };
  variables: {
    addressId: string;
  };
};

const customerAddressDeleteMutation = /* GraphQL */ `
  mutation customerAddressDelete($addressId: ID!) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        field
        message
      }
    }
  }
`;

// Function to execute the mutation
export async function deleteAddress(addressId: string) {
  const formattedAddressId = `gid://shopify/CustomerAddress/${addressId}`;

  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerAddressDeleteMutation,
    variables: {
      addressId: formattedAddressId
    },
    cache: 'no-store',
    tags: [CACHE_TAGS.CUSTOMER_ADDRESS]
  });

  const errors = res.body.data.customerAddressDelete.userErrors;

  if (errors.length) {
    return {
      success: false,
      userErrors: errors
    };
  }

  return {
    success: true
  };
}
