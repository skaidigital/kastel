'use server';

import { UserError } from '@/app/[market]/[lang]/(site)/shopify/types';
import { CACHE_TAGS } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { revalidateTag } from 'next/cache';

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
  const res = await customerAccountFetch<ShopifyResponse>({
    query: customerAddressDeleteMutation,
    variables: {
      addressId
    },
    cache: 'no-store',
    tags: [CACHE_TAGS.CUSTOMER_ADDRESS]
  });

  const errors = res.body.data.customerAddressDelete.userErrors;

  if (errors.length) {
    return errors;
  }

  revalidateTag(CACHE_TAGS.CUSTOMER_ADDRESS);

  return res.body.data.customerAddressDelete.deletedAddressId || null;
}
