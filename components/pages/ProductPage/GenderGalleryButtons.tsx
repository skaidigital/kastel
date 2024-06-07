'use client';

import {
  ProductPageContextType,
  useProductPageContext
} from '@/components/pages/ProductPage/Context';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function GenderGalleryButtons({ className }: Props) {
  const { activeGender, setActiveGender } = useProductPageContext();
  const { lang } = useBaseParams();

  async function handleClick(gender: ProductPageContextType['activeGender']) {
    const toast = (await import('sonner')).toast;
    setActiveGender(gender);
    toast.success(getSuccessToastTitle(lang, gender));
  }

  return (
    <div className={cn('mb-4 flex justify-center gap-x-1', className)}>
      <button
        onClick={() => handleClick('female')}
        className={cn(
          'px-4 py-2',
          activeGender == 'female'
            ? 'bg-brand-primary text-white'
            : 'bg-brand-light-grey text-black'
        )}
      >
        Female
      </button>
      <button
        onClick={() => handleClick('male')}
        className={cn(
          'px-4 py-2',
          activeGender == 'male' ? 'bg-brand-primary text-white' : 'bg-brand-light-grey text-black'
        )}
      >
        Male
      </button>
    </div>
  );
}

function getSuccessToastTitle(lang: LangValues, gender: ProductPageContextType['activeGender']) {
  switch (lang) {
    case 'no':
      return `Du vil nå se bilder av ${gender === 'male' ? 'menn' : 'kvinner'}`;
    case 'en':
      return `You will now see ${gender === 'male' ? 'male' : 'female'} images`;
    default:
      return `You will now see ${gender === 'male' ? 'male' : 'female'} images`;
  }
}
