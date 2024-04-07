import { z } from 'zod';

type Address = {
  territoryCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address1: string;
  zip: string;
  city: string;
  address2?: string | undefined;
};

export const updateAddressFormValidator = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(2),
  address1: z.string().min(2),
  address2: z.string().optional(),
  zip: z.string().min(2),
  city: z.string().min(2),
  territoryCode: z.string().min(2),
  defaultAddress: z
    .boolean()
    .optional()
    .transform((val) => {
      if (val === undefined) {
        return false;
      }
      return val;
    })
});

export type UpdateAddressFormProps = z.infer<typeof updateAddressFormValidator>;

export type CustomerAddressUpdateResponse = {
  data: {
    customerAddressUpdate: {
      customerAddress: { id: string } | null;
      userErrors: { field: string; message: string }[];
    };
  };
  variables: {
    addressId: string;
    address: Address;
    defaultAddress: boolean;
  };
};

export const customerAddressUpdateMutation = /* GraphQL */ `
  mutation customerAddressUpdate(
    $addressId: ID!
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
  ) {
    customerAddressUpdate(
      addressId: $addressId
      address: $address
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
