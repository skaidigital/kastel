import { Badge } from '@/components/Badge';
import { ProductReview } from '@/components/lipscore/hooks';
import { RatingStars } from '@/components/pages/ProductPage/ProductReviews/RatingStars';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import { cn } from '@/lib/utils';

export function ReviewItem({ review, className }: { review: ProductReview; className?: string }) {
  const { lang } = useBaseParams();
  const verifiedString = getVerifiedString(lang);

  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-2">
          <span className="text-sm font-semibold">{review.user.short_name}</span>
          <RatingStars rating={Number(review.rating)} />
        </div>
        <div>{review.internal_order_id ? <Badge>{verifiedString}</Badge> : null}</div>
      </div>
      <div>
        <div className="whitespace-break-spaces text-sm text-brand-mid-grey">
          <span dangerouslySetInnerHTML={{ __html: review.text }}></span>
        </div>
      </div>
    </div>
  );
}

function getVerifiedString(lang: LangValues) {
  switch (lang) {
    case 'en':
      return 'Verified';
    case 'no':
      return 'Bekreftet';
    default:
      return 'Verified';
  }
}
