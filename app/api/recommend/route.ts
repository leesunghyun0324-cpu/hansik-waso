import { NextRequest, NextResponse } from 'next/server'
import aiData from '@/data/ai-responses.json'
import productsData from '@/data/products.json'
import type { Product } from '@/lib/types'

type Logic = 'han_sang_charim' | 'banchan_refill' | 'recipe_reverse'

const RECIPE_REVERSE_MAP: Record<string, string> = {
  p08: 'bossam',
  p09: 'kimchi_jjigae',
  p10: 'kimchi_jjigae',
  p11: 'jjimdak',
  p13: 'kimchi_jjigae',
  p16: 'doenjang_jjigae',
  p19: 'doenjang_jjigae',
  p22: 'japchae',
  p24: 'doenjang_jjigae',
  p25: 'bossam',
}

interface RecommendResponse {
  items: Product[]
  message_ko: string
  message_en: string
  label_ko?: string
  label_en?: string
}

function resolveProducts(ids: string[]): Product[] {
  return ids
    .map((id) => (productsData as Product[]).find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)
}

function randomDelay(): Promise<void> {
  const ms = 400 + Math.random() * 400
  return new Promise((r) => setTimeout(r, ms))
}

export async function POST(req: NextRequest) {
  const { productId, logic } = (await req.json()) as {
    productId: string
    logic: Logic
  }

  await randomDelay()

  let result: RecommendResponse

  if (logic === 'han_sang_charim') {
    const data = aiData.han_sang_charim as Record<
      string,
      { items: string[]; message_ko: string; message_en: string }
    >
    const entry = data[productId] ?? data['p08']
    result = {
      items: resolveProducts(entry.items),
      message_ko: entry.message_ko,
      message_en: entry.message_en,
    }
  } else if (logic === 'banchan_refill') {
    const entry = aiData.banchan_refill
    result = {
      items: resolveProducts(entry.items),
      message_ko: entry.message_ko,
      message_en: entry.message_en,
    }
  } else {
    // recipe_reverse
    const recipeKey = RECIPE_REVERSE_MAP[productId] ?? 'kimchi_jjigae'
    const data = aiData.recipe_reverse as Record<
      string,
      { items: string[]; message_ko: string; message_en: string; dish_ko: string; dish_en: string }
    >
    const entry = data[recipeKey]
    result = {
      items: resolveProducts(entry.items),
      message_ko: entry.message_ko,
      message_en: entry.message_en,
      label_ko: entry.dish_ko,
      label_en: entry.dish_en,
    }
  }

  return NextResponse.json(result)
}
