import { cn } from '@/lib/utils';

export function CollectionProductsLoadingState() {
  return (
    <div className="grid grid-cols-2 border border-brand-light-grey lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="m-[-1px] flex flex-col border border-brand-light-grey" key={index}>
          <div
            className={cn(
              'animate-pulse aspect-h-4 aspect-w-3 w-full animate-blink bg-brand-sand',
              index === 1 && '[--animation-delay:50ms]',
              index === 2 && '[--animation-delay:150ms]',
              index === 3 && '[--animation-delay:250ms]',
              index === 4 && '[--animation-delay:350ms]',
              index === 5 && '[--animation-delay:450ms]',
              index === 6 && '[--animation-delay:550ms]',
              index === 7 && '[--animation-delay:650ms]'
            )}
          />
          <div className="h-10 w-full border-t border-brand-light-grey bg-white" />
        </div>
      ))}
    </div>
  );
}
