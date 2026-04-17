# Milestones

Build in order. Do not skip ahead. At each milestone, typecheck + run dev server + click through before marking done.

---

## Milestone 1 — Foundation, design system, hero, one product card

**Goal**: Lock the visual identity and prove the design direction before building volume.

**Tasks**

1. Scaffold Next.js 15 + TypeScript + Tailwind project
2. Install shadcn/ui, configure with palette from `CLAUDE.md`
3. Set up `/lib/i18n.ts` with Korean/English string helper and a `useLocale` hook
4. Install fonts (Pretendard for Korean, Inter for English)
5. Load product data from `/data/products.json` (human will provide)
6. Build the top navigation:
   - Logo text: `Hansik by WASO`
   - Nav items: Shop, 식단표, Hansik Originals, About
   - Language toggle (KR / EN) on the right
   - Cart icon with item count badge
   - Sticky on scroll, cream background, subtle bottom border
7. Build the homepage hero:
   - Full-bleed food photograph (use `/public/products/hero.jpg`, provided by human)
   - Overlay headline (KR): `한식 전문점, 런던에서 만듭니다`
   - Overlay headline (EN): `Korean food, crafted in London`
   - Subhead (KR): `냉장고가 아닌 주방에서. 김치부터 반찬까지, 직접 만들어 배송합니다.`
   - Subhead (EN): `From our kitchen, not a warehouse. Kimchi, banchan, meal kits, made by hand.`
   - Primary CTA button: `지금 둘러보기 / Shop now`
   - Text overlay uses cream color with subtle text shadow for readability
8. Build the ProductCard component:
   - Image (square, rounded corners)
   - Korean name (primary) + English name (smaller, muted)
   - Weight / size
   - Price in GBP
   - `한식 오리지널 · Hansik Original` badge if product is private-label
   - Star rating + review count if reviews exist
   - Hover: slight lift, image zoom
9. Build one "Featured products" section below hero showing 6 product cards in a responsive grid

### CHECKPOINT (roughly 30-40 minutes in)

**STOP HERE** and show the human:
- A screenshot or description of the hero
- A screenshot or description of one product card

Ask: "Does this direction feel right before I continue?" Wait for approval.

If the human says "not right," iterate on palette or typography or layout. Do not continue to Milestone 2.

If approved, commit with message `milestone 1: design system + hero + product card locked` and proceed.

---

## Milestone 2 — Homepage sections, product drawer, shop page

**Goal**: Build out the full homepage and shop flow.

**Tasks**

1. **Hansik Originals homepage section**
   - Section heading (KR): `한식 오리지널`
   - Section heading (EN): `Made by Hansik, not bought`
   - Subhead explaining the in-house production angle
   - Horizontal scrolling row of 5 private-label products
   - Each card larger than default (2x size) with a short "made by" story snippet
   - Product stories from `/data/seed-content.md`

2. **Product drawer** (slide-out from right)
   - Triggered by clicking any product card anywhere in the app
   - Contains: large image, name (KR/EN), price, weight, full description, quantity selector, Add to cart button
   - Review section at bottom (3-5 reviews with stars, verified badge, date, reviewer name)
   - Below reviews: three recommendation rows (built in Milestone 3, leave placeholder for now)
   - Closes via X button or click outside

3. **Cart drawer** (slide-out from right, same pattern)
   - Triggered by cart icon in nav
   - Line items with thumbnail, name, qty, price, remove button
   - Running subtotal
   - Dead-end checkout button labeled `주문하기 / Checkout` that shows an alert "Demo only"

4. **Reviews strip on homepage**
   - Between Featured Products and Hansik Originals
   - 4 review cards showing customer quote, star rating, reviewer name, product purchased
   - Warm, not corporate voice
   - Loaded from `/data/reviews.json`

5. **`/shop` page**
   - Product grid with all 25 products
   - Category filter sidebar on desktop, filter chips on mobile
   - Categories: 전체, 즉석식, 메인 · 고기, 한식 오리지널, 반찬 · 김치, 양념 · 조미료, 신선식품
   - Product count display
   - Uses the same ProductCard component

6. **Footer**
   - Simple: brand, brief tagline, sections links, copyright
   - No newsletter signup

### Verify before moving on

- Open product drawer, add to cart, close drawer, open cart drawer, see item, remove item
- Shop page filters work
- Language toggle works on all new sections
- Typecheck passes

Commit: `milestone 2: homepage sections + drawers + shop page`

---

## Milestone 3 — Recommendation engine, 식단표, polish

**Goal**: Ship the two headline AI features and polish for delivery.

**Tasks**

1. **Recommendation API route**
   - Create `/app/api/recommend/route.ts`
   - Accepts `{ productId, logic: "han_sang_charim" | "banchan_refill" | "recipe_reverse" }`
   - Reads from `/data/ai-responses.json`
   - Returns matched items with artificial delay (400-800ms random)

2. **Three recommendation rows in product drawer**
   - Each row has a colored label:
     - 한상차림 완성 / Complete your table — deep pine green
     - 밑반찬 채우기 / Refill your banchan — warm coral
     - 레시피 역산 / Cook this dish — muted mustard `#C9A961`
   - Short explanation under each label (1 line)
   - Horizontal scrollable row of product cards
   - Each card has quick-add button
   - AOV uplift indicator above the rows: `현재 £14.99 → 추천 포함 £34.50 (+130%)`
   - Loading skeleton while the mock API responds

3. **식단표 feature**
   - New homepage section between Hansik Originals and Reviews
   - Section heading (KR): `이번 주 식단표`
   - Section heading (EN): `This week's meal plan`
   - Three meal plan cards (tabs or switcher):
     - 자취생 한 주 (Solo student week)
     - 커플 홈디너 (Couple home dinners)
     - 주말 손님 초대 (Weekend guests)
   - Each plan visualized as a day-by-day calendar (Mon-Thu or full week)
   - Each day shows the meal name + ingredient chips
   - Total cart value shown
   - `한 번에 담기 / Add whole plan to cart` button
   - Data from `/data/meal-plans.json`

4. **Mobile polish**
   - Test every page at 375px and 768px widths
   - Drawers go full-screen on mobile
   - Nav collapses to hamburger
   - Shop grid becomes 2-column on mobile

5. **Final polish pass**
   - Empty cart state with friendly Korean/English copy
   - Product images have lazy loading
   - Smooth scroll on nav anchor clicks
   - Focus states on interactive elements
   - Hover states on product cards
   - Loading skeletons on all async content

6. **Deploy to Vercel**
   - Push to GitHub
   - Connect Vercel, deploy, verify live URL
   - Test the live URL on mobile and desktop

### Verify before marking done

- Open product drawer, see three recommendation rows populate after delay, AOV updates when adding items
- Switch between the three 식단표 plans
- Add a meal plan to cart, see all items appear
- Test on mobile Chrome DevTools at iPhone SE width
- All Korean and English strings render correctly
- No console errors

Commit: `milestone 3: recommendation engine + meal plan + polish`

---

## If something breaks

- Two failed corrections on the same bug → stop, `/clear`, write a fresh prompt with what was learned
- If a feature is taking 2x the expected time → pause, describe the problem to the human, propose simpler alternatives
- If Claude Code notices an improvement outside the milestone → add to `ideas.md`, do not implement
