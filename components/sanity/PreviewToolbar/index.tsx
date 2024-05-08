import { ExitDraftModeButton } from '@/components/sanity/PreviewToolbar/ExitDraftModeButton';
import {
  COOKIE_NAMES,
  FALLBACK_LANG,
  FALLBACK_MARKET,
  LangValues,
  MarketValues
} from '@/data/constants';
import { cookies } from 'next/headers';
import { MarketSelectorButton } from '../MarketSelectorButton';

export default function PreviewToolbar() {
  const previewMarket =
    (cookies().get(COOKIE_NAMES.PREVIEW_MARKET)?.value as MarketValues) || FALLBACK_MARKET;
  const previewLang =
    (cookies().get(COOKIE_NAMES.PREVIEW_LANG)?.value as LangValues) || FALLBACK_LANG;

  return (
    <div className="fixed bottom-10 left-1/2 z-20 translate-x-[-50%] bg-white">
      <div className="flex gap-x-2">
        <MarketSelectorButton
          currentMarket={previewMarket}
          currentLang={previewLang}
          className="relative w-32"
        />
        <ExitDraftModeButton />
      </div>
    </div>
  );
}
