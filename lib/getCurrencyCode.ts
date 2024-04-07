import { getMarket } from '@/lib/getMarket';

export async function getCurrencyCode() {
  const market = await getMarket();

  switch (market) {
    case 'no':
      return 'NOK';
    case 'eu':
      return 'EUR';
    default:
      throw new Error(`Unknown market: ${market}`);
  }
}
