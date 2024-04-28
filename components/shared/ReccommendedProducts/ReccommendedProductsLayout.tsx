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
              {dictionary.we_think_you_will_like}
            </h2>
            <div className="hidden gap-x-2 lg:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
          <CarouselContent className="-ml-0">
            {data?.map((product, index) => (
              <CarouselItem
                key={product.title + index}
                className="-pl-0 basis-[80%] lg:basis-[25%]"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </Section>
  );
};
