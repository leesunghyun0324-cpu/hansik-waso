'use client'

import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useCartStore } from '@/lib/cart-store'
import type { Product } from '@/lib/types'

interface MealDay {
  day_ko: string
  day_en: string
  meal_ko: string
  meal_en: string
  items: string[]
}

interface MealPlanData {
  id: string
  title_ko: string
  title_en: string
  subtitle_ko: string
  subtitle_en: string
  estimated_total_gbp: number
  days: MealDay[]
}

interface MealPlanProps {
  plans: MealPlanData[]
  products: Product[]
}

export function MealPlan({ plans, products }: MealPlanProps) {
  const { locale } = useLocaleContext()
  const addItem = useCartStore((s) => s.addItem)
  const [activeIdx, setActiveIdx] = useState(0)
  const [added, setAdded] = useState(false)

  const activePlan = plans[activeIdx]

  const resolveProducts = (ids: string[]): Product[] =>
    ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => p !== undefined)

  const handleAddAll = () => {
    // Collect all unique product IDs across all days
    const seenIds = new Set<string>()
    for (const day of activePlan.days) {
      for (const id of day.items) {
        if (!seenIds.has(id)) {
          seenIds.add(id)
          const product = products.find((p) => p.id === id)
          if (product) addItem(product, 1)
        }
      }
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <section
      id="meal-plan"
      className="py-16 md:py-24"
      style={{ backgroundColor: '#F4EFE8' }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: '#2B2B2B' }}
          >
            {t('mealplan.heading', locale)}
          </h2>
          <p className="text-sm md:text-base" style={{ color: '#6B6B6B' }}>
            {t('mealplan.subhead', locale)}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {plans.map((plan, idx) => (
            <button
              key={plan.id}
              onClick={() => { setActiveIdx(idx); setAdded(false) }}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: activeIdx === idx ? '#1E4D3A' : '#FFFFFF',
                color: activeIdx === idx ? '#FBF7F1' : '#2B2B2B',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {locale === 'ko' ? plan.title_ko : plan.title_en}
            </button>
          ))}
        </div>

        {/* Plan card */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          {/* Plan subtitle */}
          <p className="text-sm mb-6" style={{ color: '#6B6B6B' }}>
            {locale === 'ko' ? activePlan.subtitle_ko : activePlan.subtitle_en}
          </p>

          {/* Day grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {activePlan.days.map((day, i) => {
              const dayProducts = resolveProducts(day.items)
              return (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#FBF7F1' }}
                >
                  {/* Day label */}
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wide mb-1"
                    style={{ color: '#1E4D3A' }}
                  >
                    {locale === 'ko' ? day.day_ko : day.day_en}
                  </p>
                  {/* Meal name */}
                  <p
                    className="text-xs font-medium leading-snug mb-3"
                    style={{ color: '#2B2B2B' }}
                  >
                    {locale === 'ko' ? day.meal_ko : day.meal_en}
                  </p>
                  {/* Product chips */}
                  <div className="flex flex-wrap gap-1">
                    {dayProducts.map((product) => (
                      <span
                        key={product.id}
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: '#E8E1D5', color: '#6B6B6B' }}
                      >
                        {locale === 'ko' ? product.name_ko : product.name_en}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer row: total + add-all button */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs" style={{ color: '#6B6B6B' }}>
                {locale === 'ko' ? '예상 총액' : 'Estimated total'}
              </p>
              <p className="text-xl font-bold" style={{ color: '#1E4D3A' }}>
                £{activePlan.estimated_total_gbp.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleAddAll}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: added ? '#1E4D3A' : '#E8654A',
                color: '#FFFFFF',
              }}
            >
              {added ? (
                <>
                  <Check size={16} />
                  {locale === 'ko' ? '담겼어요!' : 'Added to cart!'}
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  {locale === 'ko' ? '한 번에 담기' : 'Add whole plan'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
