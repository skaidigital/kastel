'use server';

import { getDictionary } from '@/app/dictionaries';
import {
  AddBundleToCartButton,
  ConfiguratorButton,
  NextButton,
  PreviousButton
} from '@/components/pages/ConfiguratorPage/ConfiguratorButton';
import {
  ConfiguratorStep,
  ConfiguratorSuccessStep,
  LastConfiguratorStep
} from '@/components/pages/ConfiguratorPage/ConfiguratorStep';
import { addVariantGid } from '@/lib/shopify/helpers';
import { isProductVariantInStock } from '@/lib/shopify/queries';
import { Suspense } from 'react';
import { GallerySection } from './Gallery';

interface Props {
  data: any;
  params?: { [key: string]: string | string[] | undefined };
}

export async function Configurator({ data, params }: Props) {
  const { configurationSteps } = data || [];
  const currentStep = params?.step;

  if (!configurationSteps) return null;

  const { configurator, product_page } = await getDictionary();

  const isVariantsChoosen = params?.variants?.length === 3;
  const variants = params?.variants || [];
  const success = params?.success === 'true' || false;
  let isItemsInStock = false;

  // console.log('params', params);
  if (isVariantsChoosen && Array.isArray(variants)) {
    const inStockItems = await Promise.all(
      variants.map(async (id: string) => {
        const variantId = addVariantGid(id);

        const isInstock = await isProductVariantInStock(variantId);
        return isInstock;
      })
    );
    isItemsInStock = inStockItems.every((item) => item.inStock === true);
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="flex w-full justify-between overflow-auto bg-white lg:hidden lg:max-w-[450px]">
        {configurationSteps &&
          configurationSteps.map((step: any, index: number) => {
            return (
              <ConfiguratorButton key={`${step.title}index`} stepIndex={index + 1}>
                {step.title}
              </ConfiguratorButton>
            );
          })}
        <ConfiguratorButton stepIndex={configurationSteps.length + 1}>
          {configurator.summary}
        </ConfiguratorButton>
      </div>
      <div className="aspect-h-4 aspect-w-3 w-full border-r border-brand-border bg-brand-light-grey lg:grow">
        <GallerySection params={params} />
        {/* <div className="lg:hidden">
          <ConfiguratorImagesMobile params={params} />
        </div>
        <div className="hidden flex-1 grid-cols-1 gap-3 self-start lg:grid xl:grid-cols-2">
          <Suspense fallback={<ImageSkeleton className="h-auto w-full" sizes="1000px" />}>
            <ConfiguratorImages params={params} />
          </Suspense>
        </div> */}
      </div>
      <div className="sticky top-0 w-full lg:h-[100vh] lg:max-w-[450px]">
        {success && <ConfiguratorSuccessStep />}
        {!success && (
          <div className=" flex flex-col justify-between lg:h-full">
            <div>
              <div className="hidden w-full lg:flex">
                {configurationSteps &&
                  configurationSteps.map((step: any, index: number) => {
                    return (
                      <ConfiguratorButton key={`${step.stepTitle}index`} stepIndex={index + 1}>
                        {step.title}
                      </ConfiguratorButton>
                    );
                  })}

                <ConfiguratorButton stepIndex={configurationSteps.length + 1}>
                  {configurator.summary}
                </ConfiguratorButton>
              </div>
              <div className="px-6">
                {currentStep && currentStep < configurationSteps.length + 1 && (
                  <Suspense>
                    <ConfiguratorStep step={currentStep} />
                  </Suspense>
                )}
                {currentStep && currentStep >= configurationSteps.length + 1 && (
                  <Suspense>
                    <LastConfiguratorStep params={params} title={configurator.size_picker} />
                  </Suspense>
                )}
              </div>
            </div>
            <div className=" sticky bottom-0 w-full bg-white lg:max-w-[450px]">
              {isVariantsChoosen && isItemsInStock && (
                <div className="p-6">
                  <AddBundleToCartButton text={product_page.add_to_cart} />
                </div>
              )}
              <div className="flex w-full border-t border-brand-border px-6 py-6">
                <div className="flex w-full space-x-2">
                  {currentStep && Number(currentStep) > 1 && (
                    <PreviousButton title={configurator.back} />
                  )}
                  <NextButton title={configurator.next} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
