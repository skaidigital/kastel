'use client';

import { MARKETS } from '@/data/constants';
import { setPreviewMarket } from '@/lib/sanity/actions';

interface Props {
  currentMarket: string;
}

export const MarketSelectorButton = ({ currentMarket }: Props) => {
  function handleSelectPreviewMarket(market: string) {
    setPreviewMarket(market);
  }
  return (
    <div className="relative">
      <select
        onChange={(e) => handleSelectPreviewMarket(e.target.value)}
        value={currentMarket}
        className="block w-fit appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
      >
        {MARKETS.map((market) => (
          <option key={market.id} value={market.id}>
            {market.flag} {market.name}
          </option>
        ))}
      </select>
    </div>
  );
};

//   return <button onClick={() => handleSelectPreviewMarket('no')}>No</button>;
// };
