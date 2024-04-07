'use client';

import { GridTileImage } from '@/components/GridTileImage';
import { SanityImageProps } from '@/lib/sanity/types';
import { createUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  stepSlug: string;
  stepProducts: {
    images: SanityImageProps;
    slug: string;
  }[];
}

export function ImageThumbnails({ stepSlug, stepProducts }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const imageSearchParamBySlug = searchParams.get(stepSlug);
  const activeIndex =
    stepProducts.findIndex((product) => product.slug === imageSearchParamBySlug) || 0;

  return (
    <ul className="flex items-center justify-center gap-2 overflow-hidden pb-2 lg:pb-6">
      {stepProducts.map((product, index) => {
        const isActive = index === activeIndex;
        const imageSearchParams = new URLSearchParams(searchParams.toString());

        imageSearchParams.set(stepSlug, product.slug);

        return (
          <li key={product.slug} className="h-20 w-20">
            <Link
              aria-label="Enlarge product image"
              href={createUrl(pathname, imageSearchParams)}
              scroll={false}
              className="h-full w-full"
            >
              <GridTileImage image={product.images!} width={80} height={80} active={isActive} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
