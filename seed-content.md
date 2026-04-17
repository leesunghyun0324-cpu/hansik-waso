# Seed Content

All customer-facing copy. Pair each Korean string with its English counterpart. Feed this to Claude Code as ground truth so it doesn't invent copy.

---

## Brand

- Brand name: `Hansik by WASO`
- Tagline (KR): `한식 전문점, 런던에서 만듭니다`
- Tagline (EN): `Korean food, crafted in London`

---

## Homepage hero

- Headline (KR): `한식 전문점, 런던에서 만듭니다`
- Headline (EN): `Korean food, crafted in London`
- Subhead (KR): `냉장고가 아닌 주방에서. 김치부터 밑반찬까지, 직접 만들어 배송합니다.`
- Subhead (EN): `From our kitchen, not a warehouse. Kimchi, banchan, meal kits, made by hand.`
- Primary CTA (KR): `지금 둘러보기`
- Primary CTA (EN): `Shop now`
- Secondary link (KR): `한식 오리지널 보기 →`
- Secondary link (EN): `See Hansik Originals →`

---

## Featured products section

- Heading (KR): `이번 주 추천`
- Heading (EN): `This week's picks`
- Subhead (KR): `한식 셰프가 직접 골랐습니다`
- Subhead (EN): `Curated by our Korean kitchen`

Products to feature (6): p08, p13, p16, p09, p15, p17

---

## Hansik Originals section

- Heading (KR): `한식 오리지널`
- Heading (EN): `Made by Hansik, not bought`
- Subhead (KR): `런던 주방에서 직접 만드는 시그니처 라인. 대형 마트의 김치가 아닌, 셰프의 김치.`
- Subhead (EN): `Our signature line, made in our London kitchen. Not supermarket kimchi. Chef's kimchi.`

Products: p13, p14, p15, p16, p17

### Short stories per private-label product

**p13 - 한식 김치 (3주 숙성)**
- KR: `배추를 직접 절이고, 양념을 비비고, 3주 동안 저온에서 숙성시킵니다. 할머니의 김치독을 런던의 주방으로 가져왔습니다.`
- EN: `We salt the cabbage, mix the seasoning, age it three weeks at controlled temperature. Your grandmother's kimchi jar, but in London.`

**p14 - 한식 깍두기**
- KR: `매주 새 무가 들어옵니다. 한입 크기로 깍둑 썰고, 새우젓과 고춧가루로 양념해 4-5일 숙성. 설렁탕의 단짝.`
- EN: `Fresh radish comes in every week. We cube it, season with saeujeot and chili, ferment four to five days. The soulmate of seolleongtang.`

**p15 - 3종 밑반찬 세트**
- KR: `멸치볶음, 콩자반, 시금치나물. 매주 월요일 아침, 셰프가 직접 손으로 무치는 가장 기본이자 가장 중요한 세 가지.`
- EN: `Anchovy stir-fry, black-bean glaze, seasoned spinach. Every Monday morning, hand-made by our chef. The three most basic and most important.`

**p16 - 사골 설렁탕 밀키트**
- KR: `소뼈를 48시간 동안 약한 불에 우려 뽀얀 국물을 냅니다. 수육과 국수, 파까지 한 팩에. 집에서도 설렁탕집 한 그릇.`
- EN: `Beef bones simmered on low for 48 hours until the broth turns milk-white. Sliced brisket, noodles, scallions included. A soup-shop bowl at home.`

**p17 - 수제 떡갈비**
- KR: `소고기 70, 돼지고기 30. 셰프가 직접 치대고 손으로 빚어 양념에 재웁니다. 팬이나 오븐에서 10분, 손님상에도 자신있게.`
- EN: `Seventy percent beef, thirty percent pork. Kneaded and shaped by hand, then marinated. Ten minutes in a pan and it's table-worthy.`

---

## 식단표 section

- Heading (KR): `이번 주 식단표`
- Heading (EN): `This week's meal plan`
- Subhead (KR): `장 보기 고민 끝. 한 번에 담아 한 주 식단을 완성하세요.`
- Subhead (EN): `Stop planning dinner. Drop a full week into your cart in one tap.`

Plan tab labels from ai-responses.json (plan_student, plan_couple, plan_guests).

---

## Reviews strip section

- Heading (KR): `런던 한식러들의 목소리`
- Heading (EN): `From our Korean family in London`
- Subhead (KR): `실제 구매하신 분들의 이야기`
- Subhead (EN): `Real customers, real reviews`

Use 4 highlighted reviews drawn from reviews.json (pick the most evocative ones).

---

## Recommendation engine labels

In the product drawer, three rows with these exact labels and colors:

1. **한상차림 완성 / Complete your table** — color `#1E4D3A` (pine green)
   - Subtitle (KR): `한 끼 식사가 완성되는 조합`
   - Subtitle (EN): `Everything to make it a proper meal`

2. **밑반찬 채우기 / Refill your banchan** — color `#E8654A` (warm coral)
   - Subtitle (KR): `함께 상에 올라가면 좋은 기본 반찬`
   - Subtitle (EN): `The basics that always belong on the table`

3. **레시피 역산 / Cook this dish** — color `#C9A961` (mustard)
   - Subtitle (KR): `집에서 만드는 인기 한식 레시피 재료`
   - Subtitle (EN): `Ingredients for popular home recipes`

### AOV uplift indicator (above recommendation rows)
- Template (KR): `이 상품만 £{base} → 추천 포함 £{total} (+{percent}%)`
- Template (EN): `This item £{base} → With picks £{total} (+{percent}%)`

---

## Nav

- Shop (KR): `상품`
- Shop (EN): `Shop`
- Meal plan (KR): `식단표`
- Meal plan (EN): `Meal plan`
- Hansik Originals: stays as `한식 오리지널 / Hansik Originals`
- About (KR): `브랜드 이야기`
- About (EN): `About`
- Language toggle: `KR` / `EN`
- Cart label (KR): `장바구니`
- Cart label (EN): `Cart`

---

## Cart drawer

- Empty state (KR): `장바구니가 비어있어요. 오늘 저녁, 뭐 드실래요?`
- Empty state (EN): `Cart's empty. What are you having tonight?`
- Subtotal (KR): `소계`
- Subtotal (EN): `Subtotal`
- Checkout button (KR): `주문하기`
- Checkout button (EN): `Checkout`
- Demo-only alert text (KR): `이건 데모 사이트예요. 실제 주문은 안 돼요.`
- Demo-only alert text (EN): `This is a demo. No real ordering yet.`

---

## Shop page

- Page heading (KR): `전체 상품`
- Page heading (EN): `All products`
- Filter all (KR): `전체`
- Filter all (EN): `All`
- Category labels:
  - `instant` → `즉석식 / Quick meals`
  - `meat` → `메인 · 고기 / Meat`
  - `hansik_original` → `한식 오리지널 / Hansik Originals`
  - `pantry` → `양념 · 조미료 / Pantry`
  - `fresh` → `신선식품 / Fresh`

---

## Footer

- Brand tagline line (KR): `런던 주방에서 직접 만드는 한식`
- Brand tagline line (EN): `Korean food, made in our London kitchen`
- Sections (left column):
  - 쇼핑 / Shop → links to #featured, #hansik-originals, #meal-plan
  - 회사 / Company → links to about section, press (dead), careers (dead)
  - 고객센터 / Support → contact (dead), FAQ (dead), delivery (dead)
- Copyright line: `© 2026 Hansik by WASO. Demo site by Sam Lee.`
