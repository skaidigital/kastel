import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { ROUTES } from '@/data/constants';
import { BlogPostCardProps } from '@/lib/sanity/types';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export interface Props {
  post: BlogPostCardProps;
  readTimeString: string;
  readMoreString: string;
}

export function BlogPostCard({ post, readTimeString, readMoreString }: Props) {
  const { title, description, readLength, image, slug } = post;

  if (!title || !image || !slug) {
    return null;
  }

  return (
    <article className="group">
      <CustomLink href={`${ROUTES.BLOG}/${slug}`} className="relative">
        <div className="aspect-h-4 aspect-w-3 relative mb-4 h-0 w-full bg-[pink]">
          {image && <SanityImage image={image} fill className="h-full w-full" />}
        </div>
        <div className="flex flex-col pr-5">
          {readLength && (
            <Badge className="mb-1">
              {readLength} {readTimeString}
            </Badge>
          )}
          {title && (
            <Heading size="sm" className="mb-3">
              {title}
            </Heading>
          )}
          {description && (
            <Text className="mb-6 font-medium text-brand-mid-grey">{description}</Text>
          )}
          <div className="flex items-center gap-x-2">
            <Text className="font-medium text-brand-mid-grey transition-all duration-100 ease-in-out group-hover:mr-1.5">
              {readMoreString}
            </Text>
            <ArrowUpRightIcon className="size-4 " />
          </div>
        </div>
      </CustomLink>
    </article>
  );
}
