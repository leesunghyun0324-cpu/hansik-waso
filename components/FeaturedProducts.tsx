'use client'

import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useUIStore } from '@/lib/ui-store'
import { ProductCard } from './ProductCard'
import type { Product, ReviewsData } from '@/lib/types'

interface FeaturedProductsProps {
  products: Product[]
  reviews: ReviewsData
}

export function FeaturedProducts({ products, reviews }: FeaturedProductsProps) {
  const { locale } = useLocaleContext()
  const openProductDrawer = useUIStore((s) => s.openProductDrawer)

  return (
    <section
      id="featured"
      className="py-16 md:py-24"
      style={{ backgroundColor: '#FBF7F1' }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Section header */}
        <div className="mb-10 md:mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: '#2B2B2B' }}
          >
            {t('featured.heading', locale)}
          </h2>
          <p className="text-sm md:text-base" style={{ color: '#6B6B6B' }}>
            {t('featured.subhead', locale)}
          </p>
        </div>

        {/* Product grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              reviews={reviews[product.id]}
              onClick={() => openProductDrawer(product)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
