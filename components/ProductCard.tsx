'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import type { Product, Review, Locale } from '@/lib/types'

interface ProductCardProps {
  product: Product
  locale: Locale
  reviews?: Review[]
  onClick?: () => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= rating ? '#E8654A' : 'none'}
          style={{ color: i <= rating ? '#E8654A' : '#D1C9BF' }}
        />
      ))}
    </div>
  )
}

export function ProductCard({ product, locale, reviews, onClick }: ProductCardProps) {
  const avgRating =
    reviews && reviews.length > 0
      ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
      : null

  return (
    <article
      onClick={onClick}
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* Image container — square aspect ratio */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={locale === 'ko' ? product.name_ko : product.name_en}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Private-label badge */}
        {product.private_label && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide"
            style={{ backgroundColor: '#1E4D3A', color: '#FBF7F1' }}
          >
            한식 오리지널
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-1 p-3">
        {/* Names */}
        <p className="text-sm font-semibold leading-snug" style={{ color: '#2B2B2B' }}>
          {locale === 'ko' ? product.name_ko : product.name_en}
        </p>
        <p className="text-xs leading-snug" style={{ color: '#6B6B6B' }}>
          {locale === 'ko' ? product.name_en : product.name_ko}
        </p>

        {/* Weight */}
        <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>
          {product.weight}
        </p>

        {/* Price + rating row */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-semibold" style={{ color: '#1E4D3A' }}>
            £{product.price_gbp.toFixed(2)}
          </span>

          {avgRating !== null && reviews && (
            <div className="flex items-center gap-1">
              <StarRating rating={avgRating} />
              <span className="text-[11px]" style={{ color: '#6B6B6B' }}>
                ({reviews.length})
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
