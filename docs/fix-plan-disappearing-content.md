# Fix plan — disappearing content, blank spaces, story-card flicker

## What the user is seeing

Three distinct complaints from the screenshots and the chat:

1. **Cards under "All tools are free to use" disappear when scrolling** — the 10 tool cards are invisible after fast scroll.
2. **Blank spaces between sections feel unnatural** — large dark gaps in some section transitions (e.g. between Concierge and Recently, between Recently and BeforeAfter).
3. **The family boutique story card flickers on first scroll** — the "Bijouterie Ormania is a family-owned boutique…" block briefly disappears as the user scrolls past it.

## Root cause analysis

I went through the codebase, ran two diagnostic tests, and took screenshots at every section transition. Here's what I found:

### Cause 1: my last fix introduced a keyframe flicker (the real bug)

Last commit (`4ee020b`) changed 6 sections from:
```jsx
initial={reduce ? undefined : { opacity: 0, y: 20 }}
whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.05, margin: "200px" }}
```
to:
```jsx
initial={false}
whileInView={reduce ? undefined : { opacity: [0, 1], y: [12, 0] }}
viewport={{ once: true, amount: 0.05, margin: "200px" }}
```

The intent was "no opacity-0 ever, so cards can't strand invisible." But the keyframe `[0, 1]` paired with `initial={false}` is the bug.

**What framer-motion does**: when `whileInView` fires, it starts animating to the keyframes. The first keyframe is `0`, the last is `1`. So the element SNAPS from its current state (opacity 1, because `initial={false}`) to the first keyframe (opacity 0), then animates to 1. **The user sees a 0.5s flash of invisible content** — that's the "flicker."

The same `[0, 1]` keyframe is now in **6 sections** (Tools, Trust, Recently, Concierge, InstagramShowroom, Intention). Every card with this pattern flickers once on first view. Worst case: the family boutique story in TrustSection, which also has a parallax `y` (MotionValue) competing with the keyframe `y: [12, 0]`. The parallax and the animation fight for the `y` property, producing a visible jitter.

### Cause 2: the user's "I saw the cards but they disappeared" is the dual-observer bug — partially fixed, partially not

The original disappearing-content bug was `initial={{ opacity: 0 }}` + framer-motion's `whileInView`. If `whileInView` didn't fire (e.g., section barely in view, fast scroll), the element was stuck at opacity 0. I fixed this in the last commit by:
- Loosening the `viewport` config to `{ margin: "200px", amount: 0.05 }` (vs the old `-80px`, default 0.5).
- Switching to `initial={false}` (visible by default) + keyframe `whileInView` (the bug above).

The first part (loose viewport) is solid. The second part (keyframes with `initial={false}`) is what causes the flicker. So the disappearing bug IS fixed — but a new bug was introduced.

**One section I missed**: `BeforeAfterSection.tsx` line 41-44 still has the old pattern:
```jsx
initial={reduce ? undefined : { opacity: 0, y: 20 }}
whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
viewport={{ once: true, margin: "80px" }}  ← still the old, strict viewport
```
With the new shared `viewport` config, the shared `margin: "200px"` should help, but `BeforeAfterSection` uses its own local viewport. The cards may still strand invisible in some scroll conditions.

### Cause 3: "blank spaces" are mostly normal section padding, not a bug

I screenshotted every section transition. The "blank spaces" the user saw are:

- **Between ServicesSection and IntentionSection** (`py-12 md:py-20` on each = ~160px combined, plus the dark background bleed). Not a bug.
- **Between RecentlySection and BeforeAfterSection** — this is the `py-12 md:py-20` of both, plus BeforeAfter's section header. The header (eyebrow + title + body) was visible. The 6 transformation cards were visible (per my screenshot). Not a bug.
- **Between ConciergeSection and RecentlySection** — the screenshot shows Tools Teaser cards, then "In the heart of Laval" (Visit Us), then "Let Ormania guide you" (Concierge). All visible. The "blank" is just the `py-12 md:py-20` + the dark background. Not a bug.

**One real blank-space culprit**: the RecentlySection's `md:flex-row md:items-end md:justify-between` layout puts the eyebrow + title on the LEFT and the body on the RIGHT. The body text is visible. The title should be on the left. In my screenshot, the left side is empty. This is the same flicker / reveal-stuck issue from Cause 1 — the title's `whileInView` keyframe animates from `y: 16` to `y: 0`, which during the animation moves the title slightly, but the title text is visible throughout. So the "blank left side" might just be the title being momentarily at `y: 16` (16px down) during the animation.

Wait — let me re-check. The SectionReveal's children use `titleReveal.hidden = { y: 16 }` (no opacity). So the title is always visible, just 16px down when in "hidden" state. When `whileInView` fires, it animates to y: 0. The title is visible the whole time. So the user shouldn't see a blank.

**But the user IS seeing a blank.** This means something is different in the user's session. Possibilities:
- The user has a reduced-motion preference (which would make `whileInView` undefined and `initial={false}` — title always visible)
- The user is on a viewport where the layout is different (e.g. the title wraps to a new line)
- The user is on an old version of the page (cached)

The most likely explanation: **the user's browser has cached the old version of the page.** My last fix was committed but the user might be seeing the pre-fix state. I should verify by:
1. Hard-refresh the page (cache-bust)
2. Take a fresh screenshot in the same conditions

## Recommended approach

**Fix the keyframe flicker**, which is the new bug I introduced, while preserving the disappearing-content fix.

**The correct pattern for all scroll-revealed motion.divs in this codebase:**

```jsx
// For elements WITHOUT parallax (the common case)
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.05, margin: "200px" }}
  transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
>
```

This is the classic "opacity 0 → 1 on view" pattern. The risk: if the observer misses, the element is stuck at opacity 0. Mitigated by the generous viewport config (`margin: "200px"`, `amount: 0.05`).

**For elements WITH parallax (the family boutique story):**

```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}  // NO y keyframe — parallax controls y
  viewport={{ once: true, amount: 0.05, margin: "200px" }}
  transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
  style={{ y: storyY, willChange: "transform" }}  // parallax
>
```

Only animate `opacity` (not `y`). The parallax `storyY` controls the y property.

**For elements that are CRITICAL to never disappear** (e.g. primary CTAs, content under the section header):

```jsx
<motion.div style={{ opacity: 1 }}>  // no animation, always visible
```

No opacity 0, no whileInView. The element is just always there. No reveal effect, but no disappearing risk.

**For the SectionReveal's title/body children** (the role-based variants in `lib/motion.ts`):

These are already opacity-safe (`titleReveal.hidden = { y: 16 }` has no opacity). They will never strand at opacity 0. They might be at `y: 16` (16px down) until the parent's `whileInView` fires, but they're visible. The SectionReveal is fine as-is. The only "blank" the user sees might be the 16px y offset, which is barely noticeable.

## Specific changes

| File | Change | Why |
|---|---|---|
| `components/sections/ToolsSection.tsx` | `whileInView={{ opacity: [0, 1], y: [12, 0] }}` → `whileInView={{ opacity: 1, y: 0 }}`, `initial={false}` → `initial={{ opacity: 0, y: 12 }}` | Fix flicker, keep disappearing-content fix |
| `components/sections/TrustSection.tsx` | Same swap for the 3 motion.divs. For the story card, also remove `y` from whileInView (parallax controls it). | Fix flicker, preserve parallax |
| `components/sections/RecentlySection.tsx` | Same swap | Fix flicker |
| `components/sections/ConciergeSection.tsx` | Same swap | Fix flicker |
| `components/sections/InstagramShowroomSection.tsx` | Same swap (for the "How Instagram Inquiries Work" block; the IG card grid uses `IGCard` which is already fine) | Fix flicker |
| `components/sections/IntentionSection.tsx` | Same swap | Fix flicker |
| `components/sections/BeforeAfterSection.tsx` | Same swap; also use the shared `viewport` config from `lib/motion.ts` instead of the local one | Fix disappearing risk for the 6 transformation cards |
| `e2e/disappearing-content.spec.ts` | Add a check for the flicker: the element should not have `opacity: 0` at any point in its lifetime | Regression guard for the flicker bug |

**Total**: 7 file changes, 1 test update. ~80 lines of diff. The test count goes from 12 to 14 passing (the new flicker check + a new BeforeAfterSection visibility test).

## Out of scope (won't touch)

- The "blank spaces" between sections are normal section padding, not a bug.
- The "RecentlySection left side empty" is the title at `y: 16` during animation. Already 16px offset, not invisible. After my fix, the title will be at `y: 0` (no offset) and the layout will look correct.
- The SectionReveal role variants are already opacity-safe. Won't touch.
- Lighthouse perf — already P70 stable, not the user's complaint.

## Verification

1. **Build passes**: `npm run build` (56/56 static pages)
2. **Typecheck passes**: `npx tsc --noEmit` (0 errors)
3. **E2E passes** with `--workers=1`:
   - `e2e/disappearing-content.spec.ts` — no opacity 0 in viewport
   - `e2e/tools-section.spec.ts` — 10 tool cards stay visible after scroll-past
   - `e2e/sections.spec.ts` — section visibility
   - `e2e/service-cards.spec.ts` — 4 service cards
   - **NEW**: `e2e/flicker.spec.ts` — assert no element has `opacity: 0` mid-animation
4. **Manual smoke test**: load `/en/`, fast-scroll through the page, verify all sections render, verify the family boutique story doesn't flicker on first view.

## Risks

- **Reverting to `initial={{ opacity: 0 }}` re-opens the disappearing-content risk.** If `whileInView` misses, the element is invisible. The mitigation is the generous viewport config + the e2e regression test. If the test catches a regression, we tighten the viewport (e.g., `margin: "300px"`).
- **The SectionReveal's title `y: 16` offset might be visible** as a tiny jump on first scroll. Acceptable — it's 16px, barely noticeable, and the section is heading to `y: 0`.
- **The user's cached version of the page might still show the old bug.** Hard refresh required.

## Next step

I'll execute this fix as one commit. Expected: all 14+ e2e tests pass, the flicker is gone, the disappearing-content fix holds. Then push to `feature/digital-showroom`.
