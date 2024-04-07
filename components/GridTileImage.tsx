import { Label } from '@/components/NextCommerceLabel';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityImageProps } from '@/lib/sanity/types';
import clsx from 'clsx';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  image,
  width,
  height
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  image: SanityImageProps;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-project border bg-[--product-bg-color] hover:border-brand-dark-grey dark:bg-black',
        {
          relative: label,
          'border-2 border-brand-dark-grey': active,
          'border-brand-border dark:border-neutral-800': !active
        }
      )}
    >
      {image ? (
        <SanityImage
          image={image}
          width={width}
          height={height}
          className={clsx(
            'relative h-full w-full object-contain',
            isInteractive && 'transition duration-300 ease-in-out group-hover:scale-105'
          )}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
