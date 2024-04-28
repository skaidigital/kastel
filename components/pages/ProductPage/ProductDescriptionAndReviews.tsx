import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';

interface Props {
  title: string;
  description: string;
}

export function ProductDescriptionAndReviews({ title, description }: Props) {
  return (
    <Section
      srHeading="Product Description"
      label="product-description"
      hasBottomBorder={false}
      className="my-10 lg:mx-auto lg:max-w-[720px]"
    >
      <Container>
        <h2 className="leaing-[24px] text-pretty text-center text-[20px] font-bold uppercase text-brand-primary lg:text-heading-sm">
          {title}
        </h2>
        <div className="mt-4 px-4 lg:mt-6 lg:px-16">
          <p className="mb-6 text-center text-sm lg:text-md">{description}</p>
          {/* <p>Kundeanmeldelser</p> */}
        </div>
      </Container>
    </Section>
  );
}
