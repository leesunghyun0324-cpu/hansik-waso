'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { t } from '@/lib/i18n'
import { useLocaleContext } from '@/lib/locale-context'
import { useCartStore } from '@/lib/cart-store'
import { useUIStore } from '@/lib/ui-store'

const NAV_LINKS = [
  { href: '/shop', key: 'nav.shop' },
  { href: '/#meal-plan', key: 'nav.mealplan' },
  { href: '/#hansik-originals', key: 'nav.originals' },
  { href: '/#about', key: 'nav.about' },
] as const

export function Navbar() {
  const { locale, setLocale } = useLocaleContext()
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const openCart = useUIStore((s) => s.openCart)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: '#FBF7F1', borderColor: '#E8E1D5' }}
      ref={menuRef}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          style={{ color: '#1E4D3A', fontFamily: 'var(--font-english)' }}
        >
          Hansik by WASO
        </Link>

        {/* Nav links — desktop only */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#2B2B2B' }}
            >
              {t(key, locale)}
            </Link>
          ))}
        </nav>

        {/* Right side: language toggle + cart + hamburger */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-0 text-sm font-medium" style={{ color: '#6B6B6B' }}>
            <button
              onClick={() => setLocale('ko')}
              className={`px-2 py-1 rounded transition-colors ${
                locale === 'ko' ? 'font-bold' : 'hover:opacity-70'
              }`}
              style={{ color: locale === 'ko' ? '#1E4D3A' : '#6B6B6B' }}
            >
              KR
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setLocale('en')}
              className={`px-2 py-1 rounded transition-colors ${
                locale === 'en' ? 'font-bold' : 'hover:opacity-70'
              }`}
              style={{ color: locale === 'en' ? '#1E4D3A' : '#6B6B6B' }}
            >
              EN
            </button>
          </div>

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-black/5"
            aria-label={t('nav.cart', locale)}
          >
            <ShoppingBag size={20} style={{ color: '#2B2B2B' }} />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: '#E8654A' }}
              >
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-black/5"
            aria-label="Menu"
          >
            {menuOpen
              ? <X size={20} style={{ color: '#2B2B2B' }} />
              : <Menu size={20} style={{ color: '#2B2B2B' }} />
            }
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ borderColor: '#E8E1D5', backgroundColor: '#FBF7F1' }}
        >
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#2B2B2B' }}
            >
              {t(key, locale)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
