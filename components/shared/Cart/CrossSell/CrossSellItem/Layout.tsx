'use client';

import { formatPrice } from '@/app/api/shopify/utils';
import { Dictionary } from '@/app/dictionaries';
import { Button } from '@/components/Button';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { Combination } from '@/components/VariantSelector';
import { SanityImage } from '@/components/sanity/SanityImage';
import { CrossSellProduct } from '@/components/shared/Cart/CrossSell/hooks';
import { addItem } from '@/components/shared/Cart/actions';
import { cn } from '@/lib/utils';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Props {
  product: CrossSellProduct;
  inventory: ProductInventoryResponse;
  currencyCode: string;
  dictionary: Dictionary['cart_drawer']['cross_sell'];
  className?: string;
}

// TODO grey out if it's not in stock
// TODO show price
// TODO show selected variant's options
// TODO test with simple product
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
    <div className={cn('flex gap-x-3 lg:p-3', className)}>
      <div className="w-20">
        <div className="aspect-h-4 aspect-w-3 relative rounded-[2px] border border-brand-light-grey">
          <SanityImage image={image} fill className="absolute object-cover" />
        </div>
      </div>
      <div className="flex w-full flex-col justify-between ">
        <div className="flex flex-col gap-y-2">
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
              <span>{formatPrice({ amount: String(activeVariant.price), currencyCode })}</span>
            ))}
        </div>
        <div className="flex gap-x-1 ">
          {/* {isVariableProduct && combinationStrings && (
            <Select
              onValueChange={(e) => {
                setSelectedCombination(e);
              }}
            >
              <SelectTrigger className="w-full grow text-xs text-brand-mid-grey placeholder:text-brand-mid-grey">
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
          )} */}
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={!activeVariant}
            size="icon"
            isLoading={isPending}
            className={cn(
              'h-full w-fit shrink-0 px-3 py-1.5',
              isSimpleProduct && 'w-full gap-x-2',
              isVariableProduct && 'h-9 w-12'
            )}
          >
            {isSimpleProduct && dictionary.add_to_cart}
            <ShoppingBagIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    // <div className={cn('flex w-full rounded-project', className)}>
    //   <div className="w-40">
    //     <AspectRatio ratio={3 / 4} className="bg-brand-border relative rounded-project">
    //       {image && <SanityImage fill image={image} className="rounded-project" />}
    //     </AspectRatio>
    //   </div>
    //   <div className="relative flex w-full flex-col justify-between pl-5">
    //     <div className="flex flex-col gap-y-3">
    //       <Heading as="h3" size="xs">
    //         {title}
    //       </Heading>
    //       {activeVariant &&
    //         (activeVariant.discountedPrice ? (
    //           <div className="flex gap-x-2">
    //             <Text size="sm">
    //               {formatPrice({ amount: String(activeVariant.discountedPrice), currencyCode })}
    //             </Text>
    //             <Text size="sm" className="line-through">
    //               {formatPrice({ amount: String(activeVariant.price), currencyCode })}
    //             </Text>
    //           </div>
    //         ) : (
    //           <Text size="sm">
    //             {formatPrice({ amount: String(activeVariant.price), currencyCode })}
    //           </Text>
    //         ))}
    //       {activeVariant && activeVariant.selectedOptions && (
    //         <div className="flex flex-col gap-y-0">
    //           {activeVariant.selectedOptions.map((option) => (
    //             <Text size="sm" key={option?.value}>
    //               {option?.value}
    //             </Text>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //     <div className="flex gap-x-3">
    //       {isVariableProduct && combinationStrings && (
    //         <Select
    //           onValueChange={(e) => {
    //             setSelectedCombination(e);
    //           }}
    //         >
    //           <SelectTrigger>
    //             <SelectValue placeholder={dictionary.choose_option} />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {combinationStrings.map((option) => (
    //               <SelectItem key={option} value={option}>
    //                 {option}
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       )}
    //       <Button
    //         variant="outline"
    //         onClick={handleAddToCart}
    //         disabled={!activeVariant}
    //         size="icon"
    //         isLoading={isPending}
    //         className={cn(
    //           'border-brand-border flex items-center justify-center rounded-project border text-black',
    //           isSimpleProduct && 'w-full gap-x-2',
    //           isVariableProduct && 'h-9 w-12'
    //         )}
    //       >
    //         {isSimpleProduct && dictionary.add_to_cart}
    //         <ShoppingBagIcon className="h-4 w-4 text-black" />
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
