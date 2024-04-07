import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer';
import { TextSectionProps } from '@/components/shared/PageBuilder/hooks';

interface Props {
  data: TextSectionProps;
}

export const TextSection = ({ data }: Props) => {
  const { richText, padding, hasBottomPadding, hasTopPadding, hasBottomBorder } = data;

  return (
    <Section
      size={padding}
      noBottomPadding={!hasBottomPadding}
      noTopPadding={!hasTopPadding}
      label="text-section"
      srHeading="Text section"
      className={hasBottomBorder ? 'border-b border-brand-border' : ''}
    >
      <Container className="flex max-w-xl flex-col justify-center">
        <PortableTextRenderer value={richText} />
      </Container>
    </Section>
  );
};
