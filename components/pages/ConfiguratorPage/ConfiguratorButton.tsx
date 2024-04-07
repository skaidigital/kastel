'use client';

import { Button } from '@/components/Button';
import { Text } from '@/components/base/Text';
import { addItems } from '@/components/shared/Cart/actions';
import { addVariantGid } from '@/lib/shopify/helpers';
import { cn, createUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { ActiveVariants } from '../BundlePage/BundleButtons';

interface Props {
  stepIndex: number;
  children: React.ReactNode;
}

export function ConfiguratorButton({ stepIndex, children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const stepSearchParams = new URLSearchParams(searchParams.toString());

  const currentStep = searchParams.get('step');
  const currentStepAsNumber = Number(currentStep);
  const isClientSide = typeof window !== 'undefined';

  if (!currentStep && isClientSide) {
    stepSearchParams.set('step', '1');
    const optionsUrl = createUrl(pathname, stepSearchParams);
    router.replace(optionsUrl);
    router.refresh();
  }

  function handleUrlUpdate() {
    const configuratorSearchParams = new URLSearchParams(searchParams.toString());
    configuratorSearchParams.set('step', String(stepIndex));
    const optionsUrl = createUrl(pathname, configuratorSearchParams);
    return optionsUrl;
  }

  const active = Number(currentStep) === stepIndex;

  return (
    <Link
      className={cn(
        'flex-1 whitespace-nowrap border-b border-brand-border px-4 py-5 text-center text-[14px] text-brand-mid-grey',
        active && 'text-underline border-b border-brand-dark-grey'
      )}
      href={handleUrlUpdate()}
    >
      {children}
    </Link>
  );
}

interface ConfiguratorColorSelectProps {
  title: string;
  color: string;
  slug: string;
  type: string;
  stepNumber: number;
  className?: string;
}

export function ConfiguratorColorSelect({
  title,
  color,
  slug,
  type,
  stepNumber,
  className
}: ConfiguratorColorSelectProps) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStep = searchParams.get(type);
  const isVariantsChoosen = searchParams.getAll('variants').length > 0;

  const isClientSide = typeof window !== 'undefined';

  if (!currentStep && isClientSide && stepNumber === 0) {
    const configuratorSearchParams = new URLSearchParams(searchParams.toString());
    configuratorSearchParams.set(type, slug);
    const optionsUrl = createUrl(pathname, configuratorSearchParams);

    router.push(optionsUrl);
    router.refresh();
  }

  function handleUrlUpdate() {
    const configuratorSearchParams = new URLSearchParams(searchParams.toString());
    configuratorSearchParams.set(type, slug);
    if (isVariantsChoosen) {
      configuratorSearchParams.delete('variants');
    }
    const optionsUrl = createUrl(pathname, configuratorSearchParams);
    return optionsUrl;
  }

  return (
    <Link
      className={cn(
        'border-1 mb-2 flex  items-center justify-between border lg:w-full',
        currentStep === slug && 'border-brand-dark-grey',
        className
      )}
      href={handleUrlUpdate()}
      scroll={false}
    >
      <Text size="eyebrow" className="ml-4">
        {title}
      </Text>
      <span className="h-12 w-16" style={{ backgroundColor: color }}></span>
    </Link>
  );
}

export function PreviousButton({ title }: { title: string }) {
  const [isPreviousePending, startPreviousePageTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStep = searchParams.get('step');

  function handlePreviousStep() {
    if (Number(currentStep) === 1) return;
    const prevStep = Number(currentStep) - 1;
    const configuratorSearchParams = new URLSearchParams(searchParams.toString());
    configuratorSearchParams.set('step', String(prevStep));
    const optionsUrl = createUrl(pathname, configuratorSearchParams);
    router.replace(optionsUrl, { scroll: false });
  }

  return (
    <Button
      variant="secondary"
      fullWidth
      disabled={Number(currentStep) < 2 || isPreviousePending}
      isLoading={isPreviousePending}
      onClick={() => {
        startPreviousePageTransition(() => {
          handlePreviousStep();
        });
      }}
    >
      {title}
    </Button>
  );
}

export function NextButton({ title }: { title: string }) {
  const [isNextPending, startNextPageTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStep = searchParams.get('step');

  function handleNextStep() {
    if (Number(currentStep) === 4) return;
    const nextStep = Number(currentStep) + 1;
    const configuratorSearchParams = new URLSearchParams(searchParams.toString());
    configuratorSearchParams.set('step', String(nextStep));
    const optionsUrl = createUrl(pathname, configuratorSearchParams);
    router.replace(optionsUrl, { scroll: false });
  }

  return (
    <Button
      variant="primary"
      fullWidth
      disabled={Number(currentStep) === 4 || isNextPending}
      isLoading={isNextPending}
      onClick={() => {
        startNextPageTransition(() => {
          handleNextStep();
        });
      }}
    >
      {title}
    </Button>
  );
}

interface AddBundleToCartButtonProps {
  // productType: Product['type'];
  // variants?: ProductVariant[];
  // productId?: string;
  // availableForSale: boolean;
  // price?: number;
  // bundleId: string;
  // items: string[];
  inStock?: boolean;
  text?: string;
}

export const AddBundleToCartButton = ({
  // productType,
  // variants,
  // productId,
  // availableForSale,
  // price,
  // items,
  inStock,
  text
}: AddBundleToCartButtonProps) => {
  //! Need to handle stock and avaibleForSale
  const [showCustomerNotification, setShowCustomerNotification] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const variants = searchParams.getAll('variants');

  if (!variants.length) {
    return null;
  }

  const availableForSale = true;

  const selected: ActiveVariants[] = variants.map((variant) => {
    const gid = addVariantGid(variant);
    return { gid, numberOfItems: 1 };
  });

  const title = 'Hei';
  const price = 100;

  const handleShowCustomerNotification = () => {
    setShowCustomerNotification(true);
  };

  return (
    <>
      {inStock || inStock === undefined ? (
        <Button
          fullWidth
          title={title}
          disabled={!availableForSale}
          isLoading={isPending}
          onClick={() => {
            // Safeguard in case someone messes with `disabled` in devtools.
            if (!availableForSale) return;
            startTransition(async () => {
              const error = await addItems(selected);
              if (error) {
                console.error(error);

                // Trigger the error boundary in the root error.js
                throw new Error(error.toString());
              }

              router.refresh();
              // set searchParams to success=true
              router.replace(`${pathname}?success=true`);
            });
          }}
          className={cn(
            '',
            'cursor-not-allowed opacity-60 hover:opacity-60' && !availableForSale,
            'cursor-not-allowed' && isPending
          )}
        >
          {text ? text : <>Legg i handlevogn</>}
        </Button>
      ) : (
        <div className="flex flex-col gap-y-4 p-6">
          <button
            className={`border-1 hover:brand-dark-grey overflow-hidden'bg-brand-mid-grey group relative flex items-center justify-center px-[28px] py-[14px] font-medium transition-all hover:bg-brand-mid-grey`}
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
