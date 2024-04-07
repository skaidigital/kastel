'use client';

import { formatPrice } from '@/app/(site)/shopify/utils';
import { Dictionary } from '@/app/dictionaries';
import { Text } from '@/components/base/Text';
import { FreeShippingCountdown } from '@/components/shared/Cart/FreeShippingCountdown';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

import { Button } from '@/components/Button';
import { Drawer } from '@/components/Drawer';
import { ActiveVariants } from '@/components/pages/BundlePage/BundleButtons';
import { CartItem } from '@/components/shared/Cart/CartItem';
import { EmptyState } from '@/components/shared/Cart/EmptyState';
import { ANALTYICS_EVENT_NAME } from '@/data/constants';
import { trackEvent } from '@/lib/actions';
import { Cart } from '@/lib/shopify/types';
import { usePlausibleAnalytics } from '@/lib/usePlausibleAnalytics';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

interface BundleConfigProps {
  lineId: string;
  bundleId: string;
  variants: ActiveVariants[];
  discount: string;
  quantity: number;
}

interface Props {
  checkoutUrl: string;
  dictionary: Dictionary['cart_drawer'];
  children: React.ReactNode;
  cart?: Cart;
  bundleConfig?: BundleConfigProps;
  freeShippingAmount?: number;
}

export function CartDrawer({
  cart,
  checkoutUrl,
  dictionary,
  children,
  bundleConfig,
  freeShippingAmount
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const quantityRef = useRef(cart?.totalQuantity);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { trackGoToCheckout } = usePlausibleAnalytics();

  const totalAmount = cart ? Number(cart?.cost?.totalAmount?.amount) : undefined;
  const formattedTotal = cart ? formatPrice(cart?.cost?.totalAmount) : undefined;

  useEffect(() => {
    if (cart?.totalQuantity !== quantityRef?.current && !isOpen) {
      setIsOpen(true);
    }

    quantityRef.current = cart?.totalQuantity;
  }, [cart?.totalQuantity, isOpen]);

  const hasCartItems = cart && cart?.totalQuantity > 0;

  const currencyCode = cart?.cost?.totalAmount?.currencyCode;

  return (
    <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger
        className="relative flex h-11 w-11 items-center justify-center rounded-project text-brand-dark-grey transition-colors hover:bg-brand-light-grey"
        asChild
      >
        <button aria-label="Open cart">
          <ShoppingBagIcon className="transition-brand h-4" />
          {hasCartItems ? (
            <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded bg-brand-dark-grey text-[11px] font-medium text-white">
              {cart.totalQuantity}
            </div>
          ) : null}
        </button>
      </Drawer.Trigger>
      <Drawer.Content className="flex max-h-dvh w-full flex-col lg:h-screen">
        {hasCartItems && (
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex grow flex-col">
              <Drawer.Header>
                {dictionary.cart} ({cart.totalQuantity})
              </Drawer.Header>
              {freeShippingAmount && currencyCode && (
                <FreeShippingCountdown
                  freeShippingAmount={freeShippingAmount}
                  totalAmount={totalAmount || 0}
                  dictionary={dictionary}
                  currencyCode={currencyCode}
                />
              )}
              <div className="flex h-0 flex-grow flex-col overflow-y-auto">
                <div className="flex flex-col space-y-8 p-5 pb-10">
                  {cart.lines?.map((line) => {
                    if (bundleConfig && line.id === bundleConfig.lineId) {
                      const bundleContents = bundleConfig?.variants.map((variant) => {
                        const title = variant.title?.split('-') || [];
                        return {
                          name: title[0] || '',
                          value: title[1] || ''
                        };
                      });

                      return (
                        <CartItem
                          key={line.id}
                          lineId={line.id}
                          variantId={line.merchandise.id}
                          title={'Bundle'}
                          option1={bundleContents[0]}
                          option2={bundleContents[1]}
                          option3={bundleContents[2] || undefined}
                          variantDescription={'yo'}
                          image={line.merchandise.product.featuredImage}
                          quantity={bundleConfig.quantity}
                          subtotal={line.cost.totalAmount}
                          isBundle
                        />
                      );
                    }

                    return (
                      <CartItem
                        key={line.id}
                        lineId={line.id}
                        variantId={line.merchandise.id}
                        title={line.merchandise.product.title}
                        option1={line.merchandise.selectedOptions[0]}
                        option2={line.merchandise.selectedOptions[1]}
                        option3={line.merchandise.selectedOptions[2]}
                        variantDescription={line.merchandise.product.description}
                        image={line.merchandise.product.featuredImage}
                        quantity={line.quantity}
                        subtotal={line.cost.totalAmount}
                      />
                    );
                  })}
                </div>
              </div>
              {children}
            </div>
            <div className="flex w-full flex-col items-center space-y-2 border-t border-brand-border p-5">
              <div className="flex w-full items-center justify-between text-brand-mid-grey">
                <Text size="sm">{dictionary.shipping}</Text>
                <Text size="sm">{dictionary.calculated_at_checkout}</Text>
              </div>
              <div className="flex w-full items-center justify-between">
                <Text size="sm">{dictionary.total_incl_vat}</Text>
                <Text size="sm">{formattedTotal}</Text>
              </div>
              <Button
                className="mb-2"
                fullWidth
                isLoading={isPending}
                onClick={() => {
                  startTransition(() => {
                    trackEvent({ eventName: ANALTYICS_EVENT_NAME.GO_TO_CHECKOUT });
                    trackGoToCheckout();
                    router.push(checkoutUrl);
                  });
                }}
              >
                {dictionary.checkout}
              </Button>
            </div>
          </div>
        )}
        {!hasCartItems && (
          <EmptyState
            cartText={dictionary.cart}
            cartIsEmptyText={dictionary.cart_is_empty}
            startShoppingText={dictionary.start_shopping}
          />
        )}
      </Drawer.Content>
    </Drawer>
  );
}
