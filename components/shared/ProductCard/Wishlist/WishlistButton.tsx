'use client';

import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger
} from '@/components/HybridTooltip';
import { TooltipProvider } from '@/components/Tooltip';
import { revalidateWishlistProducts } from '@/components/shared/ProductCard/Wishlist/actions';
import { LangValues } from '@/data/constants';
import { useBaseParams } from '@/lib/hooks/useBaseParams';
import {
  addItemToWishlist,
  removeItemFromWishlist
} from '@/lib/shopify/metafields/adjustItemInWishlist';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  itemIsInWislist: boolean;
  isLoggedIn: boolean;
  gid: string;
  className?: string;
  disabled?: boolean;
}

export function WishlistButton({ children, itemIsInWislist, isLoggedIn, gid, className }: Props) {
  const { lang } = useBaseParams();
  const [isShown, setIsShown] = useState<boolean>(false);
  const queryClient = useQueryClient();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (itemIsInWislist) {
      const response = await removeItemFromWishlist(gid);
      queryClient.invalidateQueries({ queryKey: ['isItemInWishlist', gid] });
      await revalidateWishlistProducts();
      return response;
    }

    const response = await addItemToWishlist(gid);
    queryClient.invalidateQueries({ queryKey: ['isItemInWishlist', gid] });
    await revalidateWishlistProducts();
    return response;
  }

  const addToWishlistString = getAddToWishlistString(lang);
  const youHaveToBeLoggedInString = getYouHaveToBeLoggedInString(lang);

  if (!isLoggedIn) {
    return (
      <TooltipProvider delayDuration={0}>
        <HybridTooltip open={isShown} onOpenChange={setIsShown}>
          <HybridTooltipTrigger
            title={addToWishlistString}
            className={cn('cursor-not-allowed', className)}
            onClick={(e) => {
              e.preventDefault();
              setIsShown(true);
            }}
          >
            {children}
          </HybridTooltipTrigger>
          <HybridTooltipContent className="bg-white">
            {youHaveToBeLoggedInString}
          </HybridTooltipContent>
        </HybridTooltip>
      </TooltipProvider>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      className={cn('z-20 rounded-full bg-white p-2', className)}
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
