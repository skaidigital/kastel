/* eslint-disable import/no-extraneous-dependencies */
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import Marquee from 'react-fast-marquee';
import { Product } from './hooks';

interface Props {
  usps: Product['usps'];
}

export function Usps({ usps }: Props) {
  console.log(usps);

  return (
    usps && (
      <div className="border-b border-t border-brand-light-grey py-6">
        <Marquee className="">
          {usps.map((usp) => {
            return (
              <div key={usp.icon.asset._ref} className="mr-24 flex items-center gap-2">
                <SanityImage width={40} height={40} image={usp.icon} />
                <Text as="p" size="sm" className="text-brand-dark-grey">
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
