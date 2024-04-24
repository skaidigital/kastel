'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/form/RadixSelect';
// import { Select, SelectItem } from '@/components/form/Select';
import { MARKETS, MarketValues } from '@/data/constants';

interface Props {
  market: MarketValues;
  className?: string;
}

export function MarketSelector({ market, className }: Props) {
  const marketValues = MARKETS.find((m) => m.id === market);

  return (
    <Select>
      <SelectTrigger className="flex w-60 items-center justify-between rounded-[4px] bg-brand-primary-light px-5 py-4 font-medium text-brand-dark-grey placeholder:text-brand-dark-grey">
        <SelectValue placeholder={`${marketValues?.name}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'SV'} className="flex items-center gap-x-2 text-sm">
          Sweden
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
