// Context that activeTypeName as a string or undefined

import { createContext, useContext, useState } from 'react';

export type ShoePickerContextType = {
  activeTypeName: string | undefined;
  setActiveTypeName: (activeTypeName: string) => void;
};

const ShoePickerContext = createContext<ShoePickerContextType | undefined>(undefined);

export const ShoePickerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTypeName, setActiveTypeName] = useState<string | undefined>(undefined);

  return (
    <ShoePickerContext.Provider value={{ activeTypeName, setActiveTypeName }}>
      {children}
    </ShoePickerContext.Provider>
  );
};

export const useShoePickerContext = () => {
  const context = useContext(ShoePickerContext);

  if (!context) {
    throw new Error('useShoePickerContext must be used within a ShoePickerProvider');
  }

  return context;
};
