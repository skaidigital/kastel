import { customerAccountFetch } from '@/lib/shopify/customer';
import { z } from 'zod';

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
    $addressId: ID!
    $addressInput: CustomerAddressInput!
    $defaultAddress: Boolean
  ) {
    customerAddressUpdate(
      addressId: $addressId
      address: $addressInput
      defaultAddress: $defaultAddress
    ) {
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

export const updateAddressFormInputValidator = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(2),
  address1: z.string().min(2),
  address2: z.string().optional(),
  zip: z.string().min(2),
  city: z.string().min(2),
  territoryCode: z.string().min(2),
  defaultAddress: z.boolean()
});

export type UpdateAddressFormInput = z.infer<typeof updateAddressFormInputValidator>;

// Function to execute the mutation
export async function updateAddress({
  addressId,
  addressInput,
  defaultAddress
}: {
  addressId: string;
  addressInput: {
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    firstName: string;
    lastName: string;
    phone: string;
    province: string;
    zip: string;
  };
  defaultAddress: boolean;
}) {
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
