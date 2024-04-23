import { logIn } from '@/lib/shopify/customer/actions';
import { addItemToWishlist } from '@/lib/shopify/metafields/adjustItemInWishlist';
import { isItemInWishlist } from '@/lib/shopify/metafields/isItemInWishlist';
import { useUser } from '@/lib/useUser';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/20/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

interface Props {
  gid: string;
}

// TODO make a client component for the button itself
export async function Wishlist({ gid }: Props) {
  const { isLoggedIn } = useUser();
  console.log(isLoggedIn);

  let isInWishlist = false;

  // if (!isLoggedIn) {
  //   await logIn();
  // }

  if (isLoggedIn) {
    console.log('Logged in');

    isInWishlist = await isItemInWishlist(gid);
  }

  async function handleClick() {
    if (!isLoggedIn) {
      await logIn();
    }
    const customerGid = 'gid://shopify/Customer/7760828006629';
    const response = await addItemToWishlist(customerGid, gid);
    console.log(response);
  }
  console.log(isInWishlist);

  return (
    <div
      // onClick={handleClick}
      className="z-50 flex items-center justify-center rounded-full bg-white p-2"
    >
      {isInWishlist ? (
        <HeartIconFilled className="size-4" />
      ) : (
        <HeartIconOutline className="size-4" />
      )}
    </div>
  );
}

export function WishlistFallback() {
  return (
    <div className="z-50 flex items-center justify-center rounded-full bg-white p-2">
      <HeartIconOutline className="size-4" />
    </div>
  );
}
