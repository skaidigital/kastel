import { Combination } from '@/components/VariantSelector';
import { ProductOption } from '@/components/pages/ProductPage/hooks';
import { useQueryState } from 'nuqs';

interface Props {
  option: ProductOption;
  options: ProductOption[];
  combinations: Combination[];
  showAllSizesText: string;
  chooseSizeText: string;
  closeText: string;
  reccommendedText: string;
}

// TODO refactor to use just useQueryState if possible (logic inside the map)
export function SizeSelector({
  option,
  options,
  combinations,
  showAllSizesText,
  chooseSizeText,
  closeText,
  reccommendedText
}: Props) {
  const optionType = option.type;
  const [selectedSize, setSelectedSize] = useQueryState(option.name.toLowerCase());
  if (optionType !== 'size') {
    return null;
  }

  return (
    <dl className="flex flex-col gap-y-3" key={option.name}>
      <dd className="flex flex-wrap gap-1">
        {option &&
          option.values.map((value) => {
            return (
              <button
                key={value.title}
                onClick={() => setSelectedSize(value.title)}
                className={`rounded-sm border border-brand-light-grey px-6 py-[10px] ${selectedSize === value.title ? 'bg-brand-primary text-white' : ''}`}
              >
                {value.title}
              </button>
            );
          })}
      </dd>
    </dl>
  );

  // return (
  //   <dl className="flex flex-col gap-y-3" key={option.name}>
  //     <dt className="text-eyebrow uppercase">
  //       {optionName}
  //       {selectedSize && `: ${selectedSize}`}
  //     </dt>
  //     <dd className="flex flex-col gap-y-2">
  //       {options &&
  //         options?.map((value) => {
  //           const featuredOptionInFeaturedValues =
  //             value && featuredOptions?.includes(value) ? true : false;
  //           const optionNameLowerCase = option.name.toLowerCase();

  //           const optionSearchParams = new URLSearchParams(searchParams.toString());

  //           optionSearchParams.set(optionNameLowerCase, value);

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

  //           const isActive = selectedSize === value;

  //           return (
  //             <SizeOptionButton
  //               key={value}
  //               value={value}
  //               optionName={option.name}
  //               isAvailableForSale={!!isAvailableForSale}
  //               isFeatured={featuredOptionInFeaturedValues}
  //               reccommendedText={reccommendedText}
  //               isActive={isActive}
  //               setSelectedSize={setSelectedSize}
  //             />
  //           );
  //         })}
  //     </dd>
  //   </dl>
  // );
}
