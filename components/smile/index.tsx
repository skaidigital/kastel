import { COOKIE_NAMES } from '@/data/constants';
import { getExpiryTime } from '@/lib/getExpiryTime';
import { cookies } from 'next/headers';

import { getCustomerId } from './hooks';
import SmileInit from './SmileInitV2';

export async function Smile() {
  // production
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    return <SmileInit customerId={undefined} />;
  }

  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;
  const isExpired = await getExpiryTime();

  if (!accessToken || !isExpired) {
    return <SmileInit customerId={undefined} />;
  }

  const customerId = await getCustomerId();
  const idWithoutGid = customerId?.split('gid://shopify/Customer/')[1];

  if (!idWithoutGid) {
    return <SmileInit customerId={undefined} />;
  }

  return <SmileInit customerId={idWithoutGid} />;
}
