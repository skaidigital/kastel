'use client';

import { Button } from '@/components/Button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { Container } from '@/components/base/Container';
import { SectionItem } from '@/components/pages/KastelClubPage/SectionItem';
import { KastelClubSectionProps } from '@/components/pages/KastelClubPage/hooks';
import { SanityLink } from '@/components/sanity/SanityLink';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface Props {
  section: KastelClubSectionProps;
  className?: string;
}

// TODO add section tags
export function KastelClubPageSection({ section, className }: Props) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <Container className={cn('flex flex-col gap-y-20', className)}>
        <div className="flex flex-col gap-y-4 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <div className="flex max-w-xl flex-col gap-y-4">
            {section.title && (
              <h2 className="text-heading-lg font-bold uppercase lg:text-heading-xl">
                {section.title}
              </h2>
            )}
            {section.description && (
              <p className="text-md text-brand-mid-grey lg:text-lg">{section.description}</p>
            )}
          </div>
          <Button size="md" className="h-fit" asChild>
            {section.cta && <SanityLink link={section.cta}>{section.cta.text}</SanityLink>}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {section.items?.map((item) => <SectionItem key={item.title} item={item} />)}
        </div>
      </Container>
    );
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Carousel
        opts={{
          align: 'start'
        }}
        className={cn('ml-4 flex flex-col gap-y-10', className)}
      >
        <div className="flex max-w-xl flex-col gap-y-4">
          {section.title && (
            <h2 className="text-heading-lg font-bold uppercase lg:text-heading-xl">
              {section.title}
            </h2>
          )}
          {section.description && (
            <p className="text-balance text-md text-brand-mid-grey lg:text-lg">
              {section.description}
            </p>
          )}
        </div>
        <CarouselContent className="-ml-2">
          {section.items?.map((item, index) => (
            <CarouselItem
              key={item.title}
              className={cn('basis-[80%] pl-2', index === section.items.length - 1 && 'pr-4')}
            >
              <SectionItem key={item.title} item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Container>
        <Button size="sm" className="w-full" asChild>
          {section.cta && <SanityLink link={section.cta}>{section.cta.text}</SanityLink>}
        </Button>
      </Container>
    </div>
  );
}
