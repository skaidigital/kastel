'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { useProductCardContext } from './Context';

interface Props {
  price: string | null;
  hasSizeRange: boolean;
  sizeRange: string;
}

export function PriceAndSizeRange({ price, hasSizeRange, sizeRange }: Props) {
  const { activeColorway } = useProductCardContext();

  const formattedMinPrice =
    activeColorway &&
    formatPrice({
      amount: String(activeColorway.minVariantPrice.amount),
      currencyCode: activeColorway.minVariantPrice.currencyCode
    });

  const activePrice = activeColorway ? formattedMinPrice : price;

  return (
    <div className="flex gap-x-3 text-xs text-brand-mid-grey @xs:gap-x-4 @xs:text-sm">
      <span suppressHydrationWarning>{activePrice}</span>
      {hasSizeRange && <span>{sizeRange}</span>}
    </div>
  );
}
