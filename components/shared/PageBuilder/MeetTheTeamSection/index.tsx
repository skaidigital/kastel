'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { TeamMember } from '@/components/shared/PageBuilder/MeetTheTeamSection/TeamMember';
import { MeetTheTeamSectionProps } from '@/components/shared/PageBuilder/hooks';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';

interface PropsWithExtra extends MeetTheTeamSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const MeetTheTeamSection = ({ data }: Props) => {
  const { title, people, sectionSettings } = data;

  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <Section
        label="meetTheTeam"
        srHeading="Meet the team"
        noTopPadding={!sectionSettings?.hasTopPadding}
        noBottomPadding={!sectionSettings?.hasBottomPadding}
        hasBottomBorder={sectionSettings?.hasBottomBorder}
      >
        <Container className="flex flex-col gap-y-10">
          {title && <h2 className="text-heading-xl font-bold uppercase">{title}</h2>}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {people?.map((person) => <TeamMember data={person} key={person.name} />)}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      label="meetTheTeam"
      srHeading="Meet the team"
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
      className="flex flex-col gap-y-10"
    >
      <Container>
        {title && <h2 className="text-heading-xl font-bold uppercase">{title}</h2>}
      </Container>
      <Carousel
        opts={{
          align: 'start'
        }}
      >
        <CarouselContent className="-ml-4 pl-4">
          {people?.map((person) => (
            <CarouselItem key={person.name} className="basis-[80%] pl-4">
              <TeamMember data={person} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
};
