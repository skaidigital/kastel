import { getDictionary } from '@/app/dictionaries';
import { MarketLayout } from '@/components/global/MarketPopup/Layout';

export async function MarketPopup() {
  const { market_selector: dictionary } = await getDictionary();

  return <MarketLayout dictionary={dictionary} />;
}
