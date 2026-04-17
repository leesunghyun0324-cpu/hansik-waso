'use client'

import Link from 'next/link'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'

export function Footer() {
  const { locale } = useLocaleContext()

  return (
    <footer
      className="border-t mt-auto"
      style={{ backgroundColor: '#2B2B2B', borderColor: '#3D3D3D' }}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <p className="text-base font-bold mb-2" style={{ color: '#FBF7F1' }}>
              Hansik by WASO
            </p>
            <p className="text-xs leading-relaxed" style={{ color: '#9B9B9B' }}>
              {t('footer.tagline', locale)}
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#9B9B9B' }}>
              {t('footer.shop', locale)}
            </p>
            <div className="flex flex-col gap-2">
              <Link href="#featured" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#FBF7F1' }}>
                {locale === 'ko' ? '이번 주 추천' : "This week's picks"}
              </Link>
              <Link href="#hansik-originals" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#FBF7F1' }}>
                {locale === 'ko' ? '한식 오리지널' : 'Hansik Originals'}
              </Link>
              <Link href="#meal-plan" className="text-xs transition-opacity hover:opacity-70" style={{ color: '#FBF7F1' }}>
                {locale === 'ko' ? '식단표' : 'Meal plan'}
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#9B9B9B' }}>
              {t('footer.company', locale)}
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-xs" style={{ color: '#6B6B6B' }}>
                {locale === 'ko' ? '브랜드 이야기' : 'About'}
              </span>
              <span className="text-xs" style={{ color: '#6B6B6B' }}>
                {locale === 'ko' ? '보도자료' : 'Press'}
              </span>
              <span className="text-xs" style={{ color: '#6B6B6B' }}>
                {locale === 'ko' ? '채용' : 'Careers'}
              </span>
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#9B9B9B' }}>
              {t('footer.support', locale)}
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-xs" style={{ color: '#6B6B6B' }}>
                {locale === 'ko' ? '고객 문의' : 'Contact'}
              </span>
              <span className="text-xs" style={{ color: '#6B6B6B' }}>
                FAQ
              </span>
              <span className="text-xs" style={{ color: '#6B6B6B' }}>
                {locale === 'ko' ? '배송 안내' : 'Delivery'}
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-6 border-t"
          style={{ borderColor: '#3D3D3D' }}
        >
          <p className="text-xs" style={{ color: '#6B6B6B' }}>
            {t('footer.copyright', locale)}
          </p>
        </div>
      </div>
    </footer>
  )
}
