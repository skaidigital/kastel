'use client';

import { Media } from '@/components/Media';
import { USPItem } from '@/components/USPItem';
import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { USPExplainerSectionProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';
import { PlusIcon } from '@radix-ui/react-icons';
import { createDataAttribute } from 'next-sanity';

interface PropsWithExtra extends USPExplainerSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

// TODO carousel / animation
export const USPExplainerSection = ({ data }: Props) => {
  const { index, pageId, pageType, content } = data;

  return (
    <div className="w-full">
      {content?.map((item) => (
        <Slide key={item.title} item={item} pageId={pageId} pageType={pageType} index={index} />
      ))}
    </div>
  );
};

interface SlideProps {
  item: USPExplainerSectionProps['content'][0];
  pageId: string;
  pageType: string;
  index: number;
}

function Slide({ item, pageId, pageType, index }: SlideProps) {
  // const container = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   target: container,
  //   offset: ['start end', 'start start']
  // });
  // const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const dataAttribute = createDataAttribute({
    id: pageId,
    type: pageType
  });

  return (
    <div className="relative flex w-full flex-col bg-brand-sand lg:h-dvh lg:flex-row">
      {/* Content container */}
      <Container className="sticky flex h-fit flex-col gap-y-6 py-10 lg:basis-1/3 lg:gap-y-10 lg:self-center lg:p-8">
        {item.usps && (
          <div className="flex items-center gap-x-6">
            {item.usps.map((usp) => {
              const isOnLastIndex = item.usps.indexOf(usp) === item.usps.length - 1;

              return (
                <div key={usp.title} className={cn('flex items-center gap-x-6')}>
                  <USPItem title={usp.title} image={usp.image} />
                  {!isOnLastIndex && <PlusIcon className="size-4 lg:size-6" />}
                </div>
              );
            })}
          </div>
        )}
        {item.title && (
          <Heading size="lg">
            <span className="text-balance">{item.title}</span>
          </Heading>
        )}
        {item.description && (
          <span
            className="max-w-md text-sm lg:text-md"
            dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br />') }}
          />
        )}
      </Container>
      <div
        data-sanity={dataAttribute?.(['pageBuilder', index])}
        className="relative bg-red-50 lg:basis-2/3"
      >
        <div className="aspect-h-4 aspect-w-3 relative h-full w-full lg:aspect-none">
          {item.media && (
            <Media media={item.media} loading="lazy" sizes="(max-width: 1024px) 100vw, 70vw" />
          )}
        </div>
      </div>
    </div>
  );
}
