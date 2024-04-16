'use client';

import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { KastelClubSectionProps } from '@/components/shared/PageBuilder/hooks';

interface PropsWithExtra extends KastelClubSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

export const KastelClubSection = ({ data }: Props) => {
  const {
    index,
    pageId,
    pageType,
    title,
    description,
    buttonText,
    backgroundImage,
    steps,
    sectionSettings
  } = data;

  console.log(title);
  console.log(description);
  console.log(buttonText);
  console.log(backgroundImage);
  console.log(steps);
  console.log(sectionSettings);

  return (
    <Section
      label="ugcSection"
      srHeading="UGC videos"
      noTopPadding={!sectionSettings?.hasTopPadding}
      noBottomPadding={!sectionSettings?.hasBottomPadding}
      hasBottomBorder={sectionSettings?.hasBottomBorder}
    >
      <Container className="hidden grid-cols-4 grid-rows-2 lg:grid">
        <div className="grid-cols-4 grid-rows-2 bg-[red]">stuff</div>
      </Container>
    </Section>
  );
};
