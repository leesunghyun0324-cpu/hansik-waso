import { ShopPageClient } from '@/components/ShopPageClient'
import productsData from '@/data/products.json'
import reviewsData from '@/data/reviews.json'
import type { Product, ReviewsData } from '@/lib/types'

export default function ShopPage() {
  return (
    <ShopPageClient
      products={productsData as Product[]}
      reviews={reviewsData as ReviewsData}
    />
  )
}
