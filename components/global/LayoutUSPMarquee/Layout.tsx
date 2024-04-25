import { LayoutUSPMarqueePayload } from '@/components/global/LayoutUSPMarquee/hooks';
import Marquee from 'react-fast-marquee';

interface Props {
  data: LayoutUSPMarqueePayload;
}

export function LayoutUSPMarqueeLayout({ data }: Props) {
  const { items } = data;

  return (
    <Marquee autoFill pauseOnHover className="py-4 lg:py-6">
      {items.map((usp) => (
        <span
          key={usp && usp}
          className="mr-20 text-md font-bold uppercase lg:mr-40 lg:text-heading-xs"
        >
          {usp && usp}
        </span>
      ))}
    </Marquee>
  );
}
