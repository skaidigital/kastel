import { Filter } from '@/components/shared/CollectionAndSearchActionsBarMobile/Filter';
import { Settings } from '@/components/shared/CollectionAndSearchActionsBarMobile/Settings';
import { Sort } from '@/components/shared/CollectionAndSearchActionsBarMobile/Sort';
import { LangValues, MarketValues } from '@/data/constants';
import { cn } from '@/lib/utils';

interface Props {
  market: MarketValues;
  lang: LangValues;
  className?: string;
}

export function CollectionAndSearchActionsBarMobile({ market, lang, className }: Props) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-30 flex w-full divide-x divide-brand-light-grey border-t border-brand-light-grey',
        className
      )}
    >
      <Filter market={market} lang={lang} />
      <Sort lang={lang} />
      <Settings lang={lang} />
    </div>
  );
}
