import type { Metadata } from 'next'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/locale-context'
import { Navbar } from '@/components/Navbar'
import { ProductDrawer } from '@/components/ProductDrawer'
import { CartDrawer } from '@/components/CartDrawer'
import { Footer } from '@/components/Footer'
import reviewsData from '@/data/reviews.json'
import type { ReviewsData } from '@/lib/types'

const inter = Inter({
  variable: '--font-english',
  subsets: ['latin'],
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  variable: '--font-korean',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hansik by WASO — 한식 전문점, 런던에서 만듭니다',
  description: '냉장고가 아닌 주방에서. 김치부터 밑반찬까지, 직접 만들어 배송합니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <LocaleProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ProductDrawer reviews={reviewsData as ReviewsData} />
          <CartDrawer />
        </LocaleProvider>
      </body>
    </html>
  )
}
