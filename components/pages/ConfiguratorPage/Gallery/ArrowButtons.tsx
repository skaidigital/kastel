'use client';

import { SanityImageProps } from '@/lib/sanity/types';
import { createUrl } from '@/lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  stepSlug: string;
  stepProducts: {
    images: SanityImageProps[];
    slug: string;
  }[];
}

export function ArrowButtons({ stepSlug, stepProducts }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const imageSearchParamBySlug = searchParams.get(stepSlug);

  // find index of active product
  const activeIndex = stepProducts.findIndex((product) => product.slug === imageSearchParamBySlug);

  // Handle Next route
  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextProductIndex = activeIndex < stepProducts.length - 1 ? activeIndex + 1 : activeIndex;
  const nextProductSlug = stepProducts[nextProductIndex]?.slug || '#';
  nextSearchParams.set(stepSlug, nextProductSlug);
  const nextUrl = createUrl(pathname, nextSearchParams);

  // Handle Previous route
  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const prevProductIndex = activeIndex === 0 ? activeIndex : activeIndex - 1;
  const previousProductSlug = stepProducts[prevProductIndex]?.slug || '#';
  previousSearchParams.set(stepSlug, previousProductSlug);
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <div className="absolute bottom-[15%] flex w-full justify-center">
      <div className="mx-auto flex h-11 items-center rounded-project border border-white bg-brand-light-grey text-brand-mid-grey backdrop-blur dark:border-brand-dark-grey dark:bg-neutral-900/80">
        {activeIndex !== prevProductIndex && (
          <Link
            aria-label="Previous product image"
            href={previousUrl}
            className={buttonClassName}
            scroll={false}
          >
            <ArrowLeftIcon className="h-5" />
          </Link>
        )}
        {activeIndex === prevProductIndex && <Arrow direction="left" />}
        <div className="mx-1 h-6 w-px bg-neutral-500"></div>
        {activeIndex !== nextProductIndex && (
          <Link
            aria-label="Next product image"
            href={nextUrl}
            className={buttonClassName}
            scroll={false}
          >
            <ArrowRightIcon className="h-5" />
          </Link>
        )}
        {activeIndex === nextProductIndex && <Arrow direction="right" />}
      </div>
    </div>
  );
}

interface ArrowProps {
  direction: 'left' | 'right';
}

function Arrow({ direction }: ArrowProps) {
  return (
    <div className="flex h-full items-center justify-center px-6">
      {direction === 'right' && <ArrowRightIcon className="h-5" />}
      {direction === 'left' && <ArrowLeftIcon className="h-5" />}
    </div>
  );
}
