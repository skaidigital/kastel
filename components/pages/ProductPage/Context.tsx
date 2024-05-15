'use client';

// context with activeGender
import { createContext, useContext, useMemo, useState } from 'react';

export type ProductPageContextType = {
  activeGender: string;
  setActiveGender: (gender: string) => void;
  showProductDescription: boolean;
  setShowProductDescription: (show: boolean) => void;
};

const ProductPageContext = createContext<ProductPageContextType | undefined>(undefined);

export const ProductPageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeGender, setActiveGender] = useState<string>('female');
  const [showProductDescription, setShowProductDescription] = useState<boolean>(true);

  const contextValue = useMemo(() => {
    return {
      activeGender,
      setActiveGender,
      showProductDescription,
      setShowProductDescription
    };
  }, [activeGender, setActiveGender, showProductDescription]);

  return <ProductPageContext.Provider value={contextValue}>{children}</ProductPageContext.Provider>;
};

export const useProductPageContext = () => {
  const context = useContext(ProductPageContext);
  if (!context) {
    throw new Error('useActiveGender must be used within a ActiveGenderProvider');
  }
  return context;
};
