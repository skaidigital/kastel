import { customerAccountFetch } from '@/lib/shopify/customer';

type ShopifyResponse = {
  data: {
    customerAddressUpdate: {
      customerAddress: { id: string } | null;
    };
  };
  variables: {
    addressId: string;
    defaultAddress: boolean;
  };
};

const customerAddressUpdateMutation = /* GraphQL */ `
  mutation customerAddressUpdate(
    $addressId: ID!,
    $defaultAddress: Boolean
  ) {
    customerAddressUpdate($addressId: ID!, $defaultAddress: Boolean) {
      customerAddress {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Function to execute the mutation
export async function updateDefaultAddress(addressId: string) {
  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerAddressUpdateMutation,
    variables: {
      addressId,
      defaultAddress: true
    },
    cache: 'no-store'
  });

  return res.body.data.customerAddressUpdate.customerAddress?.id || null;
}
