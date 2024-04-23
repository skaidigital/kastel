'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Props {
  className?: string;
}

const colorways = [
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

export function Colors({ className }: Props) {
  const [activeColorway, setActiveColorway] = useState(colorways[0]);

  return (
    <div className={cn('flex gap-x-1', className)}>
      {colorways.map((colorway) => (
        <button
          onClick={() => setActiveColorway(colorway)}
          className={cn(
            'size-6 rounded-[2px] border',
            colorway.hex === activeColorway?.hex
              ? 'border border-black'
              : 'border-brand-light-grey '
          )}
          key={colorway.hex}
          style={{ background: `#${colorway.hex}` }}
        />
      ))}
    </div>
  );
}
