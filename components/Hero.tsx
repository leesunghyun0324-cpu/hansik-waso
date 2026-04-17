'use client'

import Image from 'next/image'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'

export function Hero() {
  const { locale } = useLocaleContext()

  return (
    <section className="relative h-[70vh] min-h-[480px] md:h-screen md:max-h-[800px] w-full overflow-hidden">
      {/* Full-bleed food photograph */}
      <Image
        src="/products/hero.jpg"
        alt="한식 한상차림 — Korean table spread"
        fill
        priority
        unoptimized
        className="object-cover object-center"
      />

      {/* Dark overlay — no gradient, flat black/40 */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.42)' }} />

      {/* Text: bottom-left on desktop, bottom on mobile */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 md:pb-24">
          <div className="max-w-xl">
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-4"
              style={{
                color: '#FBF7F1',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              {t('hero.headline', locale)}
            </h1>
            <p
              className="text-base md:text-lg mb-8 leading-relaxed"
              style={{
                color: 'rgba(251,247,241,0.9)',
                textShadow: '0 1px 6px rgba(0,0,0,0.3)',
              }}
            >
              {t('hero.subhead', locale)}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Primary CTA */}
              <Link
                href="#featured"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#E8654A', color: '#FFFFFF' }}
              >
                {t('hero.cta', locale)}
              </Link>

              {/* Secondary link */}
              <Link
                href="#hansik-originals"
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: '#FBF7F1', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                {t('hero.secondary', locale)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
