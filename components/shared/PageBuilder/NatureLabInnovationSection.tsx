'use client';

import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { NatureLabInnovationSectionProps } from '@/components/shared/PageBuilder/hooks';

interface PropsWithExtra extends NatureLabInnovationSectionProps {
  index: number;
  pageId: string;
  pageType: string;
}

interface Props {
  data: PropsWithExtra;
}

// TODO will make a variant for Nature Lab headings
export const NatureLabInnovationSection = ({ data }: Props) => {
  const { index, pageId, pageType, title, description, innovations } = data;

  console.log(title);
  console.log(description);
  console.log(innovations);

  return (
    <Section
      label="natureLabInnoationSection"
      srHeading="Some innovations from Nature Lab that this product uses"
      className="bg-nature-lab-beige font-nature-lab-body"
    >
      <Container>v</Container>
    </Section>
  );
};
