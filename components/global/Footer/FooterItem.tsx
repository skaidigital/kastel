import { SanityLink } from '@/components/sanity/SanityLink';
import { HeadingAndLinksProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
  item?: HeadingAndLinksProps;
  className?: string;
}

export function FooterItem({ item, className }: Props) {
  if (!item) return null;

  return (
    <div key={item.heading} className={cn('flex flex-col gap-y-8', className)}>
      {item.heading && (
        <h3 className="max-w-[80%] text-balance text-heading-xs font-bold uppercase">
          {item.heading}
        </h3>
      )}
      <div className="flex flex-col gap-y-2">
        {item.links &&
          item.links.map((link) => (
            <SanityLink link={link.link} className="text-sm" key={item.heading + link.link.text}>
              {link.link.text}
            </SanityLink>
          ))}
      </div>
    </div>
  );
}
