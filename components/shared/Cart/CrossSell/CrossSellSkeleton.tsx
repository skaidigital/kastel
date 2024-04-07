'use client';

import { Skeleton } from '@/components/Skeleton';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

interface CrossSellSkeletonProps {
  className?: string;
}

export function CrossSellSkeleton({ className }: CrossSellSkeletonProps) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <Skeleton className="mb-5 h-5 w-64" />
      <div className="flex gap-x-5">
        <div className="w-[113px]">
          <AspectRatio ratio={3 / 4} className="relative">
            <Skeleton className="h-full w-full" />
          </AspectRatio>
        </div>
        <div className="flex grow flex-col justify-between">
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-x-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
