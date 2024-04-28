import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';
import SmileInit from './SmileInit';
import { getCustomerId } from './hooks';

// interface SmileProps {}

export async function SmileLayout() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return <SmileInit customerId={undefined} />;
  }

  const customerId = await getCustomerId();
  const idWithoutGid = customerId?.split('gid://shopify/Customer/')[1];
  return <SmileInit customerId={idWithoutGid} />;
}
