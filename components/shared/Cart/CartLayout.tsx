'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { Dictionary } from '@/app/dictionaries';
import { Text } from '@/components/base/Text';
import { FreeShippingCountdown } from '@/components/shared/Cart/FreeShippingCountdown';

import { Button } from '@/components/Button';
import { CustomLink } from '@/components/CustomLink';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/Drawer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';
import { CartItem } from '@/components/shared/Cart/CartItem';
import { DiscountCodeInput } from '@/components/shared/Cart/DiscountCodeInput';
import { ANALTYICS_EVENT_NAME, LangValues, ROUTES } from '@/data/constants';
import { env } from '@/env';
import { trackEvent } from '@/lib/actions';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { Cart } from '@/lib/shopify/types';
import { useDeviceType } from '@/lib/useDeviceType';
import { usePlausibleAnalytics } from '@/lib/usePlausibleAnalytics';
import { cn } from '@/lib/utils';
import { ShoppingBagIcon as ShoppingBagIconFilled } from '@heroicons/react/20/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
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
// TODO fix layout shift on loading dots
export function CartLayout({ cart, checkoutUrl, dictionary, children, freeShippingAmount }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const { lang } = useBaseParams();

  console.log(cart?.lines);

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
  const currencyCode = env.NEXT_PUBLIC_SHOPIFY_CURRENCY;
  const cartString = getCartString(lang);

  if (isDesktop) {
    return (
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger
          className="lg:hover-bg-none relative flex h-11 w-11 items-center justify-center rounded-project transition-colors hover:bg-brand-light-grey lg:h-auto lg:w-auto"
          asChild
        >
          <button aria-label="Open cart" className="text-sm">
            <span className="ml-2 mr-4">{cartString}</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className="flex max-h-dvh w-full flex-col lg:h-screen">
          <div
            className={cn(
              'flex flex-1 flex-col justify-between',
              hasCartItems ? 'bg-brand-sand' : 'bg-white'
            )}
          >
            <>
              <DrawerHeader title={dictionary.cart} className="mb-0 bg-white">
                {freeShippingAmount && currencyCode && (
                  <FreeShippingCountdown
                    freeShippingAmount={freeShippingAmount}
                    totalAmount={totalAmount || 0}
                    dictionary={dictionary}
                    currencyCode={currencyCode}
                    className="pt-4"
                  />
                )}
              </DrawerHeader>
            </>
            {hasCartItems && (
              <>
                <div className="flex grow flex-col">
                  <div className="flex h-0 flex-grow flex-col overflow-y-auto">
                    <div className="flex flex-col pb-10">
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
                          subtotal={line.cost.subtotalAmount}
                          totalAmount={line.cost.totalAmount}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {children}
                <DiscountCodeInput
                  discountCodes={cart.discountCodes}
                  className="bg-white px-6 py-4"
                />
                <div className="border-brand-border flex w-full flex-col items-center gap-y-4 border-t bg-white px-6 py-4">
                  <div className="flex w-full flex-col gap-y-2">
                    <div className="flex w-full items-center justify-between text-brand-mid-grey">
                      <Text size="sm" className="text-brand-mid-grey">
                        {dictionary.shipping}
                      </Text>
                      <Text size="sm" className="font-medium">
                        {dictionary.calculated_at_checkout}
                      </Text>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <Text size="sm" className="text-brand-mid-grey">
                        {dictionary.total_incl_vat}
                      </Text>
                      <Text size="sm" className="font-medium">
                        {formattedTotal || 0}
                      </Text>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
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
              </>
            )}
            {!hasCartItems && (
              <div className="flex w-full flex-col items-center justify-center gap-y-3">
                <div className="rounded-full bg-brand-sand p-4">
                  <ShoppingBagIconFilled className="size-8" />
                </div>
                <h2 className="mb-8 max-w-xs text-balance text-center text-md">
                  {dictionary.cart_is_empty}
                </h2>
              </div>
            )}
            {!hasCartItems && (
              <Button asChild className="mx-6 my-4" size="sm">
                <CustomLink href={ROUTES.HOME}>{dictionary.start_shopping}</CustomLink>
              </Button>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="pr-4">
        <ShoppingBagIcon className="size-6" />
      </SheetTrigger>
      <SheetContent className="h-[calc(95dvh-32px)]" noPadding>
        <div
          className={cn(
            'flex h-full flex-col overflow-hidden'
            // hasCartItems ? 'bg-brand-sand' : 'bg-white'
          )}
        >
          {/* Header */}
          <DrawerHeader title={dictionary.cart} className="h-fit px-4">
            {freeShippingAmount && currencyCode && (
              <FreeShippingCountdown
                freeShippingAmount={freeShippingAmount}
                totalAmount={totalAmount || 0}
                dictionary={dictionary}
                currencyCode={currencyCode}
                className="pt-4"
              />
            )}
          </DrawerHeader>
          {/* Main content */}
          <div
            className={cn('flex grow flex-col overflow-auto', !hasCartItems && 'justify-center')}
          >
            {!hasCartItems && (
              <div className="flex w-full flex-col items-center justify-center gap-y-3">
                <div className="rounded-full bg-brand-sand p-4">
                  <ShoppingBagIconFilled className="size-8" />
                </div>
                <h2 className="mb-8 max-w-xs text-balance text-center text-md">
                  {dictionary.cart_is_empty}
                </h2>
              </div>
            )}
            {hasCartItems && (
              <div>
                <div className="flex grow flex-col bg-black">
                  <div className="flex h-0 flex-grow flex-col ">
                    <div className="flex flex-col">
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
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="mt-6 h-fit w-full">
            {!hasCartItems && (
              <Button asChild size="sm" className="w-full">
                <CustomLink href={ROUTES.HOME}>{dictionary.start_shopping}</CustomLink>
              </Button>
            )}
            {hasCartItems && (
              <>
                {children}
                <DiscountCodeInput
                  discountCodes={cart.discountCodes}
                  className="bg-white px-4 py-4"
                />
                <div className="border-brand-border flex w-full flex-col items-center gap-y-4 border-t bg-white px-6 py-4">
                  <div className="flex w-full flex-col gap-y-2">
                    <div className="flex w-full items-center justify-between text-brand-mid-grey">
                      <Text size="sm" className="text-brand-mid-grey">
                        {dictionary.shipping}
                      </Text>
                      <Text size="sm" className="font-medium">
                        {dictionary.calculated_at_checkout}
                      </Text>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <Text size="sm" className="text-brand-mid-grey">
                        {dictionary.total_incl_vat}
                      </Text>
                      <Text size="sm" className="font-medium">
                        {formattedTotal || 0}
                      </Text>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
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
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function getCartString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Cart';
    case 'no':
      return 'Handlekurv';
    default:
      return 'Cart';
  }
}
