import { getProductRatingBySku } from './hooks'

interface Props {
  sku: string
}

export async function ProductRating({ sku }: Props) {
  const { rating, votes } = await getProductRatingBySku(sku)
  const roundedRating = parseFloat(rating).toFixed(1)
  return (
    <>
      (star) {roundedRating} ({formatNumberWithSpaces(votes)})
    </>
  )
}

function formatNumberWithSpaces(number: number) {
  return new Intl.NumberFormat('fr-FR').format(number)
}
