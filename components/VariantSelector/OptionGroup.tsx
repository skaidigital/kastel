import { Dictionary } from '@/app/dictionaries';
import { Combination } from '@/components/VariantSelector';
import { ProductOption } from '@/components/pages/ProductPage/hooks';
import { SizeGuideProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { useQueryState } from 'nuqs';
import { Text } from '../base/Text';
import { SizeGuide } from './SizeGuide';

interface Props {
  option: ProductOption;
  combinations: Combination[];
  chooseSizeText: Dictionary['product_page']['choose_size'];
  sizeGuideText: Dictionary['product_page']['size_guide'];
  sizeGuide?: SizeGuideProps;
}

export function OptionGroup({
  option,
  combinations,
  sizeGuide,
  chooseSizeText,
  sizeGuideText
}: Props) {
  const [selectedOption, setSelectedOption] = useQueryState(option.slug);

  return (
    <dl className="" key={option.name}>
      <dt className="mb-3">
        <div className="flex items-center justify-between">
          <Text size="xs" className="text-brand-dark-grey">
            {option.name}: {selectedOption || chooseSizeText}
          </Text>
          {sizeGuide && sizeGuideText && (
            <SizeGuide sizeGuide={sizeGuide} sizeGuideText={sizeGuideText} />
          )}
        </div>
      </dt>
      <dd className="grid grid-cols-6 gap-1">
        {option &&
          option.values.map((value) => {
            const availableForSale = combinations.find(
              (combination) =>
                combination[option.name.toLowerCase()] === value.title &&
                combination.availableForSale
            );

            const isActive = selectedOption === value.title;

            return (
              <button
                disabled={!availableForSale}
                key={value.title}
                onClick={() => setSelectedOption(value.title)}
                className={cn(
                  'flex items-center justify-center rounded-[2px] border border-brand-light-grey py-2.5 text-sm',
                  isActive && 'bg-brand-primary text-white ',
                  !isActive &&
                    availableForSale &&
                    'bg-white hover:border-brand-primary hover:bg-brand-primary hover:text-white focus:border-brand-primary focus:bg-brand-primary focus:text-white',
                  !availableForSale &&
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-brand-mid-grey before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform'
                )}
              >
                {value.title}
              </button>
            );
          })}
      </dd>
    </dl>
  );
}
