'use client';

import { buttonProps } from '@/components/Button';
import { LazyLoadedVideo } from '@/components/LazyLoadedVideo';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { SanityLinkHero } from '@/components/sanity/SanityLink';
import { CardProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';

interface Props {
  card: CardProps;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export function Card({ card, sizes, className, priority }: Props) {
  const { title, subtitle, link, textPositionMobile, textPositionDesktop, type } = card;

  const video = type === 'video' ? card.video : null;
  const image = type === 'image' ? card.image : null;

  // A variable for the conditional component
  // const Wrapper = link?.hasLink ? Link : 'div';

  // If it's a Link, we need to pass the href
  // const wrapperProps = link?.hasLink ? { href: getSlug({ ...link, type: 'link' }) || '#' } : {};

  return (
    <div
      // data-sanity={encodeDataAttribute?.(['cardGrid', 1, 'image'])}
      title={title}
      className={cn('h-full w-full rounded-project', className)}
    >
      <div
        className={cn(
          'absolute z-[1] flex h-full w-full flex-col gap-y-1 p-5 text-white',
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
          textPositionDesktop === 'bottom-center' &&
            'lg:items-center lg:justify-end lg:text-center',
          textPositionDesktop === 'bottom-right' && 'lg:items-end lg:justify-end lg:text-right'
        )}
      >
        {title && (
          <Heading as="h2" size="lg" className="max-w-xs text-balance lg:max-w-sm">
            {title}
          </Heading>
        )}
        {subtitle && (
          <Text size="lg" className="mt-1">
            {subtitle}
          </Text>
        )}
        {link?.hasLink && (
          <div className="mt-3 lg:mt-5">
            <SanityLinkHero link={link} className={buttonProps()}>
              {link.text}
            </SanityLinkHero>
          </div>
        )}
      </div>
      {(image || video) && (title || subtitle) && (
        <div className="absolute z-[-1] h-full w-full bg-black/20" />
      )}
      {image && (
        <SanityImage
          priority={priority}
          image={image}
          className="absolute inset-0 -z-10 h-full w-full rounded-project object-cover"
          sizes={sizes}
        />
      )}
      {video && <LazyLoadedVideo playbackId={video} loading="lazy" resolution="HD" />}
    </div>
  );
}
