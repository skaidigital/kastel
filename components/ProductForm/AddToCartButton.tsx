'use client';

import { Button } from '@/components/Button';
import { useCartContext } from '@/components/CartContext';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { addItem } from '@/components/shared/Cart/actions';
import {
  ANALTYICS_EVENT_NAME,
  META_ANALYTICS_EVENT_NAME,
  SNAPCHAT_ANALYTICS_EVENT_NAME
} from '@/data/constants';
import { trackEvent } from '@/lib/actions';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { useShopifyAnalytics } from '@/lib/shopify/useShopifyAnalytics';
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
  const { setMobileDrawerOpen } = useCartContext();
  const { sendAddToCart } = useShopifyAnalytics();
  const { trackAddToCart } = usePlausibleAnalytics();

  const activeVariant = useActiveVariant({
    variants,
    productType
  });

  const id = activeVariant?.id;

  const activeVariantInventory = inventory.variants.edges.find(({ node }) => node.id === id)?.node;

  const availableForSale = activeVariantInventory?.availableForSale;

  const isInStock =
    activeVariantInventory?.quantityAvailable && activeVariantInventory.quantityAvailable > 0;

  const title = !availableForSale ? 'Out of stock' : !id ? selectSizeText : addToCartText;

  const metadata = {
    ...(productId && { productId }),
    ...(id && { variantId: id })
  };
  return (
    <Button
      title={title}
      disabled={!availableForSale || !id || !isInStock}
      size="sm"
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
            // GTM – Analtyics
            sendGTMEvent({
              event: ANALTYICS_EVENT_NAME.ADD_TO_CART
            });
            // Meta
            sendGTMEvent({
              event: META_ANALYTICS_EVENT_NAME.ADD_TO_CART
            });
            // Snap
            sendGTMEvent({
              event: SNAPCHAT_ANALYTICS_EVENT_NAME.ADD_TO_CART
            });
            // Plausible
            trackAddToCart({ options: metadata });
            setMobileDrawerOpen(false);
          }
          router.refresh();
        });
      }}
      className={cn(
        'w-full',
        'cursor-not-allowed opacity-60 hover:opacity-60' && (!availableForSale || !id),
        'cursor-not-allowed' && isPending
      )}
    >
      <>{id ? <>{title}</> : <>{selectSizeText}</>}</>
    </Button>
  );
};
