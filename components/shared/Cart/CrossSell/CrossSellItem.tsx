'use client';

import { formatPrice } from '@/app/[market]/[lang]/(site)/shopify/utils';
import { Dictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { Combination } from '@/components/VariantSelector';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/form/RadixSelect';
import { SanityImage } from '@/components/sanity/SanityImage';
import { CrossSellProduct } from '@/components/shared/Cart/CrossSell/hooks';
import { addItem } from '@/components/shared/Cart/actions';
import { cn } from '@/lib/utils';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Props {
  product: CrossSellProduct;
  currencyCode: string;
  dictionary: Dictionary['cart_drawer']['cross_sell'];
  className?: string;
}

export function CrossSellItem({ product, currencyCode, className, dictionary }: Props) {
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
    availableForSale: true,
    ...variant.selectedOptions?.reduce(
      (accumulator, option) =>
        option ? { ...accumulator, [option.name.toLowerCase()]: option.value } : accumulator,
      {}
    )
  }));

  const combinationStrings = combinations?.map((combination) =>
    Object.entries(combination)
      .filter(([key]) => key !== 'id' && key !== 'availableForSale')
      .map(([key, value]) => value)
      .join('/')
  );

  function handleAddToCart() {
    startTransition(async () => {
      if (!activeVariant) return;
      const error = await addItem(activeVariant.id);
      if (error) {
        console.error(error);

        throw new Error(error.toString());
      }
      router.refresh();
    });
  }

  return (
    <div className={cn('flex w-full rounded-project', className)}>
      <div className="w-40">
        <AspectRatio ratio={3 / 4} className="bg-brand-border relative rounded-project">
          {image && <SanityImage fill image={image} className="rounded-project" />}
        </AspectRatio>
      </div>
      <div className="relative flex w-full flex-col justify-between pl-5">
        <div className="flex flex-col gap-y-3">
          <Heading as="h3" size="xs">
            {title}
          </Heading>
          {activeVariant &&
            (activeVariant.discountedPrice ? (
              <div className="flex gap-x-2">
                <Text size="sm">
                  {formatPrice({ amount: String(activeVariant.discountedPrice), currencyCode })}
                </Text>
                <Text size="sm" className="line-through">
                  {formatPrice({ amount: String(activeVariant.price), currencyCode })}
                </Text>
              </div>
            ) : (
              <Text size="sm">
                {formatPrice({ amount: String(activeVariant.price), currencyCode })}
              </Text>
            ))}
          {activeVariant && activeVariant.selectedOptions && (
            <div className="flex flex-col gap-y-0">
              {activeVariant.selectedOptions.map((option) => (
                <Text size="sm" key={option?.value}>
                  {option?.value}
                </Text>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-x-3">
          {isVariableProduct && combinationStrings && (
            <Select
              onValueChange={(e) => {
                setSelectedCombination(e);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={dictionary.choose_option} />
              </SelectTrigger>
              <SelectContent>
                {combinationStrings.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="outline"
            onClick={handleAddToCart}
            disabled={!activeVariant}
            size="icon"
            isLoading={isPending}
            fullWidth={isSimpleProduct}
            className={cn(
              'border-brand-border flex items-center justify-center rounded-project border text-black',
              isSimpleProduct && 'gap-x-2',
              isVariableProduct && 'h-9 w-12'
            )}
          >
            {isSimpleProduct && dictionary.add_to_cart}
            <ShoppingBagIcon className="h-4 w-4 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
}
