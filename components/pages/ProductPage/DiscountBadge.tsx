'use client';

import { Badge } from '@/components/Badge';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { Product, ProductVariant } from './hooks';

interface Props {
  productType: Product['type'];
  variants: ProductVariant[];
}

export function DiscountBadge({ productType, variants }: Props) {
  const activeVariant = useActiveVariant({
    productType,
    variants
  });

  const price = activeVariant?.price;
  const discountedPrice = activeVariant?.discountedPrice;
  const isOnSale = discountedPrice && price && price > discountedPrice;
  const discountPercentage = isOnSale ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  return isOnSale && <Badge>-{discountPercentage}%</Badge>;
}
