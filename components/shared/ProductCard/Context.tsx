'use client';

import { createContext, useContext, useState } from 'react';

export type ProductCardContextType = {
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
};

const ProductCardContext = createContext<ProductCardContextType | undefined>(undefined);

export const ProductCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ProductCardContext.Provider value={{ isHovered, setIsHovered }}>
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
