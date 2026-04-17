import { create } from 'zustand'
import type { Product } from './types'

interface UIStore {
  // Product drawer
  drawerProduct: Product | null
  openProductDrawer: (product: Product) => void
  closeProductDrawer: () => void

  // Cart drawer
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  drawerProduct: null,
  openProductDrawer: (product) => set({ drawerProduct: product }),
  closeProductDrawer: () => set({ drawerProduct: null }),

  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
}))
