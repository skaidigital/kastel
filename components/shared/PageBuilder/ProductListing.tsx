import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { ProductListingProps } from '@/components/shared/PageBuilder/hooks';
import { vercelStegaCleanAll } from '@sanity/client/stega';

interface Props {
  data: ProductListingProps;
}

export const ProductListing = ({ data }: Props) => {
  const {
    title,
    products,
    padding,
    // padding: paddingInitial,
    hasTopPadding: hasTopPaddingInitial,
    hasBottomPadding: hasBottomPaddingInitial,
    hasBottomBorder: hasBottomBorderInitial
  } = data;

  // const padding = vercelStegaCleanAll(paddingInitial);
  const hasTopPadding = vercelStegaCleanAll(hasTopPaddingInitial);
  const hasBottomPadding = vercelStegaCleanAll(hasBottomPaddingInitial);
  const hasBottomBorder = vercelStegaCleanAll(hasBottomBorderInitial);

  return (
    <Section
      size={padding}
      noTopPadding={!hasTopPadding}
      noBottomPadding={!hasBottomPadding}
      label="page-title"
      srHeading="Page title"
      className={hasBottomBorder ? 'border-brand-border border-b' : ''}
    >
      <Container>
        {/* <ProductCarousel heading={title}>
          {products?.map((product, index) => (
            <ProductCard
              key={`${product.title}-${index}`}
              title={product.title}
              slug={product.slug}
              image={product.image}
              hoverImage={product.hoverImage}
              badges={product.badges}
              className={`keen-slider__slide transform-gpu number-slide-${index} min-w-[50%] max-w-[50%] transform-gpu lg:min-w-[25%] lg:max-w-[25%]`}
            />
          ))}
        </ProductCarousel> */}
      </Container>
    </Section>
  );
};
