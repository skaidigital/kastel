'use client';

import { Button } from '@/components/Button';
import { AddToCartButton } from '@/components/ProductForm/AddToCartButton';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import * as Portal from '@radix-ui/react-portal';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  productId: string;
  productType: Product['type'];
  variants: ProductVariant[];
  inventory: ProductInventoryResponse;
  addToCartText: string;
  selectSizeText: string;

  children: React.ReactNode;
}

export function MobileAddToCartDrawer({
  productId,
  productType,
  variants,
  inventory,
  addToCartText,
  selectSizeText,
  children
}: Props) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: '200px'
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isInView === false) {
      setIsOpen(true);
    }
    if (isInView === true) {
      setIsOpen(false);
    }
  }, [isInView]);

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

  return (
    <div ref={containerRef}>
      {children}
      <Portal.Root>
        <div
          aria-hidden={!isOpen}
          data-state={isOpen ? 'open' : 'closed'}
          className="fixed bottom-0 left-0 isolate z-50 w-full border-t border-brand-light-grey bg-white p-4 data-[state=closed]:animate-drawer-bottom-hide data-[state=open]:animate-drawer-bottom-show"
        >
          {id ? (
            <AddToCartButton
              productId={productId}
              productType={productType}
              variants={variants}
              inventory={inventory}
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
    </div>
  );
}
