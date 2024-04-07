import { Skeleton } from '@/components/Skeleton';

export function ProductLoader() {
  return (
    <div className="mt-10 space-y-10 px-5 lg:flex lg:gap-x-20">
      <div className="mt-10 hidden lg:flex lg:grow lg:flex-col lg:gap-y-5">
        <Skeleton className="aspect-[3/4] w-full" />
        <Skeleton className="aspect-[3/4] w-full" />
      </div>
      <div className="sticky top-1/2 h-fit shrink-0 translate-y-[-50%] space-y-6 lg:w-[450px]">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-[50%]" />
          <Skeleton className="h-5 w-[50%]" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-6 gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
