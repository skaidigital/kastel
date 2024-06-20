'use client';

import { StarRating } from '@/components/StarRating';
import { Text } from '@/components/base/Text';
import { useProductRating } from '@/components/lipscore/useProductRating';
import { cn } from '@/lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';

interface Props {
  sku: string;
  className?: string;
}

function RatingWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-x-1 text-xs @[320px]:text-sm', className)}>
      {children}
    </div>
  );
}

export function ProductPageRating({ sku, className }: Props) {
  const { data: response, isLoading } = useProductRating(sku);

  if (isLoading) {
    return <RatingFallback />;
  }

  if (!response || !response.rating || !response.votes) {
    return null;
  }

  const formattedRating = Number(response.rating).toFixed(1);

  return (
    <RatingWrapper className={cn('', className)}>
      <div className="flex items-center gap-x-0.5">
        <StarRating rating={Number(formattedRating)} />
        <Text size="sm">{formattedRating}</Text>
      </div>
      <Text size="sm">({response.votes})</Text>
    </RatingWrapper>
  );
}

interface RatingFallbackProps {
  className?: string;
}

export function RatingFallback({ className }: RatingFallbackProps) {
  return (
    <RatingWrapper className={cn('hidden', className)}>
      <div className="flex items-center gap-x-0.5">
        <StarFilledIcon className="h-[14.4px] w-[14.4px]" />
        <Text size="sm">5.0</Text>
      </div>
      <Text size="sm">(00)</Text>
    </RatingWrapper>
  );
}
