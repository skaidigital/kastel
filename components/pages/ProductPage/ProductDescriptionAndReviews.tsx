import { Container } from '@/components/base/Container';
import { Heading } from '@/components/base/Heading';
import { Section } from '@/components/base/Section';
import { Text } from '@/components/base/Text';

interface Props {
  title: string;
  description: string;
}

export function ProductDescriptionAndReviews({ title, description }: Props) {
  return (
    <Section srHeading="Product Description" label="product-description">
      <Container size="md" className="">
        <Heading as="h3" size="md" className="text-center font-bold text-brand-primary">
          {title}
        </Heading>
        <div className="mt-4 px-4 lg:px-16">
          <Text as="p" size="md" className="mb-6 text-center text-brand-dark-grey">
            {description}
          </Text>
          <p>Kundeanmeldelser</p>
        </div>
      </Container>
    </Section>
  );
}
