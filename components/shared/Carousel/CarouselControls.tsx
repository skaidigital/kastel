import { cn } from '@/lib/utils';

interface Props {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export function CarouselControls({
  canScrollPrev,
  canScrollNext,
  onPrev,
  onNext,
  className
}: Props) {
  return (
    <div className={cn('flex gap-2', className)}>
      <button
        onClick={() => {
          if (canScrollPrev) {
            onPrev();
          }
        }}
        disabled={!canScrollPrev}
        className={cn({
          'rounded-md px-4 py-2 text-white': true,
          'bg-indigo-200': !canScrollPrev,
          'bg-indigo-400': canScrollPrev
        })}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (canScrollNext) {
            onNext();
          }
        }}
        disabled={!canScrollNext}
        className={cn({
          'rounded-md px-4 py-2 text-white': true,
          'bg-indigo-200': !canScrollNext,
          'bg-indigo-400': canScrollNext
        })}
      >
        Next
      </button>
    </div>
  );
}
