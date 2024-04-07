'use client';

import { Button } from '@/components/Button';
import { Text } from '@/components/base/Text';
import { addItems } from '@/components/shared/Cart/actions';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useState, useTransition } from 'react';
import { createActiveBundle } from './hooks';

interface Props {
  availableForSale: boolean;
  bundleId: string;
  inStock?: boolean;
  text: string;
  items: any;
  discountPercentage: number;
}

export interface ActiveVariants {
  gid: string;
  numberOfItems: number;
  title?: string;
}

export const AddBundleToCartButton = ({
  availableForSale,
  bundleId,
  inStock,
  text,
  items,
  discountPercentage
}: Props) => {
  //! Need to handle stock and avaibleForSale
  const [showCustomerNotification, setShowCustomerNotification] = useState(false);
  const [urlVariants] = useQueryState('variants', parseAsArrayOf(parseAsString));

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const activeBundle = createActiveBundle(items, urlVariants);

  if (!activeBundle || activeBundle.length === 0) {
    availableForSale = false;
  }

  const validBundleLength = activeBundle.length === items.length;

  const totalPrice = activeBundle.reduce((acc, item) => acc + item.price, 0);
  const totalPriceWithDiscount = totalPrice - totalPrice * (discountPercentage / 100);

  // const title = 'Add bundle to cart';
  const selectedVariantId = bundleId;
  const price = totalPriceWithDiscount;

  const handleShowCustomerNotification = () => {
    setShowCustomerNotification(true);
  };

  return (
    <>
      {inStock || inStock === undefined ? (
        <Button
          fullWidth
          title={text}
          disabled={!availableForSale || !urlVariants || !validBundleLength}
          isLoading={isPending}
          onClick={() => {
            // Safeguard in case someone messes with `disabled` in devtools.
            if (!availableForSale || !validBundleLength) return;
            startTransition(async () => {
              const error = await addItems(activeBundle, bundleId, String(discountPercentage));
              if (error) {
                console.error(error);

                // Trigger the error boundary in the root error.js
                throw new Error(error.toString());
              }

              router.refresh();
            });
          }}
          className={cn(
            '',
            'cursor-not-allowed opacity-60 hover:opacity-60' &&
              (!availableForSale || !selectedVariantId),
            'cursor-not-allowed' && isPending
          )}
        >
          {text ? (
            text
          ) : (
            <>
              Legg i handlevogn
              <span className="mx-4">·</span>
              {price} kr
            </>
          )}
        </Button>
      ) : (
        <div className="flex flex-col gap-y-4">
          <button
            className={`border-1 hover:brand-dark-grey group relative flex items-center justify-center overflow-hidden border-brand-border bg-white px-[28px] py-[14px] font-medium transition-all`}
            onClick={handleShowCustomerNotification}
          >
            <Text size="eyebrow" className="mr-3 flex items-center">
              Utsolgt <span className="ml-1">{lock}</span>
            </Text>
            <Text size="eyebrow" className="underline">
              Send mail når den er tilbake
            </Text>
          </button>
          {showCustomerNotification && <CustomerNotificationInput />}
        </div>
      )}
    </>
  );
};

const CustomerNotificationInput = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSendNotification = () => {
    setIsSent(true);
  };

  return (
    <div className="border-1 my-4 flex flex-col border-brand-border px-4 py-6">
      <label htmlFor="input" className="flex flex-col gap-y-1">
        {!isSent && (
          <>
            <span>Hva er din e-postadresse?*</span>
            <input
              type="text"
              id="input"
              className="border-1 mb-6 appearance-none rounded-[0px] border-brand-border p-2"
            />
          </>
        )}
      </label>
      {!isSent && (
        <Button type="button" onClick={handleSendNotification}>
          Gi meg beskjed
        </Button>
      )}
      {isSent && (
        <span className="text-paragraph-small text-paragraph-mid-grey flex justify-center">
          Du vil få beskjed med én gang varen er tilbake på lager!
        </span>
      )}
    </div>
  );
};

const lock = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-lock"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
