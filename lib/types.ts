export type Locale = 'ko' | 'en'

export interface Product {
  id: string
  name_ko: string
  name_en: string
  category: string
  weight: string
  price_gbp: number
  image: string
  private_label: boolean
  description_ko: string
  description_en: string
}

export interface Review {
  rating: number
  author_ko: string
  author_en: string
  date: string
  verified: boolean
  text_ko: string
  text_en: string
}

export type ReviewsData = Record<string, Review[]>
