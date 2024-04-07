'use client';

import { Card } from '@/components/Card';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { CardGridProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';

interface Props {
  data: CardGridProps;
}

export const CardGrid = ({ data }: Props) => {
  const {
    title,
    cards,
    padding,
    hasTopPadding,
    hasBottomPadding,
    hasBottomBorder,
    aspectRatioMobile,
    aspectRatioDesktop
  } = data;
  const cardCount = cards.length;

  const desktopAspectRatio = aspectRatioDesktop;
  const mobileAspectRatio = aspectRatioMobile;

  return (
    <Section
      size={padding}
      noTopPadding={!hasTopPadding}
      noBottomPadding={!hasBottomPadding}
      label="page-title"
      srHeading="Page title"
      className={hasBottomBorder ? 'border-b border-brand-border' : ''}
    >
      {title && (
        <Container className="mb-10">
          <Heading as="h2" size="md">
            {title}
          </Heading>
        </Container>
      )}
      <Container
        className={cn(
          'grid gap-2',
          cardCount === 2 && 'lg:grid-cols-2',
          cardCount === 3 && 'lg:grid-cols-3'
        )}
      >
        {cards?.map((card, index) => (
          <div
            key={`${card?.title} + ${index}`}
            className={cn(
              'relative h-0 w-full',
              mobileAspectRatio === '3:4' && 'aspect-h-4 aspect-w-3',
              mobileAspectRatio === '9:16' && 'aspect-h-16 aspect-w-9',
              desktopAspectRatio === '16:9' && 'lg:aspect-h-9 lg:aspect-w-16',
              desktopAspectRatio === '4:3' && 'lg:aspect-h-3 lg:aspect-w-4',
              desktopAspectRatio === '21:9' && 'lg:aspect-w-21 lg:aspect-h-9'
            )}
          >
            <Card
              card={card}
              sizes={
                cardCount === 2
                  ? `(min-width: 768px) 100vw, 50vw`
                  : `(min-width: 768px) 100vw, 33.33vw`
              }
            />
          </div>
        ))}
      </Container>
    </Section>
  );
};
