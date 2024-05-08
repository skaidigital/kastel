import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { getProductIdSku, getProductReviews } from '@/components/lipscore/hook';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { ProductReviews } from './ProductReviews';

interface Props {
  title: string;
  description: string;
  sku: string;
}

export async function ProductDescriptionAndReviews({ title, description, sku }: Props) {
  console.log(sku);
  const queryClient = new QueryClient();

  const lipscoreProductId = await getProductIdSku(sku);
  console.log(lipscoreProductId);
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ['productReviews', page],
    queryFn: () => getProductReviews(String(lipscoreProductId), page)
  });

  return (
    <Section
      srHeading="Product Description"
      label="product-description"
      hasBottomBorder={false}
      className="my-10 lg:mx-auto "
    >
      <Container className="lg:max-w-[720px]">
        <h2 className="leaing-[24px] text-pretty text-center text-[20px] font-bold uppercase text-brand-primary lg:text-heading-sm">
          {title}
        </h2>
        <div className="mt-4 px-4 lg:mt-6 lg:px-16">
          <p className="mb-6 text-center text-sm lg:text-md">{description}</p>
        </div>
      </Container>
      <Container className="lg:max-w-[960px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductReviews lipscoreProductId={String(lipscoreProductId)} />
        </HydrationBoundary>
      </Container>
    </Section>
  );
}
