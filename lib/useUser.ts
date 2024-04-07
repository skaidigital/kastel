import { COOKIE_NAMES } from '@/data/constants';
import { cookies } from 'next/headers';

export function useUser() {
  const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

  const isLoggedIn = accessToken ? true : false;

  return { isLoggedIn };
}
