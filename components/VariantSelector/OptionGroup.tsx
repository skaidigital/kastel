import { Dictionary } from '@/app/dictionaries';
import { ProductOption } from '@/components/pages/ProductPage/hooks';
import { SizeGuideProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import { useQueryState } from 'nuqs';
import { Text } from '../base/Text';
import { SizeGuide } from './SizeGuide';

interface Props {
  option: ProductOption;
  chooseSizeText: Dictionary['product_page']['choose_size'];
  sizeGuideText: Dictionary['product_page']['size_guide'];
  sizeGuide?: SizeGuideProps;
}

// TODO refactor to use just useQueryState if possible (logic inside the map)
export function OptionGroup({ option, sizeGuide, chooseSizeText, sizeGuideText }: Props) {
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
          {sizeGuide && sizeGuideText && (
            <SizeGuide sizeGuide={sizeGuide} sizeGuideText={sizeGuideText} />
          )}
        </div>
      </dt>
      <dd className="grid grid-cols-6 gap-1">
        {option &&
          option.values.map((value) => {
            return (
              <button
                key={value.title}
                onClick={() => setSelectedSize(value.title)}
                className={cn(
                  'flex items-center justify-center rounded-[2px] border border-brand-light-grey py-2.5 text-sm',
                  selectedSize === value.title
                    ? 'bg-brand-primary text-white '
                    : 'hover:border-brand-primary hover:bg-brand-primary hover:text-white focus:border-brand-primary focus:bg-brand-primary focus:text-white'
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
