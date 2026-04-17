# CLAUDE.md — Hansik by WASO

## Project

Hansik by WASO is a demo e-commerce site imagining WASO's Korean food expansion. Portfolio artifact, not production. See `spec.md` for full positioning. See `milestones.md` for build order.

## Tech stack

- Next.js 15 with App Router
- TypeScript strict mode
- Tailwind CSS v4
- shadcn/ui components (install via CLI as needed)
- Zustand for cart state
- Lucide icons only, no custom SVG illustrations
- Local JSON for product data (`/data/products.json`)
- Local JSON for pre-computed AI responses (`/data/ai-responses.json`)
- No backend, no database, no auth

## Run commands

- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`

Always typecheck before claiming a milestone is done.

## Directory structure

```
/app              Next.js app router pages
/components       Reusable React components
/components/ui    shadcn/ui primitives
/data             products.json, ai-responses.json, reviews.json, meal-plans.json
/lib              utilities, cart store, i18n helpers
/public/products  product images (sourced by human, named by product id)
/references       WASO and Weee screenshots for visual reference
/ideas.md         track improvements you notice but do not implement
```

## Design system (LOCKED — do not propose alternatives unless human asks)

**Palette**
- Background: `#FBF7F1` (warm cream)
- Primary: `#1E4D3A` (deep pine green)
- Accent: `#E8654A` (warm coral)
- Text primary: `#2B2B2B`
- Text muted: `#6B6B6B`
- Border: `#E8E1D5`
- Private-label badge: `#1E4D3A` bg, cream text

**Typography**
- Korean: Pretendard (via `next/font/local` or Google Fonts equivalent)
- English: Inter
- Display sizes for hero and section headers only
- Body: 16px base, 1.6 line-height

**Layout**
- 8px base spacing grid
- Section vertical padding: 96px desktop, 48px mobile
- Max content width: 1280px, 24px horizontal gutters on mobile

**Components**
- Button radius: 8px
- Card radius: 12px
- Card shadow: subtle, `0 1px 3px rgba(0,0,0,0.06)`
- No gradients anywhere
- No glassmorphism
- No neumorphism

## Non-negotiable rules

1. **No generic AI aesthetic.** No centered hero with three feature cards in gradient boxes. No "Welcome to Hansik" generic copy. Hero must feel like a specialty Korean food shop, food-photography-forward.

2. **Reference WASO and Weee screenshots.** Before building the homepage or a product card, view the images in `/references/waso/` and `/references/weee/`. Inherit WASO's warmth. Avoid Weee's coldness.

3. **Private-label pride is a HERO concept, not a footer detail.** Hansik Originals section must be prominent on the homepage. Private-label products get a visible `한식 오리지널 · Hansik Original` badge on cards.

4. **Bilingual from day one.** Every customer-facing string has Korean and English versions in `/lib/i18n.ts`. Never hardcode a customer-facing string inline. Korean is default.

5. **All AI responses are pre-computed.** Load from `/data/ai-responses.json`. Wrap in a `/app/api/recommend/route.ts` internal route that adds a 400-800ms artificial delay so it feels like real API calls in DevTools. Never actually call the Anthropic API.

6. **Photography hero.** Full-bleed food photograph with overlay text and one CTA button. No illustrations, no custom graphics, no animated heroes.

7. **Reviews on every hero product.** Minimum 3 reviews per Hansik Original and main-dish product, loaded from `/data/reviews.json`. Include star ratings and verified-buyer badges.

8. **Stay in scope.** If you notice improvements outside the current milestone, append to `ideas.md` and move on. Do not implement.

9. **Verify before claiming done.** Run `npm run typecheck`. Run `npm run dev` and visit the relevant page. Click through the feature end-to-end. Only then mark the milestone complete.

10. **No silent changes.** If you modify something outside the current task, flag it in your response to the human.

## Explicit don'ts

- Do not call the Anthropic SDK
- Do not install Framer Motion or heavy animation libraries; CSS transitions only
- Do not write custom SVG icons; use Lucide
- Do not add Storybook, tests beyond typecheck, or CI configs
- Do not add Prisma, Supabase, or any database
- Do not add authentication scaffolding
- Do not use em dashes or colons in customer-facing English copy (founder style preference)
- Do not propose redesigns mid-build; follow the locked design system

## Korean content rules

- Use natural Korean, not translated-from-English Korean
- Product names use the form native Korean shoppers would expect (e.g. `삼겹살 500g` not `돼지 배 살`)
- Prices in GBP (£), not KRW
- Weight units: g / kg
- Review voice should sound like real Koreans in the UK (casual, mix of Korean and occasional English brand names)

## Workflow

1. Always enter plan mode (Shift-Tab) before coding
2. Read `milestones.md` and confirm which milestone is active
3. Propose a plan. Wait for human approval.
4. Implement one milestone at a time
5. At the first milestone's 30-minute checkpoint, pause and show the human the hero + one product card before continuing
6. Typecheck and run the dev server before calling any milestone done
7. Commit after each milestone with a clear message
