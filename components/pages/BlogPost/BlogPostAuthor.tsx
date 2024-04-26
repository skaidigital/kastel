import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { AuthorProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props extends AuthorProps {
  className?: string;
}

export function BlogPostAuthor({ name, role, image, description, className }: Props) {
  return (
    <div
      className={cn('flex flex-col gap-4 bg-nature-lab-beige p-6 lg:flex-row lg:gap-6', className)}
    >
      <div className="w-[160px]">
        <div className="aspect-h-1 aspect-w-1 relative">
          <SanityImage image={image} fill className="relative rounded-[2px]" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="mb-2 text-overline-sm uppercase text-brand-mid-grey">
          About the author
        </span>
        <div className="flex flex-col gap-y-0.5">
          {name && (
            <Text size="md" className="font-bold">
              {name}
            </Text>
          )}
          {role && (
            <Text size="sm" className="text-brand-mid-grey">
              {role}
            </Text>
          )}
        </div>
        {description && (
          <Text size="sm" className="mt-3 text-balance text-brand-mid-grey">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}
