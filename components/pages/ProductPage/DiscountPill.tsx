'use client';

import { Text } from '@/components/base/Text';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { Product, ProductVariant } from './hooks';

interface Props {
  productType: Product['type'];
  variants: ProductVariant[];
}

export function DiscountPill({ productType, variants }: Props) {
  const activeVariant = useActiveVariant({
    productType,
    variants
  });

  const price = activeVariant?.price;
  const discountedPrice = activeVariant?.discountedPrice;
  const isOnSale = discountedPrice && price && price > discountedPrice;
  const discountPercentage = isOnSale ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  return (
    isOnSale && (
      <div>
        <Text
          size="sm"
          className="rounded-[4px] bg-[#FDF5E6] px-[6px] py-[2px] text-brand-dark-grey"
        >
          -{discountPercentage}%
        </Text>
      </div>
    )
  );
}
