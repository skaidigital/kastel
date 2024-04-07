'use client';

import { formatPrice } from '@/app/[market]/[lang]/(site)/shopify/utils';
import { Dictionary } from '@/app/dictionaries-client';
import { Text } from '@/components/base/Text';
import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';

interface Props {
  freeShippingAmount: number;
  totalAmount: number;
  currencyCode: string;
  dictionary: Dictionary['cart_drawer'];
}

export const FreeShippingCountdown = ({
  freeShippingAmount,
  totalAmount,
  dictionary,
  currencyCode
}: Props) => {
  const [progress, setProgress] = useState(0);

  const currentProgress = (totalAmount / freeShippingAmount) * 100;
  const awayFromFreeShipping = freeShippingAmount - totalAmount;
  const hasFreeShipping = totalAmount >= freeShippingAmount;

  useEffect(() => {
    const correctProgress = currentProgress > 100 ? 100 : currentProgress;
    const timer = setTimeout(() => setProgress(correctProgress), 500);
    return () => clearTimeout(timer);
  }, [currentProgress]);

  const youAreAwayFromFreeShippingPartOne =
    dictionary.you_are_away_from_free_shipping.split('__AMOUNT__')[0];
  const youAreAwayFromFreeShippingPartTwo =
    dictionary.you_are_away_from_free_shipping.split('__AMOUNT__')[1];

  const formattedAwayFromFreeShipping = formatPrice({
    amount: String(awayFromFreeShipping),
    currencyCode
  });

  return (
    <div className="flex flex-col space-y-1 p-5">
      {hasFreeShipping && <Text size="sm">{dictionary.you_get_free_shipping}</Text>}
      {hasFreeShipping && <Text size="sm">Gratulerer, du får gratis frakt!</Text>}
      {!hasFreeShipping && (
        <Text size="sm">
          {youAreAwayFromFreeShippingPartOne} {formattedAwayFromFreeShipping}{' '}
          {youAreAwayFromFreeShippingPartTwo}
        </Text>
      )}
      <Progress.Root
        className="relative h-2 w-full overflow-hidden rounded-md border-b border-brand-border bg-brand-light-grey"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: 'translateZ(0)'
        }}
        value={progress}
      >
        <Progress.Indicator
          className="h-full w-full bg-black transition-transform"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
};
