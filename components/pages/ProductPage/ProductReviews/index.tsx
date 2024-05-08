'use client';

import { Badge } from '@/components/Badge';
import { ProductReview, getProductReviews } from '@/components/lipscore/hook';
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
  // if (error) {
  //   console.error(error);
  //   return <h2>{error.message}</h2>;
  // }

  return (
    <div className="w-full">
      <h1>Reviews</h1>
      <ul className="flex flex-col gap-y-10">
        {data?.map((review) => <ReviewItem key={review.created_at} review={review} />)}
      </ul>
      <div>
        <button
          onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((currentPage) => currentPage + 1)}
          disabled={(data && data?.length < 10) || isFetching} // Assuming each page has 25 items, disable if fetched fewer.
        >
          Next
        </button>
        <p>Page {page}</p>
      </div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
}

function ReviewItem({ review }: { review: ProductReview }) {
  return (
    <div className="flex flex-col gap-y-2 border-b border-brand-light-grey pb-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-2">
          <span className="text-md font-semibold">{review.user.short_name}</span>
          <RatingStars rating={Number(review.rating)} />
        </div>
        <div>{review.internal_order_id ? <Badge>Verified</Badge> : null}</div>
      </div>
      <div>
        <span className="text-sm text-brand-mid-grey">
          text: <span dangerouslySetInnerHTML={{ __html: review.text }}></span>
        </span>
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
