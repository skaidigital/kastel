import { CarouselItem } from '@/components/Carousel';
import { TestimonialCarousel } from '@/components/SiteReviews/TestimonialCarousel';
import { Container } from '@/components/base/Container';
import { Section } from '@/components/base/Section';
import { getServiceReview } from '@/components/lipscore/hooks';
import { ReviewItem } from '@/components/pages/ProductPage/ProductReviews/ReviewItem';
import Image from 'next/image';

export async function SiteReviews() {
  const data = await getServiceReview();

  const formattedRating = Number(data?.rating)?.toFixed(1);

  return (
    <Section label="siteReviews" srHeading="Site reviews" size="sm">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-x-40">
          <div className="mb-20 flex flex-col gap-y-2 lg:mb-0">
            <div className="flex items-end gap-x-1">
              {formattedRating && (
                <span className="text-heading-2xl font-bold uppercase">{formattedRating}</span>
              )}
              <span className="text-heading-sm font-bold uppercase">/5</span>
            </div>
            <span className="text-md">Based on {data?.votes} votes</span>
            <Image src="/images/lipscore-logo.png" alt="Lipscore logo" width={160} height={160} />
          </div>
          <div className="flex flex-col gap-y-6 lg:max-w-xl lg:gap-y-10">
            <TestimonialCarousel count={data?.reviews?.length}>
              {data?.reviews?.map((review) => (
                <CarouselItem key={review.created_at} className="basis-full pl-0 ">
                  <ReviewItem review={review} />
                </CarouselItem>
              ))}
            </TestimonialCarousel>
          </div>
        </div>
      </Container>
    </Section>
  );
}
