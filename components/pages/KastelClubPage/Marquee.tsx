import { cn } from '@/lib/utils';
import Marquee from 'react-fast-marquee';

const usps = [
  { icon: null, title: 'Free shipping' },
  { icon: null, title: 'Free returns' }
];

interface Props {
  className?: string;
}

export function KastelClubPageMarquee({ className }: Props) {
  if (!usps) return null;

  return (
    <div className={cn('border-b border-brand-light-grey', className)}>
      <Marquee autoFill>
        {usps.map((usp) => (
          <div key={usp.title} className="mr-24 flex items-center gap-2 py-6">
            {/* <SanityImage width={iconSize} height={iconSize} image={usp.icon} noPlaceholder /> */}
            <span className={cn('')}>{usp.title}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
