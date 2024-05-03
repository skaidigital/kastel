'use client';

import { Button } from '@/components/Button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { Container } from '@/components/base/Container';
import { SectionItem } from '@/components/pages/KastelClubPage/SectionItem';
import { KastelClubSectionProps } from '@/components/pages/KastelClubPage/hooks';
import { useDeviceType } from '@/lib/useDeviceType';
import { cn } from '@/lib/utils';

interface Props {
  section: KastelClubSectionProps;
  className?: string;
}

// TODO add section tags
export function Section({ section, className }: Props) {
  const { isDesktop } = useDeviceType();

  if (isDesktop) {
    return (
      <Container className={cn('flex flex-col gap-y-20', className)}>
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
        <div className="grid grid-cols-4 gap-4">
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
        <Button size="sm" className="w-full">
          Something something
        </Button>
      </Container>
    </div>
  );
}
