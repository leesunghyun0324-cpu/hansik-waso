# Hansik by WASO — Build Brief

Everything needed to hand Claude Code a clean spec for the demo site. Start here.

---

## Your tasks (in order)

### Before starting Claude Code (30-60 min)

1. **Install Node.js** if you don't have it. Download from nodejs.org, pick the LTS version, run the installer.
2. **Install Claude Code**. Terminal: `npm install -g @anthropic-ai/claude-code`. Verify: `claude --version`.
3. **Create the project folder**:
   ```
   mkdir ~/projects/hansik-waso
   cd ~/projects/hansik-waso
   git init
   ```
4. **Drop the brief files in**. Copy all files from this folder into the project root:
   - `spec.md`
   - `CLAUDE.md`
   - `milestones.md`
   - `catalog.md` (this one is for you to work from, not for Claude Code)
   - `seed-content.md`
   - `products.json` → move to `data/products.json` after Claude Code creates the `data/` folder (or just let Claude Code create the folder and do it for you)
   - `ai-responses.json` → same, ends up at `data/ai-responses.json`
   - `reviews.json` → same, ends up at `data/reviews.json`
5. **Create the references folder and drop WASO and Weee screenshots**:
   ```
   mkdir -p references/waso
   mkdir -p references/weee
   ```
   Save screenshots you already have into each folder. Name doesn't matter, just make them accessible.
6. **Source product images** — this is the biggest chunk of your time. Follow `catalog.md`. Save to `public/products/` (create the folder). Budget 30-45 minutes. Don't get perfectionist, close-enough images are fine.
7. **Source the hero image** — one striking overhead shot of a 한상차림 spread. Save as `public/products/hero.jpg`. Spend 10 minutes making this one good because it's the first thing Yoshimura-san sees.

### Starting the build (Saturday morning)

8. **Open terminal in the project folder**, run `claude`.
9. **First message to Claude Code**:
   ```
   Read spec.md, CLAUDE.md, milestones.md, and seed-content.md in full.
   Review the images in /references/waso/ and /references/weee/.
   Then enter plan mode (no coding yet) and propose your approach for milestone 1.
   Wait for my approval before writing any code.
   ```
10. **Read the plan Claude Code produces**. Check it matches milestone 1 in milestones.md. If vague, push back. If aligned, authorize.
11. **At the 30-minute checkpoint** (hero + one product card), Claude Code will pause and show you what it built. Open `npm run dev` in another terminal and actually look at `localhost:3000`. If the hero and product card feel right (warm, specialty-shop not supermarket, matches the references), say "approved, continue." If something feels off, describe what specifically and push back.
12. **After each milestone**, open the dev server, click through the new features yourself. Don't trust "it's done" without clicking.

### During build, Claude Code rules of thumb

- If Claude Code is going in a direction that feels wrong, stop it. Type `esc` or say "stop, let's rethink."
- If the same bug has been fixed twice and is still broken, run `/clear` and start a fresh prompt with what you learned.
- If Claude Code suggests features outside scope, tell it to log them in `ideas.md` and move on.
- After each milestone, `git add . && git commit -m "milestone N done"`.

### After the build

13. **Mobile test**: Chrome DevTools, toggle device toolbar, iPhone SE width. Click through everything.
14. **Deploy to Vercel**:
    - Push the repo to GitHub (`gh repo create`, or manual)
    - Go to vercel.com, import the repo, click deploy
    - You get a free URL like `hansik-waso.vercel.app`
15. **Write the email to Yoshimura-san**. Keep it casual matching your post-interview rapport. Use the "ran out of Claude credits lol" framing to hint at the features you cut (natural language search, AI chatbot). Don't oversell. Let the site speak.

---

## File purpose reference

| File | Purpose | Who reads it |
|------|---------|-------------|
| `README.md` | This guide | You |
| `spec.md` | Project vision, positioning, scope | Claude Code + you |
| `CLAUDE.md` | Persistent technical rules and design system | Claude Code (every session) |
| `milestones.md` | Build sequence, checkpoints | Claude Code |
| `catalog.md` | Product list with image sourcing instructions | You only |
| `seed-content.md` | All customer-facing copy (KR + EN) | Claude Code |
| `products.json` | Structured product data | Claude Code loads this |
| `ai-responses.json` | Pre-computed recommendation + meal plan data | Claude Code loads this |
| `reviews.json` | Fake but believable customer reviews | Claude Code loads this |

---

## Timeline estimate

- Setup + image sourcing: **1-1.5 hours** (you)
- Milestone 1 (foundation + hero + product card): **~1 hour** (Claude Code with your checkpoint)
- Milestone 2 (homepage sections + drawers + shop): **~3 hours** (Claude Code)
- Milestone 3 (recommendation + meal plan + polish): **~2.5 hours** (Claude Code)
- Mobile polish + deploy: **~1 hour** (you + Claude Code)

**Total: ~8-9 focused hours.** Realistic to do in one weekend Saturday, but plan for spillover into Sunday morning. If you're pushing into hour 10+, something went sideways and you should stop, clear context, and restart the problem area fresh.

---

## If something goes wrong

- **Claude Code loops on a bug**: `/clear`, write a new prompt with what was learned.
- **The design is coming out generic**: Reference the WASO screenshots explicitly. Ask Claude Code to compare its current output to the references and name three specific things to change.
- **Features are half-working**: Don't stack more on top. Finish the current feature completely before moving on.
- **You run out of steam**: Stop. Come back fresh. A tired build ships broken.
- **The image sourcing is taking forever**: Drop problematic products, use 20 instead of 25. The recommendation engine still demos fine with 20.

---

## What makes this send-worthy

Before you email Yoshimura-san, gut-check:

1. Does the homepage hero feel warm and specialty-shop (not supermarket)?
2. Does clicking a hero product open a drawer with real-feeling recommendations?
3. Does the 식단표 let him add a full meal plan in one click?
4. Are reviews present and do they feel like real customer voices?
5. Is the Hansik Originals section clearly prominent and the in-house-production angle obvious?
6. Does everything work on mobile?
7. Does it load fast (<3 seconds)?

If yes to all seven, send.

If no to any, fix that specific thing before sending. Don't send something half-working with a caveat.
