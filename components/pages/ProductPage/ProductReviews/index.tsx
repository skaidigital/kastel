'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/Accordion';
import { Button } from '@/components/Button';
import { getProductReviews } from '@/components/lipscore/hooks';
import { ReviewItem } from '@/components/pages/ProductPage/ProductReviews/ReviewItem';
import { PRODUCT_PAGE_REVIEWS_PAGE_SIZE } from '@/data/constants';
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
              {data?.map((review) => (
                <ReviewItem
                  key={review.created_at}
                  review={review}
                  className="border-b border-brand-light-grey pb-5"
                />
              ))}
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
