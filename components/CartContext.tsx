'use client'

import { SelectedOption } from '@/components/pages/ProductPage/hooks'
import { Money } from '@/lib/shopify/types'
import { createContext, useContext, useMemo, useState } from 'react'

export interface OptimisticCartItemProps {
  id: string
  type: 'optimistic'
  title: string
  option1?: SelectedOption
  option2?: SelectedOption
  option3?: SelectedOption
  quantity: number
  subtotal: Money
  image: string
}

interface CartContextProps {
  removeFromCartItemId: string
  setRemoveFromCartItemId: (title: string) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isRemoving: boolean
  setIsRemoving: (isRemoving: boolean) => void
  cartOpen: boolean
  setCartOpen: (cartOpen: boolean) => void
  mobileDrawerOpen: boolean
  setMobileDrawerOpen: (mobileDrawerOpen: boolean) => void
  optimisticCartItems: OptimisticCartItemProps[]
  setOptimisticCartItems: (cartItems: OptimisticCartItemProps[]) => void
}

export const CartContext = createContext<CartContextProps>({
  removeFromCartItemId: '',
  setRemoveFromCartItemId: () => null,
  isLoading: false,
  setIsLoading: () => null,
  isRemoving: false,
  setIsRemoving: () => null,
  cartOpen: false,
  setCartOpen: () => null,
  mobileDrawerOpen: false,
  setMobileDrawerOpen: () => null,
  optimisticCartItems: [],
  setOptimisticCartItems: () => null
})

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [removeFromCartItemId, setRemoveFromCartItemId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cartOpen, setCartOpen] = useState<boolean>(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false)
  const [optimisticCartItems, setOptimisticCartItems] = useState<OptimisticCartItemProps[]>([])
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const contextValue = useMemo(() => {
    return {
      removeFromCartItemId,
      setRemoveFromCartItemId,
      isLoading,
      setIsLoading,
      cartOpen,
      setCartOpen,
      mobileDrawerOpen,
      setMobileDrawerOpen,
      optimisticCartItems,
      setOptimisticCartItems,
      isRemoving,
      setIsRemoving
    }
  }, [
    removeFromCartItemId,
    setRemoveFromCartItemId,
    isLoading,
    setIsLoading,
    cartOpen,
    setCartOpen,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    optimisticCartItems,
    setOptimisticCartItems,
    isRemoving,
    setIsRemoving
  ])

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider')
  }
  return context
}
