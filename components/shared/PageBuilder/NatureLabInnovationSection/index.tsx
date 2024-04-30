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
// ? Add section settingsn
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
      <Container className="mb-10 flex flex-col gap-y-4 lg:mb-20 lg:flex-row lg:justify-between lg:gap-y-0">
        {title && (
          <h2 className="font-nature-lab-heading text-nature-lab-heading-lg uppercase lg:max-w-lg lg:text-nature-lab-heading-xl">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-nature-lab-md text-brand-mid-grey lg:max-w-lg lg:text-nature-lab-lg">
            {description}
          </p>
        )}
      </Container>
      {/* Mobile carousel */}

      {/* Desktop grid */}
    </Section>
  );
};
