'use client';

import { formatPrice } from '@/app/(site)/shopify/utils';
import { Text } from '@/components/base/Text';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { createActiveBundle } from './hooks';

interface Props {
  items: any;
  discountPercentage: number;
  currencyCode: string;
  minVariantPrice: number;
  maxVariantPrice: number;
}

export function BundlePrice({
  items,
  discountPercentage,
  currencyCode,
  minVariantPrice,
  maxVariantPrice
}: Props) {
  const [urlVariants] = useQueryState('variants', parseAsArrayOf(parseAsString));
  const activeBundle = createActiveBundle(items, urlVariants);

  const totalPrice = activeBundle.reduce((acc, item) => acc + item.price, 0);
  const totalPriceWithDiscount = totalPrice - totalPrice * (discountPercentage / 100);

  const hasPrice = totalPrice ? true : false;
  const isOnSale = totalPrice && totalPrice !== totalPriceWithDiscount;
  //   const isOnSale = false;
  const validBundleLength = activeBundle.length === items.length;

  const formattedMinVariantPrice = formatPrice({
    amount: minVariantPrice.toString(),
    currencyCode
  });
  const formattedMaxVariantPrice = formatPrice({
    amount: maxVariantPrice.toString(),
    currencyCode
  });

  const formattedPrice = formatPrice({
    amount: totalPriceWithDiscount.toString(),
    currencyCode
  });
  const formattedCompareAtPrice = formatPrice({
    amount: totalPrice.toString(),
    currencyCode
  });

  return (
    <div className="flex">
      {hasPrice && validBundleLength ? (
        <Text>
          {totalPrice && <span className="mr-3">{formattedPrice}</span>}
          {isOnSale && <del className="line-through">{formattedCompareAtPrice}</del>}
        </Text>
      ) : (
        <Text>
          {formattedMinVariantPrice} &ndash; {formattedMaxVariantPrice}
        </Text>
      )}
      {/* {isOnSale && discountPercentage && (
        <div>
          <Badge size="sm" variant="success" className="ml-3">
            {discountPercentage}% OFF
          </Badge>
        </div>
      )} */}
    </div>
  );
}
