# Hansik by WASO — Project Spec

## What this is

A demo site imagining WASO's expansion into Korean food, branded **Hansik by WASO**. Built as a portfolio artifact to send to Toshihiro Yoshimura (WASO founder) after an interview where the AI/engineering angle came up. The goal is to show concrete AI fluency and commercial thinking for B2C topline growth, not to produce a production-ready e-commerce site.

This is **not** a real online supermarket. WASO operates with strong in-house production (retail-manufacturing, 小売り製造), private-label SKUs, and chef partnerships. The positioning differentiates from aggregators like Weee. Hansik inherits that DNA.

## Positioning (non-negotiable)

**Hansik by WASO is a Korean food specialist with in-house production and chef curation, not a Korean grocery aggregator.**

- Pride in making, not just selling
- Private-label line (Hansik Originals) is a HERO section, not a footnote
- Warm, curated, food-photography-forward
- Feels like a specialty shop, not a supermarket aisle

## Target user

Primary: Koreans living in the UK (students, couples, families, international couples). Meal logic and cultural references assume a native Korean food understanding. Secondary: UK curious customers, but not prioritized for layout decisions.

## Features in scope

1. **Hybrid site structure**
   - Homepage: single-scroll with hero, featured products, Hansik Originals section, recommendation demo, 식단표 teaser, reviews/UGC strip
   - `/shop` page: product grid with filters
   - Product details: slide-out drawer from any product click (no separate route)
   - Cart: slide-out drawer from top nav

2. **Recommendation engine** (the headline AI feature)
   - Three recommendation logics on any product detail drawer:
     - 한상차림 완성 (Complete your table)
     - 밑반찬 채우기 (Refill your side dishes)
     - 레시피 역산 (Cook this dish)
   - Horizontal scrolling rows
   - Real-time cart total + AOV uplift indicator
   - Color-coded logic labels

3. **식단표 (Weekly meal plan suggestion)**
   - 3 pre-built plans: "자취생 한 주," "커플 홈디너," "주말 손님 초대"
   - Each plan shows 3-4 meals with all ingredients purchasable
   - "Add entire plan to cart" button
   - Visual day-by-day layout

4. **Reviews / UGC strip**
   - Fake but believable reviews on product drawers (3-5 per hero product)
   - Homepage UGC section with mock customer photos
   - Star ratings, verified-buyer badges
   - This exists because WASO currently lacks reviews and it's a clear commercial lever

5. **Korean / English language toggle**
   - Top-nav toggle
   - Korean default
   - All customer-facing text bilingual

6. **Hansik Originals section**
   - 5 flagged private-label products with short "made by Hansik" story snippets
   - Visual badge on product cards
   - Dedicated homepage section

## Features explicitly NOT in scope

- Real checkout / payment (cart exists, checkout is a dead-end button)
- User accounts / login
- Real backend database (JSON file for products)
- Real AI API calls (pre-computed outputs served from lookup tables with artificial delay)
- Natural language search (deliberately cut)
- AI chatbot (deliberately cut)
- Search functionality beyond category filters
- Admin panel
- Order tracking
- Mobile app
- Email capture / newsletter flow
- Social login

If Claude Code sees adjacent improvements outside this list, it logs them in `ideas.md` and does not implement.

## Success criteria

When Yoshimura-san opens the link:

1. Within 5 seconds he understands the brand and the pride-in-making angle
2. He clicks around 3-5 things (hero, a product, a 식단표, the recommendation row)
3. Each thing he touches feels polished, not broken
4. The recommendation engine and 식단표 visibly demonstrate LLM value that rule-based systems couldn't deliver
5. The visual quality is clearly better than current waso.com

## Reference sites

In `/references/`:

- `waso/` — screenshots of current waso.com. Inherit: Japanese specialist warmth, food-focus, private-label pride. Improve: modern layout, reviews, better photography, denser product cards, faster navigation.
- `weee/` — screenshots of sayweee.com. **Do NOT emulate.** Cold supermarket aesthetic, generic grid, no curation voice. We are the anti-Weee.

## Tech stack

Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui components, Zustand for cart state, Lucide icons. Product data lives in `/data/products.json`. Mock AI responses live in `/data/ai-responses.json`. Deploy target: Vercel.

## Timeline

Weekend build. Saturday: full build per milestones 1-3. Sunday: polish, mobile testing, deploy.
