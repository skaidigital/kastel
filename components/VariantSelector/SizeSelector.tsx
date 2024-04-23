import { Dictionary } from '@/app/dictionaries';
import { ProductOption } from '@/components/pages/ProductPage/hooks';
import { useQueryState } from 'nuqs';
import { Text } from '../base/Text';

interface Props {
  option: ProductOption;
  chooseSizeText: Dictionary['product_page']['choose_size'];
}

// TODO refactor to use just useQueryState if possible (logic inside the map)
export function SizeSelector({ option, chooseSizeText }: Props) {
  const optionType = option.type;
  const [selectedSize, setSelectedSize] = useQueryState(option.name.toLowerCase());
  if (optionType !== 'size') {
    return null;
  }

  return (
    <dl className="" key={option.name}>
      <dt className="mb-3">
        <div className="flex justify-between">
          <Text as="p" size="xs" className="text-brand-dark-grey">
            {option.name}: {selectedSize || chooseSizeText}
          </Text>
          <Text as="p" size="xs" className="text-brand-dark-grey underline">
            Size Guide
          </Text>
        </div>
      </dt>
      <dd className="grid grid-cols-6 gap-1">
        {option &&
          option.values.map((value) => {
            return (
              <button
                key={value.title}
                onClick={() => setSelectedSize(value.title)}
                className={`flex items-center justify-center rounded-sm border border-brand-light-grey py-[10px] ${selectedSize === value.title ? 'bg-brand-primary text-white' : ''}`}
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
