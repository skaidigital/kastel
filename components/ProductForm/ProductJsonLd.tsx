import { getProductInventory } from './hooks'

interface Props {
  productId: string
  title: string
  description?: string
  image?: string
}

export async function ProductJsonLd({ productId, title, description, image }: Props) {
  const response = await getProductInventory(productId)

  if (!response) return null

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description,
    image,
    offers: {
      '@type': 'AggregateOffer',
      availability: response.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: response.priceRange.minVariantPrice.currencyCode,
      highPrice: response.priceRange.maxVariantPrice?.amount,
      lowPrice: response.priceRange.minVariantPrice?.amount
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productJsonLd)
      }}
    />
  )
}
