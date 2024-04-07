import { getMarket } from '@/lib/getMarket';

export async function getCurrencyCode() {
  const market = await getMarket();

  switch (market) {
    case 'no':
      return 'NOK';
    case 'sv':
      return 'SEK';
    case 'dk':
      return 'DKK';
    case 'eu':
      return 'EUR';
    default:
      throw new Error(`Unknown market: ${market}`);
  }
}
