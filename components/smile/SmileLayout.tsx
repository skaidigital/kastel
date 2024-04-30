import { COOKIE_NAMES } from '@/data/constants';
import { getExpiryTime } from '@/lib/getExpiryTime';
import { cookies } from 'next/headers';

import { getCustomerId } from './hooks';
import SmileInit from './SmileInitV2';

export async function SmileLayout() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;
  const isExpired = await getExpiryTime();

  console.log(accessToken, isExpired);

  if (!accessToken || !isExpired) {
    return <SmileInit customerId={undefined} />;
  }

  const customerId = await getCustomerId();
  console.log('customerId', customerId);

  const idWithoutGid = customerId?.split('gid://shopify/Customer/')[1];

  return <SmileInit customerId={idWithoutGid} />;
}
