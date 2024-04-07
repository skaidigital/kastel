'use client';

import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityImageProps } from '@/lib/sanity/types';
import { imageValidator } from '@/lib/sanity/validators';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface Props {
  stepSlug: string;
  stepProducts: {
    images: SanityImageProps[];
    slug: string;
  }[];
}

export function ActiveImage({ stepSlug, stepProducts }: Props) {
  const searchParams = useSearchParams();
  const imageSearchParamBySlug = searchParams.get(stepSlug);

  const activeProduct =
    stepProducts.find((product) => product.slug === imageSearchParamBySlug) || stepProducts[0];
  const activeImage = activeProduct?.images;

  const validatedImage = imageValidator.parse(activeImage);

  if (!activeImage) return null;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={cn(
          'aspect-h-3 aspect-w-2 relative h-full border-b border-brand-border xl:aspect-none'
        )}
      >
        <SanityImage image={validatedImage} fill className="absolute" />
      </div>
    </div>
  );
}
