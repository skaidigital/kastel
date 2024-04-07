'use client';

import { cn, createUrl } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface BundleData {
  numberOfItems: number;
  product: {
    title: string;
    type: string;
    slug: string;
    options: Array<{
      title: string;
      slug: string;
      options: string[];
    }>;
    variants: {
      _id: string;
      sku: string;
      barcode: string;
      option1: string;
      option2?: string;
      option3?: string;
      price: number;
      gid: string;
    }[];
  };
}

interface Props {
  items: BundleData[];
}

export function BundleSelector({ items }: Props) {
  // console.log({ items });

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (!items || !items.length) return null;

  const availableOptions = items
    .map((item) => item.product.options.map((option) => option.slug))
    .flat();

  //   const activeOptions = Array.from(searchParams.entries()).map(([key, value]) => key);
  // console.log({ searchParams });

  console.log({ availableOptions });
  //   console.log({ activeOptions });

  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.product.slug} className="mb-6">
            <h1>
              (color) {item.product.title} x {item.numberOfItems}
            </h1>
            <div>
              {item.product.options &&
                item.product.options.map((option) => {
                  const optionSet = searchParams.get(option.slug);
                  console.log({ optionSet });

                  return (
                    <div key={option.title}>
                      <dt className="mb-4 text-eyebrow uppercase">Choose: {option.title}</dt>
                      <dd className="flex flex-wrap gap-3">
                        {option.options.map((optionVariation) => {
                          const isActive = optionSet === optionVariation;
                          const isAvailableForSale = true;
                          const isColor = false;
                          const optionSearchParams = new URLSearchParams(searchParams.toString());
                          optionSearchParams.set(option.slug, optionVariation);
                          const optionUrl = createUrl(pathname, optionSearchParams);
                          return (
                            <button
                              key={optionVariation}
                              className={cn(
                                'flex min-w-[48px] items-center justify-center rounded-project border border-brand-border px-2 py-1 text-eyebrow uppercase',
                                isActive && 'cursor-default border-brand-dark-grey',
                                !isAvailableForSale &&
                                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-brand-mid-grey before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform',
                                isColor && 'h-6'
                              )}
                              onClick={() => {
                                router.replace(optionUrl, { scroll: false });
                              }}
                            >
                              {optionVariation}
                            </button>
                          );
                        })}
                      </dd>
                    </div>
                  );
                })}
            </div>
            {/* <div>
              {item.product.variants.map((variant) => {
                return (

                  <div key={variant.sku}>
                    <p>{variant.option1}</p>
                  </div>
                );
              })}
            </div> */}
          </div>
        );
      })}
    </div>
  );

  //   return items.map((item) => <p>Petter</p>);

  //   const optionName = option.name;
  //   const optionType = option.type;
  //   const isColor = optionType === 'color';

  //   const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const pathname = usePathname();

  //   const selectedOption = searchParams.get(optionName.toLowerCase());

  //   return (
  //     <dl key={option.name}>
  //       <dt className="mb-4 text-eyebrow uppercase">
  //         {option.name}
  //         {selectedOption && `: ${selectedOption}`}
  //       </dt>
  //       <dd className="flex flex-wrap gap-3">
  //         {option.values.map((value) => {
  //           const optionNameLowerCase = option.name.toLowerCase();

  //           const optionSearchParams = new URLSearchParams(searchParams.toString());

  //           optionSearchParams.set(optionNameLowerCase, value.title);
  //           const optionUrl = createUrl(pathname, optionSearchParams);

  //           const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
  //             options.find(
  //               (option) =>
  //                 option.name.toLowerCase() === key && option.values.some((v) => v.title === value)
  //             )
  //           );

  //           const isAvailableForSale = combinations.find((combination) =>
  //             filtered.every(
  //               ([key, value]) => combination[key] === value && combination.availableForSale
  //             )
  //           );

  //           const isActive = searchParams.get(optionNameLowerCase) === value.title;

  //           return (
  //             <button
  //               key={value.title}
  //               aria-disabled={!isAvailableForSale}
  //               disabled={!isAvailableForSale}
  //               onClick={() => {
  //                 router.replace(optionUrl, { scroll: false });
  //               }}
  //               title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
  //               //   TODO figure out why TS does not figure this out
  //               // TODO add back color
  //               // style={isColor ? { backgroundColor: value.color } : undefined}
  //               className={cn(
  //                 'flex min-w-[48px] items-center justify-center rounded-project border border-brand-border px-2 py-1 text-eyebrow uppercase',
  //                 isActive && 'cursor-default border-brand-dark-grey',
  //                 !isAvailableForSale &&
  //                   'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-brand-mid-grey before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform',
  //                 isColor && 'h-6'
  //               )}
  //             >
  //               {!isColor && value.title}
  //             </button>
  //           );
  //         })}
  //       </dd>
  //     </dl>
  //   );
}
