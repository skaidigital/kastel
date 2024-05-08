import { Badge } from '@/components/Badge';
import { ProductReview } from '@/components/lipscore/hooks';
import { RatingStars } from '@/components/pages/ProductPage/ProductReviews/RatingStars';
import { cn } from '@/lib/utils';

// TODO translate
export function ReviewItem({ review, className }: { review: ProductReview; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
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
