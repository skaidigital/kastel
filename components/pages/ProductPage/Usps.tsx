/* eslint-disable import/no-extraneous-dependencies */
import { SanityImage } from '@/components/sanity/SanityImage';
import { cn } from '@/lib/utils';
import Marquee from 'react-fast-marquee';
import { Product } from './hooks';

interface Props {
  usps: Product['usps'];
  size: 'sm' | 'lg';
  className?: string;
}

export function UspsMarquee({ usps, size, className }: Props) {
  return (
    usps && (
      <div
        className={cn(
          'border-b border-t border-brand-light-grey',
          size === 'sm' && 'py-6',
          size === 'lg' && 'py-[14px] lg:py-8',
          className
        )}
      >
        <Marquee autoFill>
          {usps.map((usp, index) => {
            const textSize = size === 'sm' ? 'sm' : 'md';
            const iconSize = size === 'sm' ? 24 : 32;
            return (
              <div key={usp.icon.asset._ref + index} className="mr-24 flex items-center gap-2">
                <SanityImage width={iconSize} height={iconSize} image={usp.icon} />
                <span className={cn(size === 'sm' && 'text-sm', size === 'lg' && 'text-md')}>
                  {usp.title}
                </span>
              </div>
            );
          })}
        </Marquee>
      </div>
    )
  );
}
