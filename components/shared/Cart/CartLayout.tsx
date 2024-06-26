'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { Dictionary } from '@/app/dictionaries';
import { Text } from '@/components/base/Text';
import { FreeShippingCountdown } from '@/components/shared/Cart/FreeShippingCountdown';

import { Button } from '@/components/Button';
import { useCartContext } from '@/components/CartContext';
import { CustomLink } from '@/components/CustomLink';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/Drawer';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/Sheet';
import { CartItem } from '@/components/shared/Cart/CartItem';
import { DiscountCodeInput } from '@/components/shared/Cart/DiscountCodeInput';
import { useCart } from '@/components/shared/Cart/useCart';
import { ANALTYICS_EVENT_NAME, LangValues, ROUTES } from '@/data/constants';
import { env } from '@/env';
import { trackEvent } from '@/lib/actions';
import { EcommerceObject, clearEcommerceInDataLayer } from '@/lib/gtm';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { removeProductGid } from '@/lib/shopify/helpers';
import { usePlausibleAnalytics } from '@/lib/usePlausibleAnalytics';
import { useUser } from '@/lib/useUser';
import { cn } from '@/lib/utils';
import { ShoppingBagIcon as ShoppingBagIconFilled } from '@heroicons/react/20/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { sendGTMEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface Props {
  dictionary: Dictionary['cart_drawer'];
  children: React.ReactNode;
  freeShippingAmount?: number;
}

// TODO consider making the cart content into its own component if all the content is the same
export function CartLayout({ dictionary, children, freeShippingAmount }: Props) {
  const { lang } = useBaseParams();
  const { isLoggedIn } = useUser();
  const { cartOpen: isOpen, setCartOpen: setIsOpen } = useCartContext();
  const { cart } = useCart();

  const checkoutUrl = getCheckoutUrl({ cartCheckoutUrl: cart?.checkoutUrl, isLoggedIn });

  const isDesktop = useIsDesktop();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { trackGoToCheckout } = usePlausibleAnalytics();

  const totalAmount = cart ? Number(cart?.cost?.totalAmount?.amount) : undefined;
  const formattedTotal = cart ? formatPrice(cart?.cost?.totalAmount) : undefined;

  const hasCartItems = cart && cart?.totalQuantity > 0;
  const currencyCode = env.NEXT_PUBLIC_SHOPIFY_CURRENCY;
  const cartString = getCartString(lang);

  const viewCartTrackingData: EcommerceObject | undefined = cart?.cost
    ? {
        event: ANALTYICS_EVENT_NAME.VIEW_CART,
        ecommerce: {
          currency: 'NOK',
          value: parseFloat(cart?.cost.totalAmount.amount) || 0,
          items: cart?.lines?.map((line) => ({
            item_id: removeProductGid(line.merchandise.product.id),
            item_name: line.merchandise.product.title,
            item_variant: line.merchandise.title,
            item_brand: 'Kastel Shoes',
            price: parseFloat(line.cost.subtotalAmount.amount),
            quantity: line.quantity
          }))
        }
      }
    : undefined;

  const beginCheckoutTrackingData: EcommerceObject | undefined = cart?.cost
    ? {
        event: ANALTYICS_EVENT_NAME.BEGIN_CHECKOUT,
        ecommerce: {
          currency: 'NOK',
          value: parseFloat(cart?.cost.totalAmount.amount) || 0,
          items: cart?.lines?.map((line) => ({
            item_id: removeProductGid(line.merchandise.product.id),
            item_name: line.merchandise.product.title,
            item_variant: line.merchandise.title,
            item_brand: 'Kastel Shoes',
            price: parseFloat(line.cost.subtotalAmount.amount),
            quantity: line.quantity
          }))
        }
      }
    : undefined;

  const cartLevelDiscountAmount =
    Number(cart?.cost?.subtotalAmount?.amount) - Number(cart?.cost?.totalAmount?.amount);

  const cartLineDiscountAmount =
    cart?.lines?.reduce(
      (acc, curr) =>
        acc + Number(curr.cost.subtotalAmount.amount) - Number(curr.cost.totalAmount.amount),
      0
    ) || 0;

  const totalDiscountedAmount = cartLevelDiscountAmount + cartLineDiscountAmount;

  const hasDiscount = totalDiscountedAmount > 0;
  const formattedDiscountedAmount = hasDiscount
    ? formatPrice({ amount: String(totalDiscountedAmount), currencyCode })
    : '';

  if (isDesktop) {
    return (
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger
          className="lg:hover-bg-none relative flex h-11 w-11 items-center justify-center rounded-project transition-colors hover:bg-brand-light-grey focus:bg-brand-light-grey lg:h-auto lg:w-auto lg:hover:bg-transparent lg:focus:bg-transparent"
          asChild
        >
          <button
            onClick={() => {
              if (viewCartTrackingData) {
                clearEcommerceInDataLayer();
                sendGTMEvent(viewCartTrackingData);
              }
            }}
            aria-label="Open cart"
            className="text-sm"
          >
            {/* <span className="ml-2 mr-4">
              {cartString} {hasCartItems ? `(${cart?.totalQuantity})` : null}
            </span> */}
            <span className="ml-2 mr-4">
              <ShoppingBagIcon className="size-4" />
              {/* {hasCartItems ? (
              <div className="absolute -top-1 right-0 h-4 w-4 rounded bg-brand-primary text-center text-[11px] font-medium text-white">
              {cart.totalQuantity}
              </div>
            ) : null} */}
              {hasCartItems ? (
                <div
                  className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded bg-brand-primary text-[11px] font-medium text-white"
                  style={{ lineHeight: '1rem' }}
                >
                  {cart.totalQuantity}
                </div>
              ) : null}
            </span>
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
              <DrawerHeader
                title={dictionary.cart}
                description="The cart is where you can see all the products you have added to your cart"
                className="mb-0 bg-white"
              >
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
                    {hasDiscount ? (
                      <div className="flex w-full items-center justify-between text-brand-mid-grey">
                        <Text size="sm" className="text-brand-mid-grey">
                          {dictionary.discount}
                        </Text>
                        <Text size="sm" className="font-medium">
                          {formattedDiscountedAmount}
                        </Text>
                      </div>
                    ) : null}
                    <div className="flex w-full items-center justify-between">
                      <Text size="sm" className="text-brand-mid-grey">
                        {dictionary.total_incl_vat}
                      </Text>
                      <Text size="sm" className="font-medium">
                        {formattedTotal || 0}
                      </Text>
                    </div>
                  </div>
                  {checkoutUrl && (
                    <Button
                      size="sm"
                      className="w-full"
                      isLoading={isPending}
                      onClick={() => {
                        startTransition(() => {
                          // Vercel Analtyics
                          trackEvent({ eventName: ANALTYICS_EVENT_NAME.BEGIN_CHECKOUT });
                          // GTM – Analytics
                          if (beginCheckoutTrackingData) {
                            clearEcommerceInDataLayer();
                            sendGTMEvent(beginCheckoutTrackingData);
                          }
                          trackGoToCheckout();
                          router.push(checkoutUrl);
                        });
                      }}
                    >
                      {dictionary.checkout}
                    </Button>
                  )}
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
      <SheetTrigger aria-label="Open cart" className="pr-4">
        <ShoppingBagIcon className="size-6" />
        {hasCartItems ? (
          <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded bg-brand-primary text-[11px] font-medium text-white">
            {cart.totalQuantity}
          </div>
        ) : null}
      </SheetTrigger>
      <SheetContent className="h-[calc(95dvh-32px)]" noPadding>
        <div
          className={cn(
            'flex h-full flex-col overflow-hidden'
            // hasCartItems ? 'bg-brand-sand' : 'bg-white'
          )}
        >
          {/* Header */}
          <SheetHeader title={dictionary.cart} className="mb-2 h-fit px-4">
            {freeShippingAmount && currencyCode && (
              <FreeShippingCountdown
                freeShippingAmount={freeShippingAmount}
                totalAmount={totalAmount || 0}
                dictionary={dictionary}
                currencyCode={currencyCode}
              />
            )}
          </SheetHeader>
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
                  <div className="flex h-0 flex-grow flex-col">
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
                          subtotal={line.cost.subtotalAmount}
                          totalAmount={line.cost.totalAmount}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="h-fit w-full">
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
                  className="bg-white px-4 py-3"
                />
                <div className="border-brand-border flex w-full flex-col items-center gap-y-4 border-t bg-white px-4 py-3">
                  <div className="flex w-full flex-col gap-y-2">
                    {hasDiscount ? (
                      <div className="flex w-full items-center justify-between text-brand-mid-grey">
                        <Text size="sm" className="text-brand-mid-grey">
                          {dictionary.discount}
                        </Text>
                        <Text size="sm" className="font-medium">
                          {formattedDiscountedAmount}
                        </Text>
                      </div>
                    ) : null}
                    <div className="flex w-full items-center justify-between">
                      <Text size="sm" className="text-brand-mid-grey">
                        {dictionary.total_incl_vat}
                      </Text>
                      <Text size="sm" className="font-medium">
                        {formattedTotal || 0}
                      </Text>
                    </div>
                  </div>
                  {checkoutUrl && (
                    <Button
                      size="sm"
                      className="w-full"
                      isLoading={isPending}
                      onClick={() => {
                        startTransition(() => {
                          // Vercel Analtyics
                          trackEvent({ eventName: ANALTYICS_EVENT_NAME.BEGIN_CHECKOUT });
                          // GTM – Analytics
                          beginCheckoutTrackingData && sendGTMEvent(beginCheckoutTrackingData);

                          trackGoToCheckout();
                          router.push(checkoutUrl);
                        });
                      }}
                    >
                      {dictionary.checkout}
                    </Button>
                  )}
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

function getCheckoutUrl({
  cartCheckoutUrl,
  isLoggedIn
}: {
  cartCheckoutUrl?: string;
  isLoggedIn: boolean;
}) {
  if (!cartCheckoutUrl) return null;

  const checkoutUrl = new URL(cartCheckoutUrl);

  if (isLoggedIn) {
    checkoutUrl.searchParams.append('logged_in', 'true');
  }

  return checkoutUrl.toString();
}
