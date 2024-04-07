'use client';

import { formatPrice } from '@/app/[market]/[lang]/(site)/shopify/utils';
import { Badge } from '@/components/Badge';
import { Text } from '@/components/base/Text';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { Money } from '@/lib/shopify/types';

interface Props {
  productType: Product['type'];
  variants: ProductVariant[];
  currencyCode: string;
  priceRange: Product['priceRange'];
}

export function ProductPrice({ currencyCode, productType, variants, priceRange }: Props) {
  const activeVariant = useActiveVariant({
    productType,
    variants
  });

  const price = activeVariant?.price;
  const discountedPrice = activeVariant?.discountedPrice;
  const minVariantPrice = priceRange.minVariantPrice as Money;
  const maxVariantPrice = priceRange.maxVariantPrice as Money;
  const isOnSale = discountedPrice && price && price > discountedPrice;
  const discountPercentage = isOnSale ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  const formattedPrice = price
    ? formatPrice({
        amount: price.toString(),
        currencyCode
      })
    : undefined;

  const formattedDiscountedPrice = discountedPrice
    ? formatPrice({
        amount: discountedPrice.toString(),
        currencyCode
      })
    : undefined;

  const formattedMinVariantPrice = formatPrice(minVariantPrice);
  const formattedMaxVariantPrice = formatPrice(maxVariantPrice);

  return (
    <div className="flex">
      <Text>
        {formattedDiscountedPrice && <span className="mr-3">{formattedDiscountedPrice}</span>}
        {isOnSale ? (
          <del className="line-through">{formattedPrice}</del>
        ) : (
          <span>{formattedPrice}</span>
        )}
      </Text>
      {productType === 'VARIABLE' && !activeVariant && (
        <Text>
          {formattedMinVariantPrice} &ndash; {formattedMaxVariantPrice}
        </Text>
      )}
      {isOnSale && discountPercentage && (
        <div>
          <Badge size="sm" variant="success" className="ml-3">
            {discountPercentage}% OFF
          </Badge>
        </div>
      )}
    </div>
  );
}
