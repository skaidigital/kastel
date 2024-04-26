'use server';

import {
  CustomerAddressUpdateResponse,
  UpdateAddressFormProps,
  customerAddressUpdateMutation,
  updateAddressFormValidator
} from '@/components/pages/EditAddressPage/hooks';
import { CACHE_TAGS } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { revalidateTag } from 'next/cache';

export async function updateAddress({
  data,
  addressId
}: {
  data: UpdateAddressFormProps;
  addressId: string;
}) {
  const result = updateAddressFormValidator.safeParse(data);

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

  const formattedAddressId = `gid://shopify/CustomerAddress/${addressId}`;

  const res = await customerAccountFetch<CustomerAddressUpdateResponse>({
    query: customerAddressUpdateMutation,
    variables: {
      addressId: formattedAddressId,
      address,
      defaultAddress: defaultAddress || false
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
    success: true
  };
}
