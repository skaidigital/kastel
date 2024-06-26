import { AspectRatio } from '@/components/AspectRatio';
import { Media } from '@/components/Media';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { ConditionalSanityLink } from '@/components/sanity/ConditionalSanityLink';
import { CardSectionProps } from '@/components/shared/PageBuilder/hooks';
import { cn } from '@/lib/utils';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { createDataAttribute } from 'next-sanity';

interface PropsWithExtra extends CardSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const CardSection = ({ data }: Props) => {
  const { index, pageId, pageType, cards, aspectRatioSettings, sectionSettings } = data;

  const cardCount = cards?.length;
  const lgColCount = `lg:grid-cols-${cardCount}`;

  const dataAttribute = createDataAttribute({
    id: pageId,
    type: pageType
  });

  return (
    <Section
      label="cardSection"
      srHeading={`Section of cards`}
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <Container className={cn('grid grid-cols-1 gap-4', lgColCount)}>
        {cards?.map((card) => {
          const { link, media } = card;
          const Wrapper = link.hasLink === true ? ConditionalSanityLink : 'div';

          return (
            <Wrapper data-sanity={dataAttribute?.(['pageBuilder', index])} key={index} link={link}>
              <AspectRatio settings={aspectRatioSettings} className={cn(link.hasLink && 'group ')}>
                <Media media={{ ...media }} loading="lazy" />
                {link.hasLink && (
                  <div className="flex items-end justify-between">
                    <div className="z-[3] flex w-full items-end justify-between p-6 text-white lg:p-8">
                      {link.text && (
                        <h3 className="basis-2/3 text-heading-md font-bold uppercase lg:text-heading-xl">
                          {link.text}
                        </h3>
                      )}
                      <ArrowUpRightIcon className="size-10 shrink-0 text-white group-hover:mb-2 group-hover:transition-transform group-hover:duration-200 group-hover:ease-in-out lg:size-20" />
                    </div>
                  </div>
                )}
                {link.hasLink && (
                  <div className="z-2 absolute bottom-0 left-0 bg-gradient-to-t from-black/80 from-0% to-black/20 to-30%" />
                )}
              </AspectRatio>
            </Wrapper>
          );
        })}
      </Container>
    </Section>
  );
};
