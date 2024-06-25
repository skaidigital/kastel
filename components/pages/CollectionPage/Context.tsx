'use client'

import { createContext, useContext, useState } from 'react'

export type CollectionContextType = {
  productsPerRow: number
  numberOfProducts: number
  setProductsPerRow: (productsPerRow: number) => void
  setNumberOfProducts: (numberOfProducts: number) => void
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined)

export const CollectionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsPerRow, setProductsPerRow] = useState<number>(2)
  const [numberOfProducts, setNumberOfProducts] = useState<number>(0)

  return (
    <CollectionContext.Provider
      value={{
        productsPerRow,
        numberOfProducts,
        setProductsPerRow,
        setNumberOfProducts
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollectionContext = () => {
  const context = useContext(CollectionContext)
  if (!context) {
    throw new Error('useCollectionContext must be used within a CollectionContextProvider')
  }
  return context
}
