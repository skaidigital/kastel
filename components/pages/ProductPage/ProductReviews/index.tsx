'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { ProductReview, getProductReviews } from '@/components/lipscore/hook';
import { PRODUCT_PAGE_REVIEWS_PAGE_SIZE } from '@/data/constants';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  lipscoreProductId: string;
}

export function ProductReviews({ lipscoreProductId }: Props) {
  const [page, setPage] = useState(1);

  const { data, error, isFetching } = useQuery({
    queryKey: ['productReviews', page],
    queryFn: () => getProductReviews(lipscoreProductId, page)
  });

  if (error) {
    console.error(error);
    return null;
  }

  const pageSize = PRODUCT_PAGE_REVIEWS_PAGE_SIZE;
  const hasPreviousPage = page > 1;
  const hasNextPage = data && data?.length >= pageSize;

  return (
    <div className="w-full">
      <Accordion type="single" id="reviews" collapsible>
        <AccordionItem value="reviews">
          <AccordionTrigger>
            <h1>Reviews</h1>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-y-10">
              {data?.map((review) => <ReviewItem key={review.created_at} review={review} />)}
            </ul>
            <div className="mt-6 flex items-center justify-center gap-x-2 lg:mt-10">
              <Button
                size="sm"
                variant="primary"
                onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                isLoading={isFetching}
                disabled={!hasPreviousPage || isFetching}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                isLoading={isFetching}
                disabled={!hasNextPage || isFetching}
              >
                Next
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function ReviewItem({ review }: { review: ProductReview }) {
  return (
    <div className="flex flex-col gap-y-4 border-b border-brand-light-grey pb-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-2">
          <span className="text-sm font-semibold">{review.user.short_name}</span>
          <RatingStars rating={Number(review.rating)} />
        </div>
        <div>{review.internal_order_id ? <Badge>Verified</Badge> : null}</div>
      </div>
      <div>
        <div className="text-sm text-brand-mid-grey">
          <span dangerouslySetInnerHTML={{ __html: review.text }}></span>
        </div>
      </div>
    </div>
  );
}

function RatingStar() {
  return <StarFilledIcon className="size-4 text-brand-primary" />;
}

function RatingStars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  const filledStars = stars.slice(0, rating);

  return (
    <div className="flex items-center">
      {filledStars.map((star) => (
        <RatingStar key={star} />
      ))}
      {stars.length > filledStars.length && <RatingStar />}
    </div>
  );
}
