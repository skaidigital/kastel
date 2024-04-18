import { AspectRatio } from '@/components/AspectRatio';
import { Button } from '@/components/Button';
import { CustomLink } from '@/components/CustomLink';
import { Media } from '@/components/Media';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';
import { HeroNewProps } from '@/components/shared/PageBuilder/hooks';
import { resolveHref } from '@/lib/sanity/resolveHref';
import { cn } from '@/lib/utils';

interface PropsWithExtra extends HeroNewProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const Hero = ({ data }: Props) => {
  const {
    index,
    pageId,
    pageType,
    title,
    description,
    link,
    media,
    textPositionDesktop,
    textPositionMobile,
    buttonSettings,
    aspectRatioSettings
  } = data;

  const hasAnyContent = title || description || (link.hasLink && link.text) ? true : false;
  const href =
    link.hasLink && link.type === 'external'
      ? link.href
      : link.hasLink && link.type === 'internal'
        ? resolveHref({ slug: link.linkTo.slug, type: link.linkTo.type }) || '#'
        : '#';

  return (
    <Section
      label="heroSection"
      srHeading={`Hero – ${title ? title : 'Untitled'}`}
      noTopPadding={true}
      noBottomPadding={true}
      hasBottomBorder={false}
    >
      <AspectRatio settings={aspectRatioSettings} className="relative">
        {hasAnyContent && <div className="absolute z-20 h-full w-full bg-black/20" />}
        {media && <Media media={media} loading="eager" />}
        <div
          className={cn(
            'z-30 flex h-full w-full grow flex-col p-5 text-white lg:p-10',
            textPositionMobile === 'top-left' && 'items-start justify-start text-left',
            textPositionMobile === 'top-center' && 'items-center justify-start text-center',
            textPositionMobile === 'top-right' && 'items-end justify-start text-right',
            textPositionMobile === 'center-left' && 'items-start justify-center',
            textPositionMobile === 'center' && 'items-center justify-center text-center',
            textPositionMobile === 'center-right' && 'items-end justify-center text-right',
            textPositionMobile === 'bottom-left' && 'items-start justify-end',
            textPositionMobile === 'bottom-center' && 'items-center justify-end text-center',
            textPositionMobile === 'bottom-right' && 'items-end justify-end text-right',
            textPositionDesktop === 'top-left' && 'lg:items-start lg:justify-start lg:text-left',
            textPositionDesktop === 'top-center' &&
              'lg:items-center lg:justify-start lg:text-center',
            textPositionDesktop === 'top-right' && 'lg:items-end lg:justify-start lg:text-right',
            textPositionDesktop === 'center-left' &&
              'lg:items-start lg:justify-center lg:text-left',
            textPositionDesktop === 'center' && 'lg:items-center lg:justify-center lg:text-center',
            textPositionDesktop === 'center-right' &&
              'lg:items-end lg:justify-center lg:text-right',
            textPositionDesktop === 'bottom-left' && 'lg:items-start lg:justify-end lg:text-left',
            textPositionDesktop === 'bottom-center' &&
              'lg:items-center lg:justify-end lg:text-center',
            textPositionDesktop === 'bottom-right' && 'lg:items-end lg:justify-end lg:text-right',
            textPositionDesktop === 'split-top' && ''
          )}
        >
          {title && (
            <Heading
              as={index === 0 ? 'h1' : 'h2'}
              className={cn(
                'mb-4 translate-y-[10px] animate-fade-up-text text-pretty text-[48px] leading-[40px] opacity-0 transition-[opacity,color] [--animation-delay:600ms] lg:mb-6 lg:max-w-3xl lg:text-heading-2xl'
              )}
            >
              {title}
            </Heading>
          )}
          {description && (
            <Text
              className={cn(
                'mb-8 translate-y-[10px] animate-fade-up-text text-balance text-md opacity-0 transition-[opacity,color] [--animation-delay:800ms] lg:mb-10 lg:max-w-lg lg:text-lg'
              )}
            >
              {description}
            </Text>
          )}
          {link.hasLink && buttonSettings.variant && (
            <Button
              asChild
              variant={buttonSettings.variant}
              className="translate-y-[10px] animate-fade-up-text opacity-0 transition-[opacity-color] [--animation-delay:900ms]"
            >
              <CustomLink href={href}>{link.text}</CustomLink>
            </Button>
          )}
        </div>
      </AspectRatio>
    </Section>
  );
};
