'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import {
  addItemToWishlist,
  removeItemFromWishlist
} from '@/lib/shopify/metafields/adjustItemInWishlist';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  itemIsInWislist: boolean;
  isLoggedIn: boolean;
  gid: string;
  className?: string;
  disabled?: boolean;
}

export function WishlistButton({ children, itemIsInWislist, isLoggedIn, gid, className }: Props) {
  const router = useRouter();
  const { lang } = useBaseParams();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (itemIsInWislist) {
      const response = await removeItemFromWishlist(gid).then(() => router.refresh());
      return response;
    }

    const response = await addItemToWishlist(gid).then(() => router.refresh());
    return response;
  }

  const addToWishlistString = getAddToWishlistString(lang);
  const youHaveToBeLoggedInString = getYouHaveToBeLoggedInString(lang);

  if (!isLoggedIn) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger title={addToWishlistString} className="cursor-not-allowed">
            {children}
          </TooltipTrigger>
          <TooltipContent>{youHaveToBeLoggedInString}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={cn('z-10 rounded-full bg-white p-2', className)}
      title={addToWishlistString}
    >
      {children}
    </button>
  );
}

function getAddToWishlistString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Legg til ønskeliste';
    case 'en':
      return 'Add to wishlist';
    default:
      return 'Add to wishlist';
  }
}

function getYouHaveToBeLoggedInString(lang: LangValues) {
  switch (lang) {
    case 'no':
      return 'Du må være logget inn for å legge til i ønskelisten';
    case 'en':
      return 'You have to be logged in to add to wishlist';
    default:
      return 'You have to be logged in to add to wishlist';
  }
}
