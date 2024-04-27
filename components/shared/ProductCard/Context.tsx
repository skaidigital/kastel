'use client';

import { colorWaySchema } from '@/lib/sanity/validators';
import { createContext, useContext, useState } from 'react';

export type ProductCardContextType = {
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  activeColorway: colorWaySchema | undefined;
  setActiveColorway: (colorway: colorWaySchema) => void;
};

const ProductCardContext = createContext<ProductCardContextType | undefined>(undefined);

export const ProductCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeColorway, setActiveColorway] = useState<colorWaySchema | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ProductCardContext.Provider
      value={{ isHovered, setIsHovered, activeColorway, setActiveColorway }}
    >
      {children}
    </ProductCardContext.Provider>
  );
};

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);

  if (!context) {
    throw new Error('useProductCardContext must be used within a ProductCardProvider');
  }

  return context;
};
