import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';
import SmileInit from './SmileInit';
import { getCustomerId } from './hooks';

// interface SmileProps {}

export async function SmileLayout() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;
  console.log('accessToken', accessToken);

  if (!accessToken) {
    console.log('Init Smile without customer ID');

    return <SmileInit customerId={undefined} />;
  }

  const customerId = await getCustomerId();
  console.log('customerId', customerId);

  const idWithoutGid = customerId?.split('gid://shopify/Customer/')[1];
  console.log('idWithoutGid', idWithoutGid);

  return <SmileInit customerId={idWithoutGid} />;
}
