import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { AuthorProps } from '@/lib/sanity/types';
import { cn } from '@/lib/utils';

interface Props extends AuthorProps {
  className?: string;
}

export function BlogPostAuthor({ name, role, image, description, className }: Props) {
  console.log(name, role, image, description);

  return (
    <div
      className={cn('flex flex-col gap-4 bg-nature-lab-beige p-6 lg:flex-row lg:gap-6', className)}
    >
      <SanityImage width={120} height={120} image={image} />
      <div className="flex flex-col">
        <Text className="mb-2 text-overline-sm uppercase text-brand-mid-grey lg:text-overline-md">
          About the author
        </Text>
        <div className="flex flex-col gap-y-0.5">
          {name && (
            <Text size="md" className="font-bold">
              {name}
            </Text>
          )}
          {role && <Text className="text-brand-mid-grey">{role}</Text>}
        </div>
        {description && <Text className="mt-3 text-brand-mid-grey">{description}</Text>}
      </div>
    </div>
  );
}
