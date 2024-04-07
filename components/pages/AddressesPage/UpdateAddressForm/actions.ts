'use server';

import {
  CustomerAddressUpdateResponse,
  UpdateAddressFormProps,
  customerAddressUpdateMutation,
  updateAddressFormValidator
} from '@/components/pages/AddressesPage/UpdateAddressForm/hooks';
import { CACHE_TAGS } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { revalidateTag } from 'next/cache';

export async function updateAddress({
  formData,
  addressId
}: {
  formData: UpdateAddressFormProps;
  addressId: string;
}) {
  const result = updateAddressFormValidator.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }

  const { defaultAddress, ...rest } = result.data;

  const address = {
    ...rest,
    territoryCode: rest.territoryCode.toUpperCase()
  };

  const res = await customerAccountFetch<CustomerAddressUpdateResponse>({
    query: customerAddressUpdateMutation,
    variables: {
      addressId,
      address,
      defaultAddress
    },
    cache: 'no-store',
    tags: [CACHE_TAGS.CUSTOMER_ADDRESS]
  });

  if (res.body.data.customerAddressUpdate.userErrors?.length > 0) {
    return {
      success: false,
      userErrors: res.body.data.customerAddressUpdate.userErrors
    };
  }

  revalidateTag(CACHE_TAGS.CUSTOMER_ADDRESS);

  return {
    success: true,
    errors: {}
  };
}
