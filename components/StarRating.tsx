import { Star } from '@/components/Star';

// Interface for StarRating component props
interface StarRatingProps {
  rating: number; // average rating out of 5
}

// StarRating component defined as a function
export function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialFill = (rating - fullStars) * 100;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} fill={100} />);
  }

  if (fullStars < 5) {
    stars.push(<Star key={fullStars} fill={partialFill} />);
  }

  while (stars.length < 5) {
    stars.push(<Star key={stars.length} fill={0} />);
  }

  return <div className="flex">{stars}</div>;
}
