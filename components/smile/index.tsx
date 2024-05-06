'use client';

import { useCustomerId } from '@/components/smile/useCustomerId';
import SmileInit from './SmileInitV2';

export function Smile() {
  const { data, isLoading } = useCustomerId();
  const customerId = data?.customerId;

  if (isLoading) {
    return null;
  }

  const idWithoutGid = customerId?.split('gid://shopify/Customer/')[1];

  if (!idWithoutGid) {
    return <SmileInit customerId={undefined} />;
  }

  return <SmileInit customerId={idWithoutGid} />;
}
