import { Dictionary } from '@/app/dictionaries';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { ProductCard } from '@/components/shared/ProductCard';
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
        <Carousel
          opts={{
            align: 'start'
          }}
        >
          <div className="mb-10 flex justify-between">
            <h2 className="text-heading-md font-bold uppercase lg:text-heading-xl">
              We reccommend
            </h2>
            <div className="hidden gap-x-2 lg:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
          <CarouselContent className="-ml-0">
            {data?.map((product) => (
              <CarouselItem key={product.title} className="basis-[80%] pl-0 lg:basis-[25%]">
                <ProductCard
                  type="product"
                  title={product.title}
                  gid={product.gid}
                  sku={product.sku}
                  slug={product.slug}
                  mainImage={product.mainImage}
                  lifestyleImage={product.lifestyleImage}
                  maxVariantPrice={product.maxVariantPrice}
                  minVariantPrice={product.minVariantPrice}
                  badges={product.badges}
                  sizes={product.sizes}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </Section>
  );
};
