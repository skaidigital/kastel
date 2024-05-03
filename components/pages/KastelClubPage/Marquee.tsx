import { KastelClubPagePayload } from '@/components/pages/KastelClubPage/hooks';
import { SanityImage } from '@/components/sanity/SanityImage';
import { cn } from '@/lib/utils';
import Marquee from 'react-fast-marquee';

interface Props {
  items: KastelClubPagePayload['marquee'];
  className?: string;
}

export function KastelClubPageMarquee({ items, className }: Props) {
  if (!items) return null;

  return (
    <div className={cn('border-b border-brand-light-grey', className)}>
      <Marquee autoFill>
        {items?.map((usp) => (
          <div key={usp?.title} className="mr-40 flex items-center gap-2 py-6">
            {usp.icon && <SanityImage width={32} height={32} image={usp.icon} noPlaceholder />}
            {usp.title && <span className={cn('text-md')}>{usp.title}</span>}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
