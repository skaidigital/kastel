'use client';

import { Select, SelectItem } from '@/components/form/Select';
import { EUFlagIcon } from '@/components/icons/EUFlagIcon';
import { NorwegianFlagIcon } from '@/components/icons/NorwegianFlagIcon';
import { MarketValues, SITE_URLS } from '@/data/constants';

interface Props {
  market: MarketValues;
  className?: string;
}

export function MarketSelector({ market, className }: Props) {
  return (
    <Select
      aria-label="Select market"
      className={className}
      defaultSelectedKey={market}
      disabledKeys={market}
    >
      <SelectItem id="no" href={SITE_URLS.no}>
        <NorwegianFlagIcon className="w-5 rounded-full" />
        NO
      </SelectItem>
      <SelectItem id="eu" href={SITE_URLS.eu}>
        <EUFlagIcon className="w-5 rounded-full" />
        EU
      </SelectItem>
    </Select>
  );
}
