import { AccountPageHeader } from '@/components/account/AccountPageHeader'
import { EmptyState } from '@/components/account/EmptyState'
import { Container } from '@/components/base/Container'
import { WishlistProductsProps } from '@/components/pages/WishlistPage/hooks'
import { ProductCard } from '@/components/shared/ProductCard'
import { LangValues, ROUTES } from '@/data/constants'
import { cn } from '@/lib/utils'
import HeartIcon from '@heroicons/react/20/solid/HeartIcon'

interface Props {
  lang: LangValues
  products?: WishlistProductsProps
}

export function WishlistPage({ lang, products }: Props) {
  const hasWishlistItems = products && products?.length > 0

  const wishlistString = getWishlistString(lang)
  const youHaveNoItemsInYourWishlistString = getYouHaveNoItemsInYourWishlist(lang)
  const startShoppingString = getStartShopping(lang)

  const priorityIndexes = [0, 1, 2, 3]

  return (
    <div className="flex flex-col">
      <Container className={cn('mt-6 lg:mt-10', hasWishlistItems ? 'xl:px-0' : '')}>
        <AccountPageHeader lang={lang} pageTitle={wishlistString} />
      </Container>
      {!hasWishlistItems && (
        <Container className="mb-20">
          <EmptyState
            heading={youHaveNoItemsInYourWishlistString}
            text={startShoppingString}
            icon={<HeartIcon className="size-4" />}
            href={ROUTES.HOME}
          />
        </Container>
      )}
      {hasWishlistItems && (
        <div className="mb-20 grid grid-cols-2 lg:mb-40 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              product={product}
              priority={priorityIndexes.includes(index) ? true : false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function getWishlistString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Ønskeliste'
    case 'en':
      return 'Wishlist'
    default:
      return 'Wishlist'
  }
}

function getYouHaveNoItemsInYourWishlist(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Du har ingen varer i ønskelisten din'
    case 'en':
      return 'You have no items in your wishlist'
    default:
      return 'You have no items in your wishlist'
  }
}

function getStartShopping(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Start å handle'
    case 'en':
      return 'Start shopping'
    default:
      return 'Start shopping'
  }
}
