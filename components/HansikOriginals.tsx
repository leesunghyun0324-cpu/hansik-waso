'use client'

import Image from 'next/image'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useUIStore } from '@/lib/ui-store'
import type { Product, ReviewsData } from '@/lib/types'

const STORIES: Record<string, { ko: string; en: string }> = {
  p13: {
    ko: '배추를 직접 절이고, 양념을 비비고, 3주 동안 저온에서 숙성시킵니다. 할머니의 김치독을 런던의 주방으로 가져왔습니다.',
    en: 'We salt the cabbage, mix the seasoning, age it three weeks at controlled temperature. Your grandmother\'s kimchi jar, but in London.',
  },
  p14: {
    ko: '매주 새 무가 들어옵니다. 한입 크기로 깍둑 썰고, 새우젓과 고춧가루로 양념해 4-5일 숙성. 설렁탕의 단짝.',
    en: 'Fresh radish comes in every week. We cube it, season with saeujeot and chili, ferment four to five days. The soulmate of seolleongtang.',
  },
  p15: {
    ko: '멸치볶음, 콩자반, 시금치나물. 매주 월요일 아침, 셰프가 직접 손으로 무치는 가장 기본이자 가장 중요한 세 가지.',
    en: 'Anchovy stir-fry, black-bean glaze, seasoned spinach. Every Monday morning, hand-made by our chef. The three most basic and most important.',
  },
  p16: {
    ko: '소뼈를 48시간 동안 약한 불에 우려 뽀얀 국물을 냅니다. 수육과 국수, 파까지 한 팩에. 집에서도 설렁탕집 한 그릇.',
    en: 'Beef bones simmered on low for 48 hours until the broth turns milk-white. Sliced brisket, noodles, scallions included. A soup-shop bowl at home.',
  },
  p17: {
    ko: '소고기 70, 돼지고기 30. 셰프가 직접 치대고 손으로 빚어 양념에 재웁니다. 팬이나 오븐에서 10분, 손님상에도 자신있게.',
    en: 'Seventy percent beef, thirty percent pork. Kneaded and shaped by hand, then marinated. Ten minutes in a pan and it\'s table-worthy.',
  },
}

const ORIGINALS_IDS = ['p13', 'p14', 'p15', 'p16', 'p17']

interface HansikOriginalsProps {
  products: Product[]
  reviews: ReviewsData
}

export function HansikOriginals({ products, reviews }: HansikOriginalsProps) {
  const { locale } = useLocaleContext()
  const openProductDrawer = useUIStore((s) => s.openProductDrawer)

  const originals = ORIGINALS_IDS
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)

  return (
    <section
      id="hansik-originals"
      className="py-16 md:py-24"
      style={{ backgroundColor: '#F4EFE8' }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-block px-3 py-1 rounded text-xs font-semibold tracking-wide"
              style={{ backgroundColor: '#1E4D3A', color: '#FBF7F1' }}
            >
              한식 오리지널 · Hansik Original
            </span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: '#2B2B2B' }}
          >
            {t('originals.heading', locale)}
          </h2>
          <p
            className="text-sm md:text-base max-w-xl"
            style={{ color: '#6B6B6B', lineHeight: '1.7' }}
          >
            {t('originals.subhead', locale)}
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible md:pb-0 snap-x snap-mandatory">
          {originals.map((product) => {
            const story = STORIES[product.id]
            const productReviews = reviews[product.id] ?? []
            const avgRating =
              productReviews.length > 0
                ? Math.round(
                    productReviews.reduce((s, r) => s + r.rating, 0) /
                      productReviews.length
                  )
                : null

            return (
              <article
                key={product.id}
                onClick={() => openProductDrawer(product)}
                className="group flex-shrink-0 w-72 md:w-auto flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 snap-start"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={locale === 'ko' ? product.name_ko : product.name_en}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 288px, 20vw"
                  />
                  {/* Badge */}
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide"
                    style={{ backgroundColor: '#1E4D3A', color: '#FBF7F1' }}
                  >
                    한식 오리지널
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col gap-1.5 p-4 flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#2B2B2B' }}>
                    {locale === 'ko' ? product.name_ko : product.name_en}
                  </p>
                  <p className="text-xs" style={{ color: '#6B6B6B' }}>
                    {locale === 'ko' ? product.name_en : product.name_ko}
                  </p>

                  {/* Story snippet */}
                  {story && (
                    <p
                      className="text-xs mt-1 leading-relaxed line-clamp-3"
                      style={{ color: '#6B6B6B' }}
                    >
                      {locale === 'ko' ? story.ko : story.en}
                    </p>
                  )}

                  {/* Price + rating */}
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <span className="text-sm font-semibold" style={{ color: '#1E4D3A' }}>
                      £{product.price_gbp.toFixed(2)}
                    </span>
                    {avgRating !== null && (
                      <div className="flex items-center gap-1">
                        <span style={{ color: '#E8654A' }} className="text-xs">
                          {'★'.repeat(avgRating)}
                        </span>
                        <span className="text-[11px]" style={{ color: '#6B6B6B' }}>
                          ({productReviews.length})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
