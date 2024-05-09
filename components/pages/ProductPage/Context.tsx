'use client';

// context with activeGender
import { createContext, useContext, useState } from 'react';

export type ProductPageContextType = {
  activeGender: string;
  setActiveGender: (gender: string) => void;
};

const ProductPageContext = createContext<ProductPageContextType | undefined>(undefined);

export const ProductPageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeGender, setActiveGender] = useState<string>('female');

  return (
    <ProductPageContext.Provider value={{ activeGender, setActiveGender }}>
      {children}
    </ProductPageContext.Provider>
  );
};

export const useProductPageContext = () => {
  const context = useContext(ProductPageContext);
  if (!context) {
    throw new Error('useActiveGender must be used within a ActiveGenderProvider');
  }
  return context;
};
