import { Heading } from '@/components/base/Heading';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityLink } from '@/components/sanity/SanityLink';
import { LinkProps, SanityImageProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface FeaturedItemProps {
  title: string;
  image: SanityImageProps;
  link: LinkProps;
  className?: string;
  onClick?: () => void;
}

export const FeaturedItem = ({ title, image, link, className, onClick }: FeaturedItemProps) => {
  console.log('FeaturedItemProps:', link);

  return (
    <SanityLink
      link={link}
      onClick={onClick}
      className={cn('sm:text-sm group relative flex flex-col items-center gap-y-4', className)}
    >
      <div className="aspect-h-1 aspect-w-1 relative h-full w-full overflow-hidden rounded-[4px]">
        <SanityImage
          image={image}
          fill
          className="absolute left-0 top-0 h-full w-full rounded-project object-cover transition-transform duration-300 group-hover:scale-[110%]"
        />
      </div>
      <p className="absolute bottom-0 left-0 px-2 pb-1 text-white">
        <Heading size="md">{title}</Heading>
      </p>
    </SanityLink>
  );
};
