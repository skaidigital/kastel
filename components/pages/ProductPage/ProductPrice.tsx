'use client';

import { formatPrice } from '@/app/api/shopify/utils';
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
  const minAndMaxPricesAreEqual = minVariantPrice === maxVariantPrice;

  return (
    <div className="my-4 flex text-sm">
      <>
        {formattedDiscountedPrice && <span className="mr-3 ">{formattedDiscountedPrice}</span>}
        {isOnSale ? (
          <del className="text-brand-mid-grey line-through">{formattedPrice}</del>
        ) : (
          <span>{formattedPrice}</span>
        )}
      </>
      {productType === 'VARIABLE' && !activeVariant && (
        <span>
          {minAndMaxPricesAreEqual
            ? formattedMinVariantPrice
            : `${formattedMinVariantPrice} &ndash; ${formattedMaxVariantPrice}
          `}
        </span>
      )}
    </div>
  );
}
