import { env } from '@/env';

export async function getRefreshToken() {
  const response = await fetch(`${env.BASE_URL}/api/shopify/refresh`);
  const status = response.status;
  if (status === 200) {
    return true;
  }
  return false;
}
