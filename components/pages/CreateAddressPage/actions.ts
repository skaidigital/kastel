'use server';

import {
  CustomerAddressCreateResponse,
  createAddressFormInputValidator,
  customerAddressCreateMutation
} from '@/components/pages/CreateAddressPage/hooks';
import { CACHE_TAGS, ROUTES } from '@/data/constants';
import { customerAccountFetch } from '@/lib/shopify/customer';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createAddress(prevState: any, formData: FormData) {
  const result = createAddressFormInputValidator.safeParse(Object.fromEntries(formData));

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

  const res = await customerAccountFetch<CustomerAddressCreateResponse>({
    query: customerAddressCreateMutation,
    variables: {
      address,
      defaultAddress
    },
    cache: 'no-store',
    tags: [CACHE_TAGS.CUSTOMER_ADDRESS]
  });

  if (res.body.data.customerAddressCreate.userErrors.length > 0) {
    return {
      success: false,
      userErrors: res.body.data.customerAddressCreate.userErrors
    };
  }

  revalidateTag(CACHE_TAGS.CUSTOMER_ADDRESS);
  redirect(ROUTES.ADDRESSES);
}
