'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/form/RadixSelect';
import { LANGS, Lang, LangValues, MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  currentMarket: MarketValues;
  currentLang: LangValues;
  className?: string;
}

export const MarketSelectorButton = ({ currentMarket, currentLang, className }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const splitPathname = pathname.split('/');

  const firstRouteSegment = splitPathname[1];
  const secondRouteSegment = splitPathname[2];
  const restOfPathname = splitPathname.slice(3).join('/');

  function handlePreviewLangChange(lang: LangValues) {
    const newUrl = `/${firstRouteSegment}/${lang}/${restOfPathname}`;
    router.push(newUrl);
  }

  // const selectedMarket = MARKETS.find((market) => market.id === currentMarket);
  // const selectedLang = LANGS.find((lang) => lang.id === currentLang);
  const selectedLang = LANGS.find((lang) => lang.id === secondRouteSegment);

  return (
    <div className={cn('something', className)}>
      <Select
        onValueChange={(e: LangValues) => {
          handlePreviewLangChange(e);
        }}
        // onValueChange={(e: MarketValues) => {
        //   handleSelectPreviewMarket(e);
        // }}
      >
        <SelectTrigger>
          {/* <SelectValue placeholder={`${selectedMarket?.name} ${selectedMarket?.flag}`} /> */}
          <SelectValue placeholder={`${selectedLang?.name} ${selectedLang?.flag}`} />
        </SelectTrigger>
        <SelectContent>
          {/* {MARKETS.map((market: Market) => (
            <SelectItem key={market.id} value={market.id}>
              {market.flag} {market.name}
            </SelectItem>
          ))} */}
          {LANGS.map((lang: Lang) => (
            <SelectItem key={lang.id} value={lang.id}>
              {lang.flag} {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
