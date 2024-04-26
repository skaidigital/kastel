import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { EmptyState } from '@/components/account/EmptyState';
import { Container } from '@/components/base/Container';
import { LangValues, ROUTES } from '@/data/constants';
import HeartIcon from '@heroicons/react/20/solid/HeartIcon';

interface Props {
  lang: LangValues;
}

export function WishlistPage({ lang }: Props) {
  const hasWishlistItems = false;

  const wishlistString = getWishlistString(lang);
  const youHaveNoItemsInYourWishlistString = getYouHaveNoItemsInYourWishlist(lang);
  const startShoppingString = getStartShopping(lang);

  return (
    <div className="flex flex-col">
      <Container className="mt-6 lg:mt-10">
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
      {hasWishlistItems && <div>has items here</div>}
    </div>
  );
}

function getWishlistString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Ønskeliste';
    case 'en':
      return 'Wishlist';
    default:
      return 'Wishlist';
  }
}

function getYouHaveNoItemsInYourWishlist(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Du har ingen varer i ønskelisten din';
    case 'en':
      return 'You have no items in your wishlist';
    default:
      return 'You have no items in your wishlist';
  }
}

function getStartShopping(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Start å handle';
    case 'en':
      return 'Start shopping';
    default:
      return 'Start shopping';
  }
}
