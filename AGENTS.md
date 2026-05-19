# sandstonetulessprings.com — agent & developer guide

Hyperlocal marketing site for **Sandstone Tules Springs | Homes by Dr. Jan Duffy** (1:1 Google Business Profile). NAP and community facts live in `src/lib/site-contact.ts` and `src/lib/community.ts`.

## Portfolio conversion stack (required pattern)

Across Dr. Jan Duffy / LetMeHelpYouREALTY clone sites:

| Priority | Tool | Role |
|----------|------|------|
| Primary | **RealScout** | Property search, listings, home value — leads → Follow Up Boss |
| Secondary | **Calendly** | Tour / consultation booking — leads → FUB (UTM attribution) |
| CRM | **Follow Up Boss** | Single sink; never call FUB API from client code |

**Do not** add per-site MCP, A2A, or custom agent protocols unless there is an explicit portfolio decision. **No generic lead `<form>` elements** for capture (filters/share forms excepted).

## Roadmap for this site

| Phase | Scope |
|-------|--------|
| **Now** | Static/marketing Next.js + RealScout + Calendly + GBP (NAP, map, reviews CTAs) + JSON-LD |
| **Later** | Optional lightweight community Q&A (FAQ-grounded, human escalation) if demand warrants |
| **Maybe** | Internal MCP for portfolio ops (~20 sites), not one MCP per microsite |
| **Skip** | A2A unless building a multi-agent platform, not a listing microsite |

## Build & deploy

- Production build: `npm run build` → `next build --webpack` (avoid Turbopack on Vercel CI).
- Prefer `vercel build` for deploy parity when linked.
- Canonical URL: `NEXT_PUBLIC_BASE_URL` (see `.env.example`). Must match Search Console host (www vs apex).
- Cloudflare **DNS only** (gray cloud) in front of Vercel — no orange-cloud proxy.

## Content integrity

- **Dr. Jan Duffy** (never "Janet"). License `S.0197614.LLC`. Brokerage: Berkshire Hathaway HomeServices Nevada Properties.
- **Builder vs agent:** KB Home sales phone and kbhome.com links are for builder tours/materials only. Agent email/phone (when added) must match GBP.
- No fabricated review counts, sales volume, or rankings.

## Site map (8 launch URLs — SEO / GEO / AEO)

| Path | Purpose |
|------|---------|
| `/` | Hub — links to all topical pages |
| `/sandstone-at-tule-springs` | Master plan entity (GEO) |
| `/landings-at-sandstone` | KB Home new homes pillar |
| `/visit` | Directions from I-215 (AEO) |
| `/buyers` | Buyer representation / conversion |
| `/faq` | Full FAQ + `FAQPage` JSON-LD |
| `/north-las-vegas` | Area / 89084 local context |
| `/contact` | NAP, email, builder vs agent phones |

Registry: `src/lib/site-pages.ts` (also drives `SITEMAP_ROUTES` and header nav).

## Key files

- `src/lib/site-contact.ts` — GBP business name, email, community address, brokerage
- `src/lib/community.ts` — KB Home Landings / Sandstone at Tule Springs facts, FAQ, schema helpers
- `src/lib/site-pages.ts` — routes, nav, per-URL metadata/H1
- `src/lib/site-url.ts` — `metadataBase`, re-exports sitemap routes
- `src/app/sitemap.ts`, `src/app/robots.ts` — crawl signals
- `src/lib/metadata/root-metadata.ts` — root metadata + GSC verification hook
- `src/lib/schema/site-graph.ts` — Organization + WebSite + RealEstateAgent `@graph`

## Google Search Console

1. **Property:** `https://www.sandstonetulessprings.com` (URL-prefix) — same host as `NEXT_PUBLIC_BASE_URL`.
2. **Verify:** set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel production (HTML tag method).
3. **Sitemap:** submit `https://www.sandstonetulessprings.com/sitemap.xml` (8 marketing URLs from `site-pages.ts`).
4. **robots.txt:** `https://www.sandstonetulessprings.com/robots.txt` — allows `/`, links sitemap; does not block `/_next/static`.
5. **After deploy:** URL Inspection on `/`, `/faq`, `/landings-at-sandstone`; validate JSON-LD in [Rich Results Test](https://search.google.com/test/rich-results).
6. **Optional:** `NEXT_PUBLIC_BUILD_DATE` (ISO date) for stable sitemap `lastmod` on production deploys.

## RealScout (integrated)

- Load `realscout-web-components.umd.js` via `RealScoutOfficeListingsDeferred` when listings enter viewport (`lazyOnload`) on convert routes only.
- CSP must allow `em.realscout.com` and `www.realscout.com` in `script-src` and `connect-src`.

## Performance (PageSpeed)

- **Convert routes** (`(convert)` group): `/`, `/buyers`, `/contact` — RealScout listings (in-viewport + `lazyOnload`), Calendly badge (load on hover/click).
- **Info routes** (`(info)` group): `/faq`, `/visit`, `/landings-at-sandstone`, etc. — no third-party scripts on initial load; footer `ScheduleCta` loads Calendly on click if configured.
- Fonts: system UI stack only (no `next/font` download).
- Measurement: `@vercel/speed-insights` in root layout.

## Calendly (integrated)

- Load `widget.js` + CSS via `loadCalendlyAssets()` in `lib/calendly.ts` (on demand, not root layout).
- Floating `<CalendlyBadge />` on convert routes only = 15-min consultation event.
- Page CTAs use `<ScheduleCta />` / `<CalendlyButton />` / `<CalendlyEmbed />` (contact page inline).
- Route all URLs through `lib/calendly.ts` `buildCalendlyUrl()` for UTM → FUB attribution.
- Env: `NEXT_PUBLIC_CALENDLY_TOUR_URL`, `NEXT_PUBLIC_CALENDLY_CONSULTATION_URL` (see `.env.example`).
- No lead-capture `<form>` elements — scheduling only via Calendly; email remains for NAP visibility.
