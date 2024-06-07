'use client';

import { Button } from '@/components/Button';
import { useCartContext } from '@/components/CartContext';
import { AddToCartButton } from '@/components/ProductForm/AddToCartButton';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import * as Portal from '@radix-ui/react-portal';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  productId: string;
  productType: Product['type'];
  productTitle: string;
  variants: ProductVariant[];
  addToCartText: string;
  selectSizeText: string;

  children: React.ReactNode;
}

export function MobileAddToCartDrawer({
  productId,
  productType,
  productTitle,
  variants,
  addToCartText,
  selectSizeText,
  children
}: Props) {
  const { ref, inView } = useInView({
    rootMargin: '200px 0px 600px 0px'
  });
  const { mobileDrawerOpen: isOpen, setMobileDrawerOpen: setIsOpen } = useCartContext();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (inView === false) {
      setIsOpen(true);
    }
    if (inView === true) {
      setIsOpen(false);
    }
  }, [inView]);

  const activeVariant = useActiveVariant({
    variants,
    productType
  });

  const id = activeVariant?.id;

  function handleSizeSelectionClick() {
    const sizeSelectionElement = document.getElementById('product-form');
    if (sizeSelectionElement) {
      sizeSelectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  if (isDesktop) {
    return <>{children}</>;
  }

  return (
    <div data-id="test" ref={ref}>
      {children}
      {isOpen && (
        <Portal.Root>
          <div
            aria-hidden={!isOpen}
            data-state={isOpen ? 'open' : 'closed'}
            className="fixed left-0 top-0 isolate z-20 w-full border-b border-brand-light-grey bg-white p-4 transition-all data-[state=closed]:animate-drawer-top-hide data-[state=open]:animate-drawer-top-show"
            style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
          >
            {id ? (
              <AddToCartButton
                productId={productId}
                productTitle={productTitle}
                productType={productType}
                variants={variants}
                addToCartText={addToCartText}
                selectSizeText={selectSizeText}
              />
            ) : (
              <Button onClick={handleSizeSelectionClick} size="sm" className="w-full">
                {selectSizeText}
              </Button>
            )}
          </div>
        </Portal.Root>
      )}
    </div>
  );
}
