import { COOKIE_NAMES } from '@/data/constants';
import { getExpiryTime } from '@/lib/getExpiryTime';
import { handleRefreshToken } from '@/lib/getRefreshToken';
import { logIn } from '@/lib/shopify/customer/actions';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const expiredCoockie = await getExpiryTime();
  const refreshToken = cookies().get(COOKIE_NAMES.SHOPIFY.REFRESH_TOKEN)?.value;

  if (!expiredCoockie && refreshToken) {
    const updatedToken = await handleRefreshToken();
    if (!updatedToken) {
      await logIn();
    }
  }

  if (!expiredCoockie && !refreshToken) {
    await logIn();
  }
  return <div>{children}</div>;
}
