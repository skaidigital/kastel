import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-project   bg-brand-light-grey', className)}
      {...props}
    />
  );
}

export { Skeleton };
