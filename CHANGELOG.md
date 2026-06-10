# Changelog

All notable changes to the Ormania v5 web app.

## [0.1.1] — 2026-06-10

### Changed

- **Hero redesign**: replaced pixelated Instagram photo cross-fades (home hero + all inner-page hero bands) with an elegant CSS-only "velvet & gold" scene — layered radial gradients, drifting light auras, film grain, and a slowly rotating concentric gold-ring ornament on desktop. All animations respect `prefers-reduced-motion`.
- **New brand logo**: adopted the official `Ormania.svg` wordmark (copied bit-for-bit to `public/brand/ormania.svg`) across header, mobile menu, footer, form success screens, admin login, and the hero — where it now renders much larger (`h-16` mobile up to `h-32` desktop) with a soft gold glow.
- Removed the floating Instagram reel card from the home hero (low-resolution source).

## [0.1.0] — 2026-06-10

### Added

- **Scaffold**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, static export (`output: "export"`), Framer Motion, Lucide icons.
- **Assets**: brand files migrated bit-for-bit from v4 (`public/brand/`), 26 real Instagram images migrated (`public/instagram/`); corrupt `-hd.jpg` variants excluded.
- **Design system**: midnight-velvet dark theme tokens, Cormorant Garamond + Jost via `next/font`, gold dividers, sheen/glow button treatments, shared motion variants with `prefers-reduced-motion` support.
- **i18n**: full EN/FR dictionaries (`lib/i18n.ts`), `/en` + `/fr` static routes, language toggle with persisted preference.
- **Shell**: glass-on-scroll header, full-screen mobile menu, 4-action mobile sticky bar (Call / Directions / Instagram / Book) with safe-area padding, footer with hours and links.
- **Lead engine**: config-driven multi-step modal forms — product, Instagram piece (link or screenshot), custom (3 steps with budget/metal/stone), repair (photos + urgency), appointment, contact. Honeypot anti-spam, photo uploads with previews (max 5), validation, branded success screen with reference numbers (`ORM-XX-XXXXX`), leads persisted to `localStorage`.
- **Pages**: cinematic home (cross-fade hero, parallax, floating reel card, collections, IG showroom, custom, repairs, engagement, why-us, tools, visit band); Instagram showroom with category filters; collections with search + filters; static product detail pages per IG piece; repairs (animated 7-stage tracker, before/after sliders); custom (process + gallery); engagement (guide, FAQ accordion, `#book` anchor); visit (live open/closed status, hours, Google Maps embed); explore tools (gift finder quiz, ring size guide, chain length visualizer, live repair status lookup, care guide).
- **Admin**: passcode-gated staff dashboard (`/{lang}/admin`, demo `1234`) — KPI cards, lead list with type/status/search filters, detail drawer with quick actions (contacted/quote/approved/completed), full status pipeline, internal notes, uploaded image gallery, copy/call/email shortcuts.
- **SEO**: per-page bilingual metadata with `hreflang` alternates, JewelryStore JSON-LD with local keywords, `sitemap.xml`, `robots.txt` (admin disallowed).
- **Legal**: privacy and terms pages (EN/FR).
