import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { PageTitleProps } from '@/components/shared/PageBuilder/hooks';

interface Props {
  data: PageTitleProps;
}

export const PageTitle = ({ data }: Props) => {
  const { title, subtitle } = data;

  return (
    <Section size="sm" label="page-title" srHeading="Page title">
      <Container className="flex flex-col items-center justify-center space-y-5">
        {title && (
          <Heading as="h1" size="lg">
            {title}
          </Heading>
        )}
        {subtitle && (
          <Heading as="h2" size="sm">
            {subtitle}
          </Heading>
        )}
      </Container>
    </Section>
  );
};
