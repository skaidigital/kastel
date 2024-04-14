import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { getSlug } from '@/lib/sanity/getSlug';
import { LinkProps, SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FeaturedItemProps {
  title: string;
  image: SanityImageProps;
  link: LinkProps;
  className?: string;
  onClick?: () => void;
}

export const FeaturedItem = ({ title, image, link, className, onClick }: FeaturedItemProps) => {
  return (
    <Link
      href={getSlug(link)}
      onClick={onClick}
      className={cn('sm:text-sm group relative flex flex-col items-center gap-y-4', className)}
    >
      <div className="aspect-h-1 aspect-w-1 relative h-full w-full overflow-hidden rounded-project">
        <SanityImage
          image={image}
          fill
          className="absolute left-0 top-0 h-full w-full rounded-project object-cover  transition-transform duration-300 group-hover:scale-[110%]"
        />
      </div>
      <Text size="eyebrow">
        <span className="absolute inset-0 z-10" aria-hidden="true" />
        {title}
      </Text>
    </Link>
  );
};
