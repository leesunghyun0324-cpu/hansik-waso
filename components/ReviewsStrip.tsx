'use client'

import { Star } from 'lucide-react'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import type { Review, ReviewsData } from '@/lib/types'

// Pick 4 highlighted reviews: one each from p13, p08, p16, p17
const HIGHLIGHT_PICKS: Array<{ productId: string; index: number; productName_ko: string; productName_en: string }> = [
  { productId: 'p13', index: 0, productName_ko: '한식 김치 (3주 숙성)', productName_en: 'Hansik Aged Kimchi' },
  { productId: 'p08', index: 1, productName_ko: '삼겹살 (냉장)', productName_en: 'Samgyeopsal Pork Belly' },
  { productId: 'p16', index: 0, productName_ko: '사골 설렁탕 밀키트', productName_en: 'Seolleongtang Meal Kit' },
  { productId: 'p17', index: 0, productName_ko: '수제 떡갈비', productName_en: 'Handmade Tteokgalbi' },
]

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

interface ReviewsStripProps {
  reviews: ReviewsData
}

export function ReviewsStrip({ reviews }: ReviewsStripProps) {
  const { locale } = useLocaleContext()

  const picks = HIGHLIGHT_PICKS.map((pick) => {
    const productReviews = reviews[pick.productId] ?? []
    const review: Review | undefined = productReviews[pick.index]
    return { ...pick, review }
  }).filter((p) => p.review !== undefined)

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: '#FBF7F1' }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#2B2B2B' }}>
            {t('reviews.heading', locale)}
          </h2>
          <p className="text-sm md:text-base" style={{ color: '#6B6B6B' }}>
            {t('reviews.subhead', locale)}
          </p>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {picks.map(({ productId, productName_ko, productName_en, review }) => {
            if (!review) return null
            return (
              <div
                key={productId}
                className="flex flex-col gap-3 rounded-xl p-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <StarRow rating={review.rating} />
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: '#2B2B2B' }}
                >
                  &ldquo;{locale === 'ko' ? review.text_ko : review.text_en}&rdquo;
                </p>
                <div className="flex flex-col gap-0.5 pt-1 border-t" style={{ borderColor: '#E8E1D5' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: '#2B2B2B' }}>
                      {locale === 'ko' ? review.author_ko : review.author_en}
                    </span>
                    {review.verified && (
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: '#F4EFE8', color: '#1E4D3A' }}
                      >
                        {t('reviews.verified', locale)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px]" style={{ color: '#6B6B6B' }}>
                    {locale === 'ko' ? productName_ko : productName_en}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
