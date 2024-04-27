'use client';

import { colorWaySchema } from '@/lib/sanity/validators';
import { cn } from '@/lib/utils';
import { useProductCardContext } from './Context';

interface Props {
  className?: string;
  colorways: colorWaySchema[] | undefined;
  productSlug: string;
}

const colorways2 = [
  {
    name: 'Black',
    hex: '000000'
  },
  {
    name: 'White',
    hex: 'FFFFFF'
  },
  {
    name: 'Red',
    hex: 'FF0000'
  },
  {
    name: 'Green',
    hex: '00FF00'
  },
  {
    name: 'Blue',
    hex: '0000FF'
  }
];

export function Colors({ className, colorways, productSlug }: Props) {
  const { activeColorway, setActiveColorway } = useProductCardContext();

  console.log('activeColorway', activeColorway);

  const defaultColor = colorways && colorways[0];
  // const [activeColorway, setActiveColorway] = useState(defaultColor);
  if (!colorways) {
    return null;
  }

  const firstFourColors = colorways.slice(0, 4);
  const colorBySlug = colorways.find((colorway) => colorway.slug === productSlug);

  return (
    <div className={cn('flex gap-x-1', className)}>
      {firstFourColors?.map((colorway) => (
        <button
          onClick={() => setActiveColorway(colorway)}
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
