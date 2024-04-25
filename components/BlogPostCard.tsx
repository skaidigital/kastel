'use client';

import { Badge } from '@/components/Badge';
import { CustomLink } from '@/components/CustomLink';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { LangValues, ROUTES } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { BlogPostCardProps } from '@/lib/sanity/types';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export interface Props {
  post: BlogPostCardProps;
}

export function BlogPostCard({ post }: Props) {
  const { title, description, readLength, image, slug } = post;
  const { lang } = useBaseParams();

  const readMoreString = getReadMoreString(lang);
  const readTimeString = getReadTimeString(lang);

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
            <Badge className="mb-2">
              {readLength} {readTimeString}
            </Badge>
          )}
          {title && <Heading className="mb-3 text-heading-xs">{title}</Heading>}
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

function getReadTimeString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'min read';
    case 'no':
      return 'min lesetid';
    default:
      return 'min read';
  }
}

function getReadMoreString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Read more';
    case 'no':
      return 'Les mer';
    default:
      return 'Read more';
  }
}
