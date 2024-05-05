'use client';

import { createContext, useContext, useState } from 'react';

export type ShoePickerContextType = {
  activeTypeName: string;
  setActiveTypeName: (typeName: string) => void;
};

const ShoePickerContext = createContext<ShoePickerContextType | undefined>(undefined);

export const ShoePickerProvider = ({
  children,
  defaultValue
}: {
  children: React.ReactNode;
  defaultValue?: string;
}) => {
  const [activeTypeName, setActiveTypeName] = useState<string>(defaultValue || '');

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
