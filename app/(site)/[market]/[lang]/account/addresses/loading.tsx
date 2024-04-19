import { Section } from '@/components/base/Section';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <Section label="My Addresses" srHeading="My Addresses" className="px-6 md:px-12 lg:px-20">
      <Skeleton className="mb-10 h-8 w-40" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Item />
        <Item />
        <Item />
      </div>
    </Section>
  );
}

function Item() {
  return (
    <div className="border-brand-border flex h-40 w-full flex-col space-y-5 rounded-project border p-5">
      <Skeleton className="h-5 w-32" />
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}
