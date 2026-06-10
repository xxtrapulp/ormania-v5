# Ormania v5 — Digital Showroom

Bilingual (EN/FR) luxury showroom site for **Bijouterie Ormania**, a family jewelry boutique in Laval, QC. Mobile-first, dark "midnight velvet" aesthetic, Instagram-centric merchandising, and a local-first lead pipeline with a staff dashboard.

## Framework Choice

**Next.js 16 (App Router, static export)** was chosen over Lynx:

- Lynx targets native mobile UI rendering and is not compatible with this stack's requirements (static SEO pages, `generateStaticParams` for bilingual + per-product routes, structured metadata, sitemap/robots generation).
- Static export (`output: "export"`) produces a fully static `out/` folder deployable to any host — no server needed, matching the v4 static-site deployment model.
- React + Framer Motion delivers the cinematic motion language (hero cross-fades, parallax, staggered reveals) within the existing ecosystem.

Styling is **Tailwind CSS v4** (CSS-first theme tokens in `app/globals.css`), icons are **Lucide**, motion is **Framer Motion**.

## Getting Started

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run build      # static export to out/
npx serve out      # preview the production build
npm run lint       # ESLint
```

## Structure

- `app/[lang]/…` — all routes, statically generated for `en` + `fr`
- `components/shell/` — Header, Footer, mobile sticky action bar
- `components/forms/` — config-driven multi-step lead modal engine (6 form types)
- `components/ig/` — Instagram showroom cards/grid
- `components/pages/` — per-page client views
- `lib/` — i18n dictionaries, lead store (localStorage), analytics stub, content data
- `public/brand/` — brand assets migrated **bit-for-bit** from v4 (never recreate)
- `public/instagram/` — real Instagram media from v4

## Key Conventions

- **Leads** persist to `localStorage` (`ormania.leads.v1`) with reference numbers like `ORM-RE-3F7K2`; the staff dashboard at `/{lang}/admin` (demo passcode `1234`) manages statuses, notes, and uploaded photos.
- **i18n**: every UI string lives in `lib/i18n.ts`; URLs are `/en/...` and `/fr/...`.
- **Buttons**: pill-shaped, 44–52px tap targets, `white-space: nowrap`, short labels under 390px via `ResponsiveLabel`.
- **Motion**: respects `prefers-reduced-motion` everywhere.

## Deployment

`npm run build` then upload `out/` to any static host (Netlify, S3, nginx). Trailing slashes are enabled, images are unoptimized (no image server required).
