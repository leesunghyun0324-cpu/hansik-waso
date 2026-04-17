'use client'

import { useState, useEffect } from 'react'
import type { Locale } from './types'

const strings: Record<string, Record<Locale, string>> = {
  // Brand
  'brand.name': { ko: 'Hansik by WASO', en: 'Hansik by WASO' },
  'brand.tagline': { ko: '한식 전문점, 런던에서 만듭니다', en: 'Korean food, crafted in London' },

  // Nav
  'nav.shop': { ko: '상품', en: 'Shop' },
  'nav.mealplan': { ko: '식단표', en: 'Meal plan' },
  'nav.originals': { ko: '한식 오리지널', en: 'Hansik Originals' },
  'nav.about': { ko: '브랜드 이야기', en: 'About' },
  'nav.cart': { ko: '장바구니', en: 'Cart' },

  // Hero
  'hero.headline': { ko: '한식 전문점, 런던에서 만듭니다', en: 'Korean food, crafted in London' },
  'hero.subhead': {
    ko: '냉장고가 아닌 주방에서. 김치부터 밑반찬까지, 직접 만들어 배송합니다.',
    en: 'From our kitchen, not a warehouse. Kimchi, banchan, meal kits, made by hand.',
  },
  'hero.cta': { ko: '지금 둘러보기', en: 'Shop now' },
  'hero.secondary': { ko: '한식 오리지널 보기 →', en: 'See Hansik Originals →' },

  // Featured section
  'featured.heading': { ko: '이번 주 추천', en: "This week's picks" },
  'featured.subhead': { ko: '한식 셰프가 직접 골랐습니다', en: 'Curated by our Korean kitchen' },

  // Hansik Originals section
  'originals.heading': { ko: '한식 오리지널', en: 'Made by Hansik, not bought' },
  'originals.subhead': {
    ko: '런던 주방에서 직접 만드는 시그니처 라인. 대형 마트의 김치가 아닌, 셰프의 김치.',
    en: 'Our signature line, made in our London kitchen. Not supermarket kimchi. Chef\'s kimchi.',
  },

  // Product badge
  'badge.original': { ko: '한식 오리지널', en: 'Hansik Original' },
  'badge.original.full': { ko: '한식 오리지널 · Hansik Original', en: '한식 오리지널 · Hansik Original' },

  // Cart
  'cart.empty': { ko: '장바구니가 비어있어요. 오늘 저녁, 뭐 드실래요?', en: "Cart's empty. What are you having tonight?" },
  'cart.subtotal': { ko: '소계', en: 'Subtotal' },
  'cart.checkout': { ko: '주문하기', en: 'Checkout' },
  'cart.demo_alert': { ko: '이건 데모 사이트예요. 실제 주문은 안 돼요.', en: 'This is a demo. No real ordering yet.' },

  // Shop page
  'shop.heading': { ko: '전체 상품', en: 'All products' },
  'shop.filter.all': { ko: '전체', en: 'All' },
  'shop.filter.instant': { ko: '즉석식', en: 'Quick meals' },
  'shop.filter.meat': { ko: '메인 · 고기', en: 'Meat' },
  'shop.filter.hansik_original': { ko: '한식 오리지널', en: 'Hansik Originals' },
  'shop.filter.banchan': { ko: '반찬 · 김치', en: 'Banchan' },
  'shop.filter.pantry': { ko: '양념 · 조미료', en: 'Pantry' },
  'shop.filter.fresh': { ko: '신선식품', en: 'Fresh' },

  // Reviews
  'reviews.heading': { ko: '런던 한식러들의 목소리', en: 'From our Korean family in London' },
  'reviews.subhead': { ko: '실제 구매하신 분들의 이야기', en: 'Real customers, real reviews' },
  'reviews.verified': { ko: '구매 인증', en: 'Verified buyer' },

  // Meal plan
  'mealplan.heading': { ko: '이번 주 식단표', en: "This week's meal plan" },
  'mealplan.subhead': {
    ko: '장 보기 고민 끝. 한 번에 담아 한 주 식단을 완성하세요.',
    en: 'Stop planning dinner. Drop a full week into your cart in one tap.',
  },

  // Footer
  'footer.tagline': { ko: '런던 주방에서 직접 만드는 한식', en: 'Korean food, made in our London kitchen' },
  'footer.copyright': { ko: '© 2026 Hansik by WASO. Demo site by Sam Lee.', en: '© 2026 Hansik by WASO. Demo site by Sam Lee.' },
  'footer.shop': { ko: '쇼핑', en: 'Shop' },
  'footer.company': { ko: '회사', en: 'Company' },
  'footer.support': { ko: '고객센터', en: 'Support' },

  // Recommendation engine
  'rec.hansang.label': { ko: '한상차림 완성', en: 'Complete your table' },
  'rec.hansang.sub': { ko: '한 끼 식사가 완성되는 조합', en: 'Everything to make it a proper meal' },
  'rec.banchan.label': { ko: '밑반찬 채우기', en: 'Refill your banchan' },
  'rec.banchan.sub': { ko: '함께 상에 올라가면 좋은 기본 반찬', en: 'The basics that always belong on the table' },
  'rec.recipe.label': { ko: '레시피 역산', en: 'Cook this dish' },
  'rec.recipe.sub': { ko: '집에서 만드는 인기 한식 레시피 재료', en: 'Ingredients for popular home recipes' },
}

export function t(key: string, locale: Locale): string {
  return strings[key]?.[locale] ?? strings[key]?.['ko'] ?? key
}

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocaleState] = useState<Locale>('ko')

  useEffect(() => {
    const stored = localStorage.getItem('hansik-locale') as Locale | null
    if (stored === 'ko' || stored === 'en') {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('hansik-locale', l)
  }

  return [locale, setLocale]
}
