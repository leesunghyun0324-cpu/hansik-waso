'use client'

import { useState } from 'react'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useUIStore } from '@/lib/ui-store'
import { ProductCard } from './ProductCard'
import type { Product, ReviewsData } from '@/lib/types'

type Category = 'all' | 'instant' | 'meat' | 'hansik_original' | 'pantry' | 'fresh'

const CATEGORIES: Array<{ key: Category; labelKey: string }> = [
  { key: 'all', labelKey: 'shop.filter.all' },
  { key: 'instant', labelKey: 'shop.filter.instant' },
  { key: 'meat', labelKey: 'shop.filter.meat' },
  { key: 'hansik_original', labelKey: 'shop.filter.hansik_original' },
  { key: 'pantry', labelKey: 'shop.filter.pantry' },
  { key: 'fresh', labelKey: 'shop.filter.fresh' },
]

interface ShopPageClientProps {
  products: Product[]
  reviews: ReviewsData
}

export function ShopPageClient({ products, reviews }: ShopPageClientProps) {
  const { locale } = useLocaleContext()
  const openProductDrawer = useUIStore((s) => s.openProductDrawer)
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF7F1' }}>
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#2B2B2B' }}>
            {t('shop.heading', locale)}
          </h1>
          <p className="text-sm" style={{ color: '#6B6B6B' }}>
            {filtered.length}
            {locale === 'ko' ? '개 상품' : ' products'}
          </p>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeCategory === key ? '#1E4D3A' : '#FFFFFF',
                color: activeCategory === key ? '#FBF7F1' : '#2B2B2B',
                border: `1px solid ${activeCategory === key ? '#1E4D3A' : '#E8E1D5'}`,
              }}
            >
              {t(labelKey, locale)}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
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
    </div>
  )
}
