import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-project   bg-brand-primary-light', className)}
      {...props}
    />
  );
}

export { Skeleton };
