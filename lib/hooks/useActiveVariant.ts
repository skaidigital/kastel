import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useQueryState } from 'nuqs';

interface Props {
  variants: ProductVariant[];
  productType: Product['type'];
}

export function useActiveVariant({ variants, productType }: Props) {
  const allPossibleVariantOptionNames =
    variants.reduce((acc: string[], variant) => {
      variant.selectedOptions.forEach((option: any) => {
        if (!acc.includes(option.name.toLowerCase())) {
          acc.push(option.name.toLowerCase());
        }
      });
      return acc;
    }, []) || [];

  const [option1] = useQueryState(allPossibleVariantOptionNames?.at(0) || '');
  const [option2] = useQueryState(allPossibleVariantOptionNames?.at(1) || '');
  const [option3] = useQueryState(allPossibleVariantOptionNames?.at(2) || '');

  const options = [option1, option2, option3];

  if (productType === 'SIMPLE') {
    const firstVariant = variants.at(0);
    return firstVariant;
  }

  const activeVariant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => options.includes(option?.value?.toLowerCase() || ''))
  );

  if (!activeVariant) return null;

  return activeVariant;
}
