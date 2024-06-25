import { StarFilledIcon } from '@radix-ui/react-icons'

function RatingStar() {
  return <StarFilledIcon className="size-4 text-brand-primary" />
}

export function RatingStars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1)
  const filledStars = stars.slice(0, rating)

  return (
    <div className="flex items-center">
      {filledStars.map((star) => (
        <RatingStar key={star} />
      ))}
      {stars.length > filledStars.length && <RatingStar />}
    </div>
  )
}
