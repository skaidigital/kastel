import { Skeleton } from '@/components/Skeleton';

export function ProductFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-5 w-56" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-[44px] w-full" />
    </div>
  );
}
