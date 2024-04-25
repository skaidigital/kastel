import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';

interface Props {
  title: string;
  description: string;
}

export function ProductDescriptionAndReviews({ title, description }: Props) {
  return (
    <Section srHeading="Product Description" label="product-description" hasBottomBorder={false}>
      <Container size="md" className="">
        <Heading as="h2" size="sm" className="text-center font-bold text-brand-primary">
          {title}
        </Heading>
        <div className="mt-4 px-4 lg:px-16">
          <p className="mb-6  text-center text-sm lg:text-md">{description}</p>
          <p>Kundeanmeldelser</p>
        </div>
      </Container>
    </Section>
  );
}
