'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useUIStore } from '@/lib/ui-store'
import { useCartStore } from '@/lib/cart-store'

export function CartDrawer() {
  const { locale } = useLocaleContext()
  const { cartOpen, closeCart } = useUIStore()
  const { items, removeItem, updateQuantity } = useCartStore()

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price_gbp * item.quantity,
    0
  )

  // Lock body scroll when open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  if (!cartOpen) return null

  const handleCheckout = () => {
    alert(t('cart.demo_alert', locale))
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 z-50 h-full w-full md:max-w-sm flex flex-col overflow-hidden"
        style={{ backgroundColor: '#FBF7F1' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: '#E8E1D5' }}
        >
          <span className="text-sm font-semibold" style={{ color: '#2B2B2B' }}>
            {t('nav.cart', locale)}
            {items.length > 0 && (
              <span className="ml-2 text-xs font-normal" style={{ color: '#6B6B6B' }}>
                ({items.length})
              </span>
            )}
          </span>
          <button
            onClick={closeCart}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-black/5"
          >
            <X size={18} style={{ color: '#2B2B2B' }} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
              <p className="text-sm" style={{ color: '#6B6B6B' }}>
                {t('cart.empty', locale)}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 pb-4 border-b"
                  style={{ borderColor: '#E8E1D5' }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name_ko}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <p
                      className="text-xs font-semibold leading-snug"
                      style={{ color: '#2B2B2B' }}
                    >
                      {locale === 'ko'
                        ? item.product.name_ko
                        : item.product.name_en}
                    </p>
                    <p className="text-xs" style={{ color: '#6B6B6B' }}>
                      {item.product.weight}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Qty controls */}
                      <div
                        className="flex items-center gap-0 rounded border overflow-hidden"
                        style={{ borderColor: '#E8E1D5' }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex items-center justify-center w-7 h-7 hover:bg-black/5 transition-colors"
                        >
                          <Minus size={11} style={{ color: '#2B2B2B' }} />
                        </button>
                        <span
                          className="w-7 text-center text-xs font-semibold"
                          style={{ color: '#2B2B2B' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex items-center justify-center w-7 h-7 hover:bg-black/5 transition-colors"
                        >
                          <Plus size={11} style={{ color: '#2B2B2B' }} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold" style={{ color: '#1E4D3A' }}>
                          £{(item.product.price_gbp * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 transition-colors"
                        >
                          <Trash2 size={13} style={{ color: '#6B6B6B' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with subtotal + checkout */}
        {items.length > 0 && (
          <div
            className="flex-shrink-0 px-5 py-4 border-t"
            style={{ borderColor: '#E8E1D5', backgroundColor: '#FBF7F1' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: '#6B6B6B' }}>
                {t('cart.subtotal', locale)}
              </span>
              <span className="text-base font-bold" style={{ color: '#2B2B2B' }}>
                £{subtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full h-11 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1E4D3A', color: '#FBF7F1' }}
            >
              {t('cart.checkout', locale)}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
