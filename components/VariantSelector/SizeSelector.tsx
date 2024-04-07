import { Button } from '@/components/Button';
import { Drawer } from '@/components/Drawer';
import { Combination } from '@/components/VariantSelector';
import { SizeOptionButton } from '@/components/VariantSelector/SizeOptionButton';
import { Text } from '@/components/base/Text';
import { ProductOption } from '@/components/pages/ProductPage/hooks';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';

interface Props {
  option: ProductOption;
  options: ProductOption[];
  featuredOptions: string[];
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
  featuredOptions,
  combinations,
  showAllSizesText,
  chooseSizeText,
  closeText,
  reccommendedText
}: Props) {
  const searchParams = useSearchParams();

  const optionName = option.name;
  const optionType = option.type;

  const [selectedSize, setSelectedSize] = useQueryState(option.name.toLowerCase());

  if (optionType !== 'size') {
    return null;
  }

  const selectedSizeNotInFeaturedValues = selectedSize && !featuredOptions?.includes(selectedSize);

  const featuredValues = selectedSizeNotInFeaturedValues
    ? [selectedSize, ...(featuredOptions || [])]
    : featuredOptions;

  return (
    <dl className="flex flex-col gap-y-3" key={option.name}>
      <dt className="text-eyebrow uppercase">
        {optionName}
        {selectedSize && `: ${selectedSize}`}
      </dt>
      <dd className="flex flex-col gap-y-2">
        {featuredValues?.map((value) => {
          const featuredOptionInFeaturedValues =
            value && featuredOptions?.includes(value) ? true : false;
          const optionNameLowerCase = option.name.toLowerCase();

          const optionSearchParams = new URLSearchParams(searchParams.toString());

          optionSearchParams.set(optionNameLowerCase, value);

          const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
            options.find(
              (option) =>
                option.name.toLowerCase() === key && option.values.some((v) => v.title === value)
            )
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) => combination[key] === value && combination.availableForSale
            )
          );

          const isActive = selectedSize === value;

          return (
            <SizeOptionButton
              key={value}
              value={value}
              optionName={option.name}
              isAvailableForSale={!!isAvailableForSale}
              isFeatured={featuredOptionInFeaturedValues}
              reccommendedText={reccommendedText}
              isActive={isActive}
              setSelectedSize={setSelectedSize}
            />
          );
        })}
        <Drawer>
          <Drawer.Trigger>
            <button>
              <Text size="sm" className="text-left">
                {showAllSizesText}
              </Text>
            </button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>{selectedSize ? selectedSize : chooseSizeText}</Drawer.Header>
            <div className="flex flex-1 flex-col gap-y-3 p-5">
              {option.values.map((value) => {
                const optionNameLowerCase = option.name.toLowerCase();
                const optionSearchParams = new URLSearchParams(searchParams.toString());

                optionSearchParams.set(optionNameLowerCase, value.title);

                const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
                  options.find(
                    (option) =>
                      option.name.toLowerCase() === key &&
                      option.values.some((v) => v.title === value)
                  )
                );
                const isAvailableForSale = combinations.find((combination) =>
                  filtered.every(
                    ([key, value]) => combination[key] === value && combination.availableForSale
                  )
                );

                const isActive = selectedSize === value.title;

                const isFeatured = featuredOptions?.includes(value.title);

                return (
                  <SizeOptionButton
                    key={value.title}
                    value={value.title}
                    optionName={option.name}
                    isAvailableForSale={!!isAvailableForSale}
                    isFeatured={isFeatured}
                    reccommendedText={reccommendedText}
                    isActive={isActive}
                    setSelectedSize={setSelectedSize}
                  />
                );
              })}
            </div>
            <Drawer.Close>
              <Button>{closeText}</Button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer>
      </dd>
    </dl>
  );
}
