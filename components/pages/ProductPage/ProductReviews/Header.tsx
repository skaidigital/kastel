import { Button } from '@/components/Button';
import { Heading } from '@/components/base/Heading';
import { getProductReviewLinkJunip } from '@/components/pages/ProductPage/ProductReviews/ProductReviews.hooks';
import { StarRating } from '@/components/pages/ProductPage/StarRating';

export interface ReviewHeaderProps {
  data: {
    rating_average: number;
    rating_count: number;
    rating_distribution: {
      [key: number]: number;
    };
  };
}

export const Header = ({ data }: ReviewHeaderProps) => {
  const { rating_average, rating_count, rating_distribution } = data;

  return (
    <div className="flex flex-col items-center text-center">
      <Heading as="h2" size="md">
        Vurderinger & Anmeldelser
      </Heading>
      <div className="mb-56 mt-24 flex gap-x-56">
        <RatingSummary averageScore={rating_average} amount={rating_count} />
        {rating_distribution && rating_count && (
          <RatingDistribution data={rating_distribution} amount={rating_count} />
        )}
      </div>
      <WriteReviewButton />
    </div>
  );
};

interface RatingSummaryProps {
  averageScore: number;
  amount: number;
}

const RatingSummary = ({ averageScore, amount }: RatingSummaryProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {averageScore && (
        <>
          <Heading as="h2" size="sm">
            {averageScore.toFixed(2)}
          </Heading>
          <StarRating rating={Math.round(averageScore)} />
        </>
      )}
      <span className="text-paragraph-small mt-8">{amount} anmeldelser</span>
    </div>
  );
};

interface RatingDistributionProps {
  data: {
    [key: number]: number;
  };
  amount: number;
}

const RatingDistribution = ({ data, amount }: RatingDistributionProps) => {
  return (
    <div className="w-160 flex flex-col">
      {data[5] && <RatingLine rating={5} amount={data[5]} total={amount} />}
      {data[4] && <RatingLine rating={4} amount={data[4]} total={amount} />}
      {data[3] && <RatingLine rating={3} amount={data[3]} total={amount} />}
      {data[2] && <RatingLine rating={2} amount={data[2]} total={amount} />}
      {data[1] && <RatingLine rating={1} amount={data[1]} total={amount} />}
    </div>
  );
};

interface RatingLineProps {
  rating: number;
  amount: number;
  total: number;
}

const RatingLine = ({ rating, amount, total }: RatingLineProps) => {
  const percentage = Number((amount / total) * 100).toFixed(2);

  return (
    <div className="flex items-center gap-x-8">
      <span className="text-paragraph-small">{rating}</span>
      <div className="w-100% bg-brand-header-grey border-1 flex h-12 border-brand-border">
        <div
          style={{ width: `${percentage}%`, maxWidth: '100%' }}
          className={`h-100% bg-brand-dark-grey`}
        />
      </div>
    </div>
  );
};

const WriteReviewButton = () => {
  const handleWriteReview = async () => {
    await getProductReviewLinkJunip('2784333').then((response) => {
      window.open(response, '_blank');
    });
  };

  return (
    <Button type="button" onClick={handleWriteReview}>
      Skriv en anmeldelse
    </Button>
  );
};
