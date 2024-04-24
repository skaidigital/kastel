'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { Text } from '@/components/base/Text';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';

interface Props {
  productType: Product['type'];
  variants: ProductVariant[];
  currencyCode: string;
  minVariantPrice: Product['minVariantPrice'];
  maxVariantPrice: Product['maxVariantPrice'];
}

export function ProductPrice({
  currencyCode,
  productType,
  variants,
  minVariantPrice,
  maxVariantPrice
}: Props) {
  const activeVariant = useActiveVariant({
    productType,
    variants
  });

  const price = activeVariant?.price;
  const discountedPrice = activeVariant?.discountedPrice;
  const isOnSale = discountedPrice && price && price > discountedPrice;

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
        {formattedDiscountedPrice && (
          <span className="mr-3 text-brand-dark-grey">{formattedDiscountedPrice}</span>
        )}
        {isOnSale ? (
          <del className="text-brand-mid-grey line-through">{formattedPrice}</del>
        ) : (
          <span>{formattedPrice}</span>
        )}
      </Text>
      {productType === 'VARIABLE' && !activeVariant && (
        <Text>
          {formattedMinVariantPrice} &ndash; {formattedMaxVariantPrice}
        </Text>
      )}
    </div>
  );
}
