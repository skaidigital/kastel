import { Filter } from '@/components/pages/CollectionPage/CollectionActionsBarMobile/Filter';
import { Settings } from '@/components/pages/CollectionPage/CollectionActionsBarMobile/Settings';
import { Sort } from '@/components/pages/CollectionPage/CollectionActionsBarMobile/Sort';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function CollectionActionsBarMobile({ className }: Props) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-30 flex w-full divide-x divide-brand-light-grey border-t border-brand-light-grey',
        className
      )}
    >
      <Filter />
      <Sort />
      <Settings />
    </div>
  );
}
