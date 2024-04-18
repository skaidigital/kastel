import { cookies } from 'next/headers';
import { MarketSelectorButton } from './MarketSelectorButton';

export default function PreviewMarketSelector() {
  const previewMarket = cookies().get('previewMarket')?.value || 'no';

  return (
    <div className="fixed bottom-10 left-1/2 z-20 translate-x-[-50%] bg-white">
      <MarketSelectorButton currentMarket={previewMarket} className="relative w-32" />
    </div>
  );
}
