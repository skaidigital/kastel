'use client';

import { useCustomerId } from '@/components/smile/useCustomerId';
import SmileInit from './SmileInitV2';

export function Smile() {
  const { data, isLoading } = useCustomerId();
  console.log('data', data);
  console.log('isLoading', isLoading);

  const customerId = data?.customerId;
  console.log('customerId', customerId);

  if (isLoading) {
    console.log('isLoading');

    return null;
  }

  const idWithoutGid = customerId?.split('gid://shopify/Customer/')[1];

  if (!idWithoutGid) {
    return <SmileInit customerId={undefined} />;
  }

  return <SmileInit customerId={idWithoutGid} />;
}
