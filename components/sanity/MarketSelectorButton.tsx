'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
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

  const selectedLang = LANGS.find((lang) => lang.id === secondRouteSegment);

  return (
    <div className={cn('', className)}>
      <Select
        onValueChange={(e: LangValues) => {
          handlePreviewLangChange(e);
        }}
      >
        <SelectTrigger>
          {/* <SelectValue placeholder={`${selectedMarket?.name} ${selectedMarket?.flag}`} /> */}
          <SelectValue placeholder={`${selectedLang?.name} ${selectedLang?.flag}`} />
        </SelectTrigger>
        <SelectContent>
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
