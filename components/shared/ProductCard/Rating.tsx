import { Text } from '@/components/base/Text';
import { useProductRating } from '@/components/lipscore/useProductRating';
import { cn } from '@/lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';

interface Props {
  sku: string;
  className?: string;
}

function RatingWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className="flex items-center gap-x-1 text-xs @[320px]:text-sm">{children}</div>;
}

// TODO consider having the fallback be nothing to reduce layout shift
export function Rating({ sku, className }: Props) {
  // const response = await getProductRatingBySku(sku);

  const { data: response } = useProductRating(sku);
  console.log({ response });

  if (!response || !response.rating || !response.votes) {
    return null;
  }

  const formattedRating = Number(response.rating).toFixed(1);

  return (
    <RatingWrapper className={cn('', className)}>
      <div className="flex items-center gap-x-0.5">
        <StarFilledIcon className="h-[14.4px] w-[14.4px]" />
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
    <RatingWrapper className={cn(className)}>
      <div className="flex items-center gap-x-0.5">
        <StarFilledIcon className="h-[14.4px] w-[14.4px]" />
        <Text size="sm">5.0</Text>
      </div>
      <Text size="sm">(0000)</Text>
    </RatingWrapper>
  );
}
