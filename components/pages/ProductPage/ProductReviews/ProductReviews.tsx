'use client';

import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { ReviewHeaderProps } from '@/components/pages/ProductPage/ProductReviews/Header';
import { ReviewItemProps } from '@/components/pages/ProductPage/ProductReviews/Items';

export interface ProductReviewProps {
  data: {
    overview: ReviewHeaderProps;
    reviews: {
      product_reviews: ReviewItemProps[];
      meta: {
        page: {
          after: string;
        };
      };
    };
  };
  productId: string;
}

export const ProductReviews = () => {
  // const { overview } = data;
  // const { meta, product_reviews } = data.reviews;

  // const [reviews, setReviews] = useState(product_reviews);
  // const [reviewPage, setReviewPage] = useState(meta?.page?.after);
  // const [searchParams, setSearchParams] = useState('&page[size]=5');

  // const handleGetMoreReviews = async () => {
  //   try {
  //     await getProductReviewsNextJunip(
  //       productId,
  //       searchParams || '',
  //       reviewPage
  //     ).then((response) => {
  //       setReviewPage(response.meta.page.after);
  //       setReviews([...reviews, response.product_reviews].flat());
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="border-t border-brand-border">
      <Section srHeading="Product reviews" label="reviews">
        <Container className="lg:w-[800px]">
          {/* <Header data={overview} />
          <SubHeader
            productId={productId}
            setReviews={setReviews}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setReviewPage={setReviewPage}
          />
          <Items data={reviews} onClick={handleGetMoreReviews} /> */}
        </Container>
      </Section>
    </div>
  );
};
