import { Dictionary } from '@/app/dictionaries';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { ReccommendedProductPayload } from '@/components/shared/ReccommendedProducts/hooks';

interface Props {
  data: ReccommendedProductPayload;
  dictionary: Dictionary['reccommended_products'];
}

export const ReccommendedProductsLayout = ({ data, dictionary }: Props) => {
  return (
    <Section
      srHeading={dictionary.we_think_you_will_like || 'We can also reccommend'}
      label="reccommended-products"
      className="border-brand-border border-b"
    >
      <Container>
        {/* <ProductCarousel heading={dictionary.we_think_you_will_like}>
          {data?.map((product, index) => (
            <ProductCard
              key={`${product.title}-${index}`}
              title={product.title}
                                  gid={product.gid}
                    sku={product.sku}
              slug={product.slug}
              image={product.image}
              className={`keen-slider__slide number-slide-${index} max-w-[300px]`}
            />
          ))}
        </ProductCarousel> */}
      </Container>
    </Section>
  );
};
