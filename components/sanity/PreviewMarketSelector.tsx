import { cookies } from 'next/headers';
import { MarketSelectorButton } from './MarketSelectorButton';

export default function PreviewMarketSelector() {
  const previewMarket = cookies().get('previewMarket')?.value || 'no';

  return (
    <div className="fixed bottom-10 left-1/2 z-20 translate-x-[-50%] rounded-lg border border-gray-300 bg-white text-gray-600 shadow">
      <div className="flex items-center justify-between p-2">
        <p className='"flex-1 mr-4 whitespace-nowrap text-center'>Select market</p>
        <MarketSelectorButton currentMarket={previewMarket} />
      </div>
    </div>
  );
}
