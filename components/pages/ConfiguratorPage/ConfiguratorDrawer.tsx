'use client';

import { Button } from '@/components/Button';
import { Drawer } from '@/components/Drawer';
import { Text, textProps } from '@/components/base/Text';
import { cn, createUrl } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  step?: number;
  option?: any;
  title: string;
  inStockItems?: {
    inStock: boolean;
    quantity: number;
    variantId: string;
  }[];
}

export function ConfiguratorDrawer({ step, option, title, inStockItems }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const stepSearchParams = new URLSearchParams(searchParams.toString());

  const urlVariants = stepSearchParams.getAll('variants');

  const existingVariantIndex = urlVariants.findIndex((id) =>
    option.variants.some((variant: any) => variant.id === id)
  );

  const activeId = urlVariants[existingVariantIndex];
  const activeVariant = option.variants.find((variant: any) => variant.id === activeId);

  function handleUpdateVariants(variantId: string) {
    const variantsToUpdate = urlVariants;

    // Replace the existing variant with the new one if it's already in the URL
    if (existingVariantIndex !== -1) {
      variantsToUpdate[existingVariantIndex] = variantId;
    } else {
      // Add the new variant if it wasn't already selected
      variantsToUpdate.push(variantId);
    }

    // Clear and re-add updated variants to the search params
    stepSearchParams.delete('variants');
    variantsToUpdate.forEach((variant) => stepSearchParams.append('variants', variant));

    // Construct the new URL and navigate
    const newUrl = createUrl(pathname, stepSearchParams);

    return newUrl;
  }

  return (
    <Drawer>
      <Drawer.Trigger>
        <button>
          <Text size="sm" className="mr-2 text-gray-500">
            {activeVariant ? activeVariant.option1 : title}
          </Text>
        </button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>{title}</Drawer.Header>
        <div className="flex flex-1 flex-col gap-y-3 p-5">
          {option.variants.map((variant: any) => {
            const isActive = activeVariant?.id === variant.id;
            const inStockItem = inStockItems?.find((item) => item.variantId === variant.gid);
            const isAvailableForSale = inStockItem?.inStock || false;

            return (
              <button
                key={variant.id}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                onClick={() => {
                  const newUrl = handleUpdateVariants(variant.id);
                  router.replace(newUrl, { scroll: false });
                }}
                title={`${option.option1}`}
                className={cn(
                  'transition-brand flex items-center justify-between gap-y-1 rounded-project border border-brand-border px-3 py-2',
                  isActive && 'border-brand-dark-grey',
                  isAvailableForSale && 'hover:border-brand-dark-grey focus:border-brand-dark-grey',
                  !isAvailableForSale &&
                    'relative z-10 overflow-hidden bg-neutral-100 !text-eyebrow text-brand-mid-grey before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform',
                  textProps({ size: 'eyebrow' })
                )}
              >
                {variant.option1}
              </button>
            );
          })}
        </div>
        <Drawer.Close>
          <Button>Close</Button>
        </Drawer.Close>
      </Drawer.Content>
    </Drawer>
  );
}
