'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { Dictionary } from '@/app/dictionaries';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Combination } from '@/components/VariantSelector';
import { SanityImage } from '@/components/sanity/SanityImage';
import { CrossSellProduct } from '@/components/shared/Cart/CrossSell/hooks';
import { addItem } from '@/components/shared/Cart/actions';
import {
  ANALTYICS_EVENT_NAME,
  META_ANALYTICS_EVENT_NAME,
  SNAPCHAT_ANALYTICS_EVENT_NAME
} from '@/data/constants';
import { trackEvent } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { sendGTMEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Props {
  product: CrossSellProduct;
  inventory: ProductInventoryResponse;
  currencyCode: string;
  dictionary: Dictionary['cart_drawer']['cross_sell'];
  className?: string;
}

export function CrossSellItemLayout({
  product,
  inventory,
  currencyCode,
  className,
  dictionary
}: Props) {
  const { title, image } = product;
  const [isPending, startTransition] = useTransition();
  const [selectedCombination, setSelectedCombination] = useState<string | undefined>();

  const router = useRouter();

  const isSimpleProduct = product.variants.length === 1;
  const isVariableProduct = product.variants.length > 1;

  const activeVariant = isSimpleProduct
    ? product.variants[0]
    : product.variants.find((variant) => {
        const combination =
          variant.selectedOptions?.reduce(
            (accumulator, option) =>
              option ? { ...accumulator, [option.name.toLowerCase()]: option.value } : accumulator,
            {}
          ) || {};
        return (
          Object.entries(combination)
            .filter(([key]) => key !== 'id' && key !== 'availableForSale')
            .map(([key, value]) => value)
            .join('/') === selectedCombination
        );
      });

  const combinations: Combination[] = product.variants.map((variant) => ({
    id: variant.id,
    availableForSale:
      inventory.variants.edges.find((edge) => edge.node.id === variant.id)?.node
        ?.availableForSale || false,
    ...variant.selectedOptions
      ?.filter((option): option is { value: string; name: string } => option !== undefined)
      .reduce(
        (accumulator, option) => ({
          ...accumulator,
          ...(option && option.name && { [option.name.toLowerCase()]: option.value })
        }),
        {} as Record<string, string>
      )
  }));

  const combinationStrings = combinations?.map((combination) => ({
    label: Object.entries(combination)
      .filter(([key]) => key !== 'id' && key !== 'availableForSale')
      .map(([key, value]) => value)
      .join('/'),
    id: combination.id,
    availableForSale: combination.availableForSale
  }));

  function handleAddToCart() {
    if (!activeVariant) return;
    if (outOfStock({ productId: activeVariant.id, combinations })) return;

    startTransition(async () => {
      const response = await addItem(activeVariant.id);

      if (response.success) {
        trackEvent({
          eventName: 'add_to_cart'
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

        // throw new Error(response.toString());
      }
      router.refresh();
    });
  }

  return (
    <div className={cn('flex gap-x-3 lg:p-3', className)}>
      <div className="w-20">
        <div className="aspect-h-4 aspect-w-3 relative">
          <SanityImage image={image} fill className="absolute object-cover" />
        </div>
      </div>
      <div className="flex w-full flex-col justify-between ">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-balance text-sm font-medium">{title}</h4>
          {activeVariant &&
            (activeVariant.discountedPrice ? (
              <div className="mb-1 flex gap-x-2 text-xs">
                <span>
                  {formatPrice({ amount: String(activeVariant.discountedPrice), currencyCode })}
                </span>
                <span className="text-brand-mid-grey line-through">
                  {formatPrice({ amount: String(activeVariant.price), currencyCode })}
                </span>
              </div>
            ) : (
              <span className="text-xs">
                {formatPrice({ amount: String(activeVariant.price), currencyCode })}
              </span>
            ))}
        </div>
        <div className="flex gap-x-1 ">
          {isVariableProduct && combinationStrings && (
            <Select
              onValueChange={(e) => {
                setSelectedCombination(e);
              }}
            >
              <SelectTrigger className="w-full grow text-xs text-brand-mid-grey placeholder:text-brand-mid-grey">
                <SelectValue placeholder={dictionary.choose_option} />
              </SelectTrigger>
              <SelectContent>
                {combinationStrings.map((option) => {
                  const notAvailable = !option.availableForSale;
                  return (
                    <SelectItem key={option.id} value={option.id} disabled={notAvailable}>
                      {option.label}
                      {notAvailable && <Badge size="xs">{dictionary.out_of_stock}</Badge>}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={!activeVariant || outOfStock({ productId: activeVariant?.id, combinations })}
            size="icon"
            isLoading={isPending}
            className={cn(
              'h-full w-fit shrink-0 px-3 py-1.5 text-xs',
              isSimpleProduct && 'h-9 w-full gap-x-2',
              isVariableProduct && 'h-9 w-12'
            )}
          >
            {isSimpleProduct && dictionary.add_to_cart}
            <ShoppingBagIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface StockPros {
  productId?: string;
  combinations: Combination[];
}

function outOfStock({ productId, combinations }: StockPros) {
  if (!productId) return true;

  const stock = combinations.find((combination) => combination.id === productId);

  return !stock?.availableForSale;
}
