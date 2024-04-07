import Video from '@/components/Video';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityLinkHero } from '@/components/sanity/SanityLink';
import { HeroLinkProps, HeroProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';
import { EncodeDataAttributeCallback } from '@sanity/react-loader';

interface HeroPropsWithIndex extends HeroProps {
  index: number;
}

interface Props {
  data: HeroPropsWithIndex;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export const Hero = ({ data, encodeDataAttribute }: Props) => {
  const {
    title,
    subtitle,
    link,
    imageMobile,
    imageDesktop,
    textPositionMobile,
    textPositionDesktop,
    index,
    videoUrlMobile,
    videoUrlDesktop,
    aspectRatioDesktop,
    aspectRatioMobile,
    imageOrVideo
  } = data;

  const desktopAspectRatio = aspectRatioDesktop;
  const mobileAspectRatio = aspectRatioMobile;

  const hasAnyContent = title || subtitle || (link.hasLink && link.text);

  return (
    <div className="relative flex w-full items-center justify-center ">
      <Container className="absolute z-[1] h-full w-full">
        <TextContent
          index={index}
          title={title}
          subtitle={subtitle}
          link={link}
          textPositionMobile={textPositionMobile}
          textPositionDesktop={textPositionDesktop}
        />
      </Container>
      {hasAnyContent && <div className="absolute z-[-1] h-full w-full bg-black/20" />}
      <div
        data-sanity={encodeDataAttribute?.('image')}
        className={cn(
          'h-0 w-full',
          mobileAspectRatio === '3:4' && 'aspect-h-4 aspect-w-3',
          mobileAspectRatio === '9:16' && 'aspect-h-16 aspect-w-9',
          desktopAspectRatio === '16:9' && 'lg:aspect-h-9 lg:aspect-w-16',
          desktopAspectRatio === '4:3' && 'lg:aspect-h-3 lg:aspect-w-4',
          desktopAspectRatio === '21:9' && 'lg:aspect-w-21 lg:aspect-h-9'
        )}
      >
        {imageOrVideo === 'image' && imageMobile && (
          <SanityImage
            priority={index === 0}
            image={imageMobile}
            className="absolute inset-0 -z-10 h-full w-full object-cover lg:hidden"
            sizes="100vw"
            fill
          />
        )}
        {imageOrVideo === 'image' && imageDesktop && (
          <SanityImage
            priority={index === 0}
            image={imageDesktop}
            className="absolute inset-0 -z-10 hidden h-full w-full object-cover lg:block"
            sizes="100vw"
            fill
          />
        )}
        {imageOrVideo === 'video' && videoUrlMobile && (
          <Video
            playbackId={videoUrlMobile}
            resolution="HD"
            loading="eager"
            className="-z-10 lg:hidden"
          />
        )}
        {imageOrVideo === 'video' && videoUrlDesktop && (
          <Video
            playbackId={videoUrlDesktop}
            loading="eager"
            resolution="HD"
            className="inset-0 -z-10 hidden lg:block"
          />
        )}
      </div>
    </div>
  );
};

interface TextContentProps {
  index: number;
  textPositionMobile: HeroProps['textPositionMobile'];
  textPositionDesktop: HeroProps['textPositionDesktop'];
  title?: string;
  subtitle?: string;
  link: HeroLinkProps;
  className?: string;
}

function TextContent({
  index,
  title,
  subtitle,
  link,
  textPositionMobile,
  textPositionDesktop,
  className
}: TextContentProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full grow flex-col py-5 text-white lg:py-10',
        textPositionMobile === 'top-left' && 'items-start justify-start',
        textPositionMobile === 'top-center' && 'items-center justify-start text-center',
        textPositionMobile === 'top-right' && 'items-end justify-start text-right',
        textPositionMobile === 'center-left' && 'items-start justify-center',
        textPositionMobile === 'center' && 'items-center justify-center text-center',
        textPositionMobile === 'center-right' && 'items-end justify-center text-right',
        textPositionMobile === 'bottom-left' && 'items-start justify-end',
        textPositionMobile === 'bottom-center' && 'items-center justify-end text-center',
        textPositionMobile === 'bottom-right' && 'items-end justify-end text-right',
        textPositionDesktop === 'top-left' && 'lg:items-start lg:justify-start',
        textPositionDesktop === 'top-center' && 'lg:items-center lg:justify-start lg:text-center',
        textPositionDesktop === 'top-right' && 'lg:items-end lg:justify-start lg:text-right',
        textPositionDesktop === 'center-left' && 'lg:items-start lg:justify-center',
        textPositionDesktop === 'center' && 'lg:items-center lg:justify-center lg:text-center',
        textPositionDesktop === 'center-right' && 'lg:items-end lg:justify-center lg:text-right',
        textPositionDesktop === 'bottom-left' && 'lg:items-start lg:justify-end',
        textPositionDesktop === 'bottom-center' && 'lg:items-center lg:justify-end lg:text-center',
        textPositionDesktop === 'bottom-right' && 'lg:items-end lg:justify-end lg:text-right',
        className
      )}
    >
      {title && (
        <Heading
          as={index === 0 ? 'h1' : 'h2'}
          size="lg"
          className={cn(
            'mb-2 max-w-lg translate-y-[10px] animate-fade-up-text opacity-0 transition-[opacity,color] [--animation-delay:600ms]'
          )}
        >
          {title}
        </Heading>
      )}
      {subtitle && (
        <Text
          className={cn(
            'mb-5 translate-y-[10px] animate-fade-up-text opacity-0 transition-[opacity,color] [--animation-delay:800ms]'
          )}
        >
          {subtitle}
        </Text>
      )}
      {link.hasLink && (
        <div>
          <SanityLinkHero
            link={link}
            className={cn(
              'rounded-brand focus-visible:ring-ring transition-brand inline-flex h-11 translate-y-[10px] animate-fade-up-text items-center justify-center bg-brand-dark-grey px-8 text-[12px] uppercase leading-[12px] tracking-[2.4px] text-white opacity-0 transition-[opacity,color] [--animation-delay:900ms] hover:bg-black focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            {link.text}
          </SanityLinkHero>
        </div>
      )}
    </div>
  );
}
