import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { HansikOriginals } from '@/components/HansikOriginals'
import { MealPlan } from '@/components/MealPlan'
import { ReviewsStrip } from '@/components/ReviewsStrip'
import productsData from '@/data/products.json'
import reviewsData from '@/data/reviews.json'
import aiData from '@/data/ai-responses.json'
import type { Product, ReviewsData } from '@/lib/types'

const FEATURED_IDS = ['p08', 'p13', 'p16', 'p09', 'p15', 'p17']

export default function HomePage() {
  const products = productsData as Product[]
  const reviews = reviewsData as ReviewsData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mealPlans = (aiData as any).meal_plans

  const featuredProducts = FEATURED_IDS
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} reviews={reviews} />
      <HansikOriginals products={products} reviews={reviews} />
      <MealPlan plans={mealPlans} products={products} />
      <ReviewsStrip reviews={reviews} />
    </>
  )
}
