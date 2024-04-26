'use client';

import { Button, buttonProps } from '@/components/Button';
import { LazyLoadedVideo } from '@/components/LazyLoadedVideo';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { SanityImage } from '@/components/sanity/SanityImage';
import { CardProps } from '@/components/shared/PageBuilder/hooks';
import { resolveConditionalLink } from '@/lib/sanity/resolveConditionalLink';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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

  const href = resolveConditionalLink(card.link);

  const Wrapper = link?.hasLink ? Link : 'div';

  return (
    <Wrapper
      href={link?.hasLink ? href : '#'}
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
          <Button className="mt-3 lg:mt-5">
            <Link href={href} className={buttonProps()}>
              {link.text}
            </Link>
          </Button>
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
    </Wrapper>
  );
}
