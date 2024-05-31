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

  const isAVariantOnSale = variants.some(
    (variant) => variant.discountedPrice && variant.price && variant.price > variant.discountedPrice
  );

  const formattedMinVariantPrice = formatPrice(
    minVariantPrice || { amount: '0', currencyCode: 'nok' }
  );
  const formattedMaxVariantPrice = formatPrice(
    maxVariantPrice || { amount: '0', currencyCode: 'nok' }
  );
  const minAndMaxPricesAreEqual = formattedMinVariantPrice === formattedMaxVariantPrice;

  return (
    <div className="mt-4 flex text-sm">
      <>
        {formattedDiscountedPrice && (
          <span className="mr-3 " suppressHydrationWarning>
            {formattedDiscountedPrice}
          </span>
        )}
        {isOnSale ? (
          <del className="text-brand-mid-grey line-through" suppressHydrationWarning>
            {formattedPrice}
          </del>
        ) : (
          <span suppressHydrationWarning>{formattedPrice}</span>
        )}
      </>
      {productType === 'VARIABLE' && !activeVariant && (
        <span suppressHydrationWarning>
          {isAVariantOnSale ? (
            <>
              <span className="mr-3 " suppressHydrationWarning>
                {formatPrice({
                  amount: variants[0]?.discountedPrice?.toString() || '0',
                  currencyCode
                })}
              </span>
              <del className="text-brand-mid-grey line-through" suppressHydrationWarning>
                {formatPrice({
                  amount: variants[0]?.price?.toString() || '0',
                  currencyCode
                })}
              </del>
            </>
          ) : minAndMaxPricesAreEqual ? (
            formattedMinVariantPrice
          ) : (
            `${formattedMinVariantPrice} – ${formattedMaxVariantPrice}
            `
          )}
        </span>
      )}
    </div>
  );
}
