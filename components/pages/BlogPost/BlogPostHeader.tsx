import { Badge } from '@/components/Badge';
import { SanityImage } from '@/components/sanity/SanityImage';
import { LangValues } from '@/data/constants';
import { AspectRatios, SanityImageProps } from '@/lib/sanity/types';
import { cn, getAspectRatioString } from '@/lib/utils';

interface Props {
  readTime: string;
  title: string;
  lang: LangValues;
  aspectRatioMobile: AspectRatios;
  aspectRatioDesktop: AspectRatios;
  imageMobile: SanityImageProps;
  imageDesktop: SanityImageProps;
}

export function BlogPostHeader({
  readTime,
  title,
  lang,
  aspectRatioMobile,
  aspectRatioDesktop,
  imageMobile,
  imageDesktop
}: Props) {
  const mobileAspectRatio = getAspectRatioString(aspectRatioMobile);
  const desktopAspectRatio = getAspectRatioString(aspectRatioDesktop);

  return (
    <div className="mx-auto flex w-full max-w-[--blog-post-container-md] flex-col">
      {readTime && (
        <Badge className="mb-2">
          {readTime} {getReadTimeString(lang)}
        </Badge>
      )}
      {title && <h1 className="text-heading-sm font-bold lg:text-heading-lg">{title}</h1>}
      <div className={cn('relative mt-6 lg:hidden', mobileAspectRatio)}>
        {imageMobile && <SanityImage image={imageMobile} fill />}
      </div>
      <div className={cn('relative mt-10 hidden lg:block', desktopAspectRatio)}>
        {imageDesktop && <SanityImage image={imageDesktop} fill />}
      </div>
    </div>
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
