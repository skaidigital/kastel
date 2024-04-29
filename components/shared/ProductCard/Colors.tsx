'use client';

import { colorWaySchema } from '@/lib/sanity/validators';
import { cn } from '@/lib/utils';
import { useProductCardContext } from './Context';

interface Props {
  className?: string;
  colorways: colorWaySchema[] | undefined;
  productSlug: string;
}

export function Colors({ className, colorways, productSlug }: Props) {
  const { activeColorway, setActiveColorway } = useProductCardContext();

  if (!colorways) {
    return null;
  }

  const hasLessThan2Colors = colorways.length < 2;

  if (hasLessThan2Colors) {
    return null;
  }

  const colorBySlug = colorways.find((colorway) => colorway.slug === productSlug);

  return (
    <div className={cn('flex gap-x-1', className)}>
      {colorways?.map((colorway) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveColorway(colorway);
          }}
          className={cn(
            'size-6 rounded-[2px] border @xs:size-5',
            colorway.hexCode === (activeColorway?.hexCode || colorBySlug?.hexCode)
              ? 'border border-black'
              : 'border-brand-light-grey '
          )}
          key={colorway.hexCode}
          style={{ background: `${colorway.hexCode}` }}
        />
      ))}
    </div>
  );
}
