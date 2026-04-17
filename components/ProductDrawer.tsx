'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Star, ShieldCheck, Plus, Minus } from 'lucide-react'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useUIStore } from '@/lib/ui-store'
import { useCartStore } from '@/lib/cart-store'
import { RecommendationRows } from '@/components/RecommendationRows'
import type { ReviewsData } from '@/lib/types'

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= rating ? '#E8654A' : 'none'}
          style={{ color: i <= rating ? '#E8654A' : '#D1C9BF' }}
        />
      ))}
    </div>
  )
}

interface ProductDrawerProps {
  reviews: ReviewsData
}

export function ProductDrawer({ reviews }: ProductDrawerProps) {
  const { locale } = useLocaleContext()
  const { drawerProduct, closeProductDrawer } = useUIStore()
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  // Reset qty when product changes
  useEffect(() => {
    setQty(1)
    setAdded(false)
  }, [drawerProduct?.id])

  // Lock body scroll when open
  useEffect(() => {
    if (drawerProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerProduct])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProductDrawer()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeProductDrawer])

  if (!drawerProduct) return null

  const product = drawerProduct
  const productReviews = reviews[product.id] ?? []

  const handleAddToCart = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={closeProductDrawer}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 z-50 h-full w-full md:max-w-md flex flex-col overflow-hidden"
        style={{ backgroundColor: '#FBF7F1' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: '#E8E1D5' }}
        >
          <span className="text-sm font-semibold" style={{ color: '#2B2B2B' }}>
            {locale === 'en' ? product.name_en : product.name_ko}
          </span>
          <button
            onClick={closeProductDrawer}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-black/5"
          >
            <X size={18} style={{ color: '#2B2B2B' }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Product image */}
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={locale === 'ko' ? product.name_ko : product.name_en}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            {product.private_label && (
              <div
                className="absolute top-3 left-3 px-2 py-1 rounded text-[11px] font-semibold"
                style={{ backgroundColor: '#1E4D3A', color: '#FBF7F1' }}
              >
                한식 오리지널 · Hansik Original
              </div>
            )}
          </div>

          <div className="px-5 py-5">
            {/* Name + price */}
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <h2 className="text-lg font-bold leading-snug" style={{ color: '#2B2B2B' }}>
                  {locale === 'en' ? product.name_en : product.name_ko}
                </h2>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>
                  {locale === 'en' ? product.name_ko : product.name_en}
                </p>
              </div>
              <span className="text-xl font-bold flex-shrink-0" style={{ color: '#1E4D3A' }}>
                £{product.price_gbp.toFixed(2)}
              </span>
            </div>

            <p className="text-xs mb-4" style={{ color: '#6B6B6B' }}>{product.weight}</p>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#2B2B2B' }}>
              {locale === 'ko' ? product.description_ko : product.description_en}
            </p>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-8">
              {/* Qty selector */}
              <div
                className="flex items-center gap-0 rounded-lg border overflow-hidden"
                style={{ borderColor: '#E8E1D5' }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex items-center justify-center w-9 h-10 transition-colors hover:bg-black/5"
                >
                  <Minus size={14} style={{ color: '#2B2B2B' }} />
                </button>
                <span
                  className="w-8 text-center text-sm font-semibold"
                  style={{ color: '#2B2B2B' }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex items-center justify-center w-9 h-10 transition-colors hover:bg-black/5"
                >
                  <Plus size={14} style={{ color: '#2B2B2B' }} />
                </button>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-10 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: added ? '#1E4D3A' : '#E8654A',
                  color: '#FFFFFF',
                }}
              >
                {added
                  ? (locale === 'ko' ? '담겼어요!' : 'Added!')
                  : (locale === 'ko' ? '장바구니에 담기' : 'Add to cart')}
              </button>
            </div>

            {/* Reviews section */}
            {productReviews.length > 0 && (
              <div>
                <h3
                  className="text-sm font-semibold mb-4 pb-2 border-b"
                  style={{ color: '#2B2B2B', borderColor: '#E8E1D5' }}
                >
                  {locale === 'ko'
                    ? `고객 리뷰 (${productReviews.length})`
                    : `Reviews (${productReviews.length})`}
                </h3>
                <div className="flex flex-col gap-5">
                  {productReviews.map((review, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold" style={{ color: '#2B2B2B' }}>
                            {locale === 'ko' ? review.author_ko : review.author_en}
                          </span>
                          {review.verified && (
                            <div className="flex items-center gap-0.5">
                              <ShieldCheck size={11} style={{ color: '#1E4D3A' }} />
                              <span className="text-[10px]" style={{ color: '#1E4D3A' }}>
                                {t('reviews.verified', locale)}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-[11px]" style={{ color: '#6B6B6B' }}>
                          {review.date}
                        </span>
                      </div>
                      <StarRow rating={review.rating} />
                      <p className="text-sm leading-relaxed" style={{ color: '#2B2B2B' }}>
                        {locale === 'ko' ? review.text_ko : review.text_en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t" style={{ borderColor: '#E8E1D5' }}>
              <RecommendationRows productId={product.id} basePrice={product.price_gbp} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
