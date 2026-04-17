'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useCartStore } from '@/lib/cart-store'
import type { Product, Locale } from '@/lib/types'

interface RowData {
  loading: boolean
  items: Product[]
  message_ko: string
  message_en: string
  label_ko?: string
  label_en?: string
}

const EMPTY_ROW: RowData = {
  loading: true,
  items: [],
  message_ko: '',
  message_en: '',
}

const ROW_CONFIGS = [
  {
    logic: 'han_sang_charim' as const,
    labelKey: 'rec.hansang.label',
    subKey: 'rec.hansang.sub',
    color: '#1E4D3A',
    bgColor: 'rgba(30,77,58,0.08)',
  },
  {
    logic: 'banchan_refill' as const,
    labelKey: 'rec.banchan.label',
    subKey: 'rec.banchan.sub',
    color: '#E8654A',
    bgColor: 'rgba(232,101,74,0.08)',
  },
  {
    logic: 'recipe_reverse' as const,
    labelKey: 'rec.recipe.label',
    subKey: 'rec.recipe.sub',
    color: '#C9A961',
    bgColor: 'rgba(201,169,97,0.08)',
  },
]

function SkeletonCard() {
  return (
    <div
      className="flex-shrink-0 w-24 rounded-xl overflow-hidden animate-pulse"
      style={{ backgroundColor: '#F4EFE8' }}
    >
      <div className="w-24 h-24" style={{ backgroundColor: '#E8E1D5' }} />
      <div className="p-2 flex flex-col gap-1">
        <div className="h-2.5 rounded" style={{ backgroundColor: '#E8E1D5', width: '80%' }} />
        <div className="h-2.5 rounded" style={{ backgroundColor: '#E8E1D5', width: '50%' }} />
      </div>
    </div>
  )
}

function MiniCard({
  product,
  locale,
  onAdd,
}: {
  product: Product
  locale: Locale
  onAdd: (p: Product) => void
}) {
  return (
    <div
      className="flex-shrink-0 w-24 rounded-xl overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div className="relative w-24 h-24 overflow-hidden">
        <Image
          src={product.image}
          alt={locale === 'en' ? product.name_en : product.name_ko}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-1.5 flex flex-col gap-1">
        <p
          className="text-[10px] font-medium leading-tight line-clamp-2"
          style={{ color: '#2B2B2B' }}
        >
          {locale === 'en' ? product.name_en : product.name_ko}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold" style={{ color: '#1E4D3A' }}>
            £{product.price_gbp.toFixed(2)}
          </span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center justify-center w-5 h-5 rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#E8654A' }}
          >
            <Plus size={10} color="#FFFFFF" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface RecommendationRowsProps {
  productId: string
  basePrice: number
}

export function RecommendationRows({ productId, basePrice }: RecommendationRowsProps) {
  const { locale } = useLocaleContext()
  const addItem = useCartStore((s) => s.addItem)
  const cartItems = useCartStore((s) => s.items)

  const [rows, setRows] = useState<RowData[]>([EMPTY_ROW, EMPTY_ROW, EMPTY_ROW])

  useEffect(() => {
    // Reset on product change
    setRows([EMPTY_ROW, EMPTY_ROW, EMPTY_ROW])

    ROW_CONFIGS.forEach(({ logic }, idx) => {
      fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, logic }),
      })
        .then((r) => r.json())
        .then((data: RowData) => {
          setRows((prev) => {
            const next = [...prev]
            next[idx] = { ...data, loading: false }
            return next
          })
        })
        .catch(() => {
          setRows((prev) => {
            const next = [...prev]
            next[idx] = { ...EMPTY_ROW, loading: false }
            return next
          })
        })
    })
  }, [productId])

  // AOV calculation: base + first 3 unique items across all loaded rows
  const allLoadedItems = rows
    .filter((r) => !r.loading)
    .flatMap((r) => r.items)
  const uniqueItems = allLoadedItems.filter(
    (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i && p.id !== productId
  )
  const topItems = uniqueItems.slice(0, 3)
  const potentialTotal = basePrice + topItems.reduce((s, p) => s + p.price_gbp, 0)
  const pct = Math.round(((potentialTotal - basePrice) / basePrice) * 100)
  const allLoaded = rows.every((r) => !r.loading)

  // Cart total (items added so far, excluding base product)
  const cartTotal = cartItems.reduce((s, i) => s + i.product.price_gbp * i.quantity, 0)

  const handleQuickAdd = (product: Product) => {
    addItem(product, 1)
  }

  return (
    <div className="flex flex-col gap-0">
      {/* AOV uplift indicator */}
      {allLoaded && topItems.length > 0 && (
        <div
          className="rounded-xl px-4 py-3 mb-4"
          style={{ backgroundColor: 'rgba(30,77,58,0.06)' }}
        >
          <p className="text-xs font-medium" style={{ color: '#1E4D3A' }}>
            {locale === 'ko'
              ? `이 상품만 £${basePrice.toFixed(2)} → 추천 포함 £${potentialTotal.toFixed(2)} (+${pct}%)`
              : `This item £${basePrice.toFixed(2)} → With picks £${potentialTotal.toFixed(2)} (+${pct}%)`}
          </p>
          {cartTotal > basePrice && (
            <p className="text-[11px] mt-0.5" style={{ color: '#6B6B6B' }}>
              {locale === 'ko'
                ? `장바구니 현재 £${cartTotal.toFixed(2)}`
                : `Cart total £${cartTotal.toFixed(2)}`}
            </p>
          )}
        </div>
      )}

      {/* Three rows */}
      {ROW_CONFIGS.map(({ logic, labelKey, subKey, color, bgColor }, idx) => {
        const row = rows[idx]
        const customLabel =
          logic === 'recipe_reverse' && !row.loading
            ? (locale === 'ko' ? row.label_ko : row.label_en) ?? t(labelKey, locale)
            : t(labelKey, locale)

        return (
          <div
            key={logic}
            className="py-4 border-t"
            style={{ borderColor: '#E8E1D5' }}
          >
            {/* Row header */}
            <div className="flex items-start gap-2 mb-3">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0"
                style={{ backgroundColor: bgColor, color }}
              >
                {customLabel}
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: '#6B6B6B' }}>
              {row.loading
                ? ''
                : locale === 'ko'
                ? row.message_ko
                : row.message_en}
            </p>

            {/* Cards scroll */}
            <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {row.loading
                ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
                : row.items.map((product) => (
                    <MiniCard
                      key={product.id}
                      product={product}
                      locale={locale}
                      onAdd={handleQuickAdd}
                    />
                  ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
