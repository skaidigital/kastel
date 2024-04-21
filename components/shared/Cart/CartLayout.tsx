'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { Dictionary } from '@/app/dictionaries';
import { Text } from '@/components/base/Text';
import { FreeShippingCountdown } from '@/components/shared/Cart/FreeShippingCountdown';

import { Button } from '@/components/Button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/Drawer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';
import { CartItem } from '@/components/shared/Cart/CartItem';
import { EmptyState } from '@/components/shared/Cart/EmptyState';
import { ANALTYICS_EVENT_NAME } from '@/data/constants';
import { trackEvent } from '@/lib/actions';
import { Cart } from '@/lib/shopify/types';
import { useDeviceType } from '@/lib/useDeviceType';
import { usePlausibleAnalytics } from '@/lib/usePlausibleAnalytics';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

interface Props {
  checkoutUrl: string;
  dictionary: Dictionary['cart_drawer'];
  children: React.ReactNode;
  cart?: Cart;
  freeShippingAmount?: number;
}

// TODO consider making the cart content into its own component if all the content is the same
export function CartLayout({ cart, checkoutUrl, dictionary, children, freeShippingAmount }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const quantityRef = useRef(cart?.totalQuantity);

  const { isDesktop } = useDeviceType();

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

  if (isDesktop) {
    return (
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger
          className="relative flex h-11 w-11 items-center justify-center rounded-project text-brand-dark-grey transition-colors hover:bg-brand-light-grey"
          asChild
        >
          <button aria-label="Open cart" className="text-text-sm text-brand-dark-grey">
            Cart
            {hasCartItems ? (
              <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded bg-brand-dark-grey text-[11px] font-medium text-white">
                {cart.totalQuantity}
              </div>
            ) : null}
          </button>
        </DrawerTrigger>
        <DrawerContent className="flex max-h-dvh w-full flex-col lg:h-screen">
          {hasCartItems && (
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex grow flex-col">
                <DrawerHeader>
                  {dictionary.cart} ({cart.totalQuantity})
                </DrawerHeader>
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
                    {cart.lines?.map((line) => (
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
                    ))}
                  </div>
                </div>
                {children}
              </div>
              <div className="border-brand-border flex w-full flex-col items-center space-y-2 border-t p-5">
                <div className="flex w-full items-center justify-between text-brand-mid-grey">
                  <Text size="sm">{dictionary.shipping}</Text>
                  <Text size="sm">{dictionary.calculated_at_checkout}</Text>
                </div>
                <div className="flex w-full items-center justify-between">
                  <Text size="sm">{dictionary.total_incl_vat}</Text>
                  <Text size="sm">{formattedTotal}</Text>
                </div>
                <Button
                  className="mb-2 w-full"
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
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button className="fixed bottom-0 w-full" onClick={() => setIsOpen(true)} variant="primary">
          {dictionary.cart} ({cart?.totalQuantity})
        </Button>
      </SheetTrigger>
      <SheetContent>
        {hasCartItems && (
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col space-y-8 p-5 pb-10">
              {cart?.lines?.map((line) => (
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
              ))}
            </div>
            <div className="border-brand-border flex w-full flex-col items-center space-y-2 border-t p-5">
              <div className="flex w-full items-center justify-between text-brand-mid-grey">
                <Text size="sm">{dictionary.shipping}</Text>
                <Text size="sm">{dictionary.calculated_at_checkout}</Text>
              </div>
              <div className="flex w-full items-center justify-between">
                <Text size="sm">{dictionary.total_incl_vat}</Text>
                <Text size="sm">{formattedTotal}</Text>
              </div>
              <Button
                className="mb-2 w-full"
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
      </SheetContent>
    </Sheet>
  );
}
