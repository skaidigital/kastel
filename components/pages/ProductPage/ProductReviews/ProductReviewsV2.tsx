'use client';

import { getProductReviews } from '@/components/lipscore/hook';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface ProductReviewProps {
  lipscoreProductId: string;
}

export function ProductReviews({ lipscoreProductId }: ProductReviewProps) {
  const [page, setPage] = useState(1); // Initializing page state
  const { data, error, isFetching } = useQuery({
    queryKey: ['productReviews', page],
    queryFn: () => getProductReviews(lipscoreProductId, page)
  });

  if (error) {
    console.error(error);
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="w-full">
      <h1>Reviews</h1>
      <table>
        {data?.map((review) => (
          <tr key={review.created_at}>
            <td>User: {review.user.short_name}</td>
            <td>Rating: {review.rating}</td>
            <td>Date: {review.created_at}</td>
            <td>Verified: {review?.internal_order_id ? 'true' : 'false'}</td>
            <td>
              text: <span dangerouslySetInnerHTML={{ __html: review.text }}></span>
            </td>
          </tr>
        ))}
      </table>
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
