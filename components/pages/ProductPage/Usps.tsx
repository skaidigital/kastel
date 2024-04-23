/* eslint-disable import/no-extraneous-dependencies */
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { cn } from '@/lib/utils';
import Marquee from 'react-fast-marquee';
import { Product } from './hooks';

interface Props {
  usps: Product['usps'];
  size: 'sm' | 'lg';
}

export function UspsMarquee({ usps, size }: Props) {
  return (
    usps && (
      <div
        className={cn(
          'border-b border-t border-brand-light-grey',
          size === 'sm' && 'py-6',
          size === 'lg' && 'py-8'
        )}
      >
        <Marquee autoFill>
          {usps.map((usp) => {
            const textSize = size === 'sm' ? 'sm' : 'md';
            const iconSize = size === 'sm' ? 24 : 32;
            return (
              <div key={usp.icon.asset._ref} className="mr-24 flex items-center gap-2">
                <SanityImage width={iconSize} height={iconSize} image={usp.icon} />
                <Text as="p" size={textSize} className="text-brand-dark-grey">
                  {usp.title}
                </Text>
              </div>
            );
          })}
        </Marquee>
      </div>
    )
  );
}
