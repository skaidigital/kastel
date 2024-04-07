import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { CollectionListingProps } from '@/components/shared/PageBuilder/hooks';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductCarousel } from '@/components/shared/ProductCarousel';

interface Props {
  data: CollectionListingProps;
}

export const CollectionListing = ({ data }: Props) => {
  const { title, collections, padding, hasTopPadding, hasBottomPadding, hasBottomBorder } = data;

  return (
    <Section
      size={padding}
      noTopPadding={!hasTopPadding}
      noBottomPadding={!hasBottomPadding}
      label="page-title"
      srHeading="Page title"
      className={hasBottomBorder ? 'border-b border-brand-border' : ''}
    >
      <Container>
        <ProductCarousel heading={title}>
          {collections?.map((item, index) => (
            <ProductCard
              key={`${item.collection.title}-${index}`}
              title={item.collection.title}
              slug={item.collection.slug}
              image={item.image}
              slugPrefix="collections"
              className={`keen-slider__slide number-slide-${index}`}
            />
          ))}
        </ProductCarousel>
      </Container>
    </Section>
  );
};
