'use client';

import { Text } from '@/components/base/Text';
import { cn, createUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  id: number;
  variableName: string;
}

export function OptionButton({ id, variableName }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const imageSearchParams = new URLSearchParams(searchParams.toString());

  const imageSearchParam = searchParams.get(variableName);
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;
  const isActive = id === imageIndex;

  imageSearchParams.set(variableName, id.toString());

  return (
    <Text
      size="eyebrow"
      asChild
      className={cn(
        'w-full rounded-project border border-brand-border p-3',
        isActive && 'bg-brand-dark-grey text-white'
      )}
    >
      <Link href={createUrl(pathname, imageSearchParams)}>Variant {id}</Link>
    </Text>
  );
}
