'use client';

import { useShopifyAnalytics } from '@/app/[market]/[lang]/(site)/shopify/hooks/useShopifyAnalytics';
import { formatPrice } from '@/app/[market]/[lang]/(site)/shopify/utils';
import { Button } from '@/components/Button';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { addItem } from '@/components/shared/Cart/actions';
import { ANALTYICS_EVENT_NAME } from '@/data/constants';
import { env } from '@/env';
import { trackEvent } from '@/lib/actions';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { usePlausibleAnalytics } from '@/lib/usePlausibleAnalytics';
import { cn } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface Props {
  productId: string;
  productType: Product['type'];
  variants: ProductVariant[];
  inventory: ProductInventoryResponse;
  addToCartText: string;
  selectSizeText: string;
}

export const AddToCartButton = ({
  productId,
  productType,
  variants,
  inventory,
  addToCartText,
  selectSizeText
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { sendAddToCart } = useShopifyAnalytics();
  const { trackAddToCart } = usePlausibleAnalytics();

  const activeVariant = useActiveVariant({
    variants,
    productType
  });

  const id = activeVariant?.id;
  const price = activeVariant?.price;
  const discountedPrice = activeVariant?.discountedPrice;
  const bestPrice = discountedPrice || price;

  const activeVariantInventory = inventory.variants.edges.find(({ node }) => node.id === id)?.node;

  const availableForSale = activeVariantInventory?.availableForSale;

  const isInStock =
    activeVariantInventory?.quantityAvailable && activeVariantInventory.quantityAvailable > 0;

  const title = !availableForSale ? 'Out of stock' : !id ? 'Please select options' : undefined;

  const metadata = {
    ...(productId && { productId }),
    ...(id && { variantId: id })
  };

  return (
    <Button
      title={title}
      disabled={!availableForSale || !id || !isInStock}
      isLoading={isPending}
      onClick={() => {
        // Safeguard in case someone messes with `disabled` in devtools.
        if (!availableForSale || !id) return;
        startTransition(async () => {
          const response = await addItem(id);
          if (!response.success) {
            console.error(response);

            // Trigger the error boundary in the root error.js
            throw new Error(response.toString());
          }

          if (response?.success && response.cartId) {
            // Shopify analytic
            sendAddToCart({
              cartId: response.cartId
            });
            // Vercel analytics
            trackEvent({
              eventName: ANALTYICS_EVENT_NAME.ADD_TO_CART,
              options: metadata
            });
            // GTM
            sendGTMEvent({
              event: ANALTYICS_EVENT_NAME.ADD_TO_CART
            });
            // Plausible
            trackAddToCart({ options: metadata });
          }
          router.refresh();
        });
      }}
      className={cn(
        '',
        'cursor-not-allowed opacity-60 hover:opacity-60' && (!availableForSale || !id),
        'cursor-not-allowed' && isPending
      )}
    >
      <>
        {id ? (
          <>
            {addToCartText}
            <span className="mx-4">·</span>
            {formatPrice({
              amount: String(bestPrice),
              currencyCode: env.NEXT_PUBLIC_SHOPIFY_CURRENCY
            })}
          </>
        ) : (
          <>{selectSizeText}</>
        )}
      </>
    </Button>
  );
};
