'use client';

import { useProductInventory } from '@/app/api/shopify/useProductInventory';
import { Button } from '@/components/Button';
import { useCartContext } from '@/components/CartContext';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { addItem } from '@/components/shared/Cart/actions';
import { ANALTYICS_EVENT_NAME } from '@/data/constants';
import { trackEvent } from '@/lib/actions';
import { EcommerceObject, clearEcommerceInDataLayer } from '@/lib/gtm';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { removeProductGid } from '@/lib/shopify/helpers';
import { useShopifyAnalytics } from '@/lib/shopify/useShopifyAnalytics';
import { usePlausibleAnalytics } from '@/lib/usePlausibleAnalytics';
import { cn } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';

interface Props {
  productId: string;
  productType: Product['type'];
  productTitle: string;
  variants: ProductVariant[];
  addToCartText: string;
  selectSizeText: string;
}

export const AddToCartButton = ({
  productId,
  productType,
  productTitle,
  variants,
  addToCartText,
  selectSizeText
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const { setMobileDrawerOpen, setCartOpen } = useCartContext();
  const { sendAddToCart } = useShopifyAnalytics();
  const { trackAddToCart } = usePlausibleAnalytics();

  const activeVariant = useActiveVariant({
    variants,
    productType
  });

  const queryClient = useQueryClient();

  const { data: inventory, isLoading: inventoryLoading } = useProductInventory(productId);

  const id = activeVariant?.id;

  const activeVariantInventory = inventory?.variants.edges.find(({ node }) => node.id === id)?.node;

  const availableForSale = activeVariantInventory?.availableForSale;

  const isInStock =
    activeVariantInventory?.quantityAvailable && activeVariantInventory.quantityAvailable > 0;

  const title = !availableForSale ? 'Out of stock' : !id ? selectSizeText : addToCartText;

  const metadata = {
    ...(productId && { productId }),
    ...(id && { variantId: id }),
    ...(activeVariant?.price && { price: activeVariant.price }),
    currency: 'NOK'
  };

  const selectedOptionsValueString = activeVariant?.selectedOptions
    ?.map((option) => option?.value)
    ?.filter((value) => value !== undefined)
    ?.join(',');

  const _learnq = typeof window !== 'undefined' ? window._learnq : [];

  const klaviyoCart = {
    total_price: activeVariant?.price || 0,
    $value: activeVariant?.price || 0,
    items: [
      {
        item_id: removeProductGid(productId),
        item_name: productTitle,
        item_variant: selectedOptionsValueString,
        item_brand: 'Kastel Shoes',
        price: activeVariant?.discountedPrice || activeVariant?.price || 0,
        quantity: 1
      }
    ]
  };

  // TODO internationalize
  const addToCartTrackingData: EcommerceObject = {
    event: ANALTYICS_EVENT_NAME.ADD_TO_CART,
    ecommerce: {
      currency: 'NOK',
      value: activeVariant?.discountedPrice || activeVariant?.price || 0,
      items: [
        {
          item_id: removeProductGid(productId),
          item_name: productTitle,
          item_variant: selectedOptionsValueString,
          item_brand: 'Kastel Shoes',
          price: activeVariant?.discountedPrice || activeVariant?.price || 0,
          quantity: 1
        }
      ]
    }
  };

  return (
    <Button
      title={title}
      disabled={!availableForSale || !id || !isInStock || inventoryLoading}
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
              cartId: response.cartId,
              totalValue: activeVariant?.price
            });
            // Vercel analytics
            trackEvent({
              eventName: ANALTYICS_EVENT_NAME.ADD_TO_CART,
              options: metadata
            });
            // GTM – Analtyics
            clearEcommerceInDataLayer();
            sendGTMEvent(addToCartTrackingData);
            // Klaviyo
            _learnq?.push(['track', 'Added to Cart', klaviyoCart]);
            // Plausible
            trackAddToCart({ options: metadata });
            setMobileDrawerOpen(false);
            setCartOpen(true);

            queryClient.invalidateQueries({
              queryKey: ['cart']
            });
          }
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
