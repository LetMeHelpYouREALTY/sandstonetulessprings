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

## Key files

- `src/lib/site-contact.ts` — GBP business name, email, community address, brokerage
- `src/lib/community.ts` — KB Home Landings / Sandstone at Tule Springs facts, FAQ, schema helpers
- `src/lib/site-url.ts` — `metadataBase`, sitemap routes
- `src/app/sitemap.ts`, `src/app/robots.ts` — crawl signals

## RealScout (when integrated)

- Load `realscout-web-components.umd.js` once in root `layout.tsx` (`type="module"`).
- CSP must allow `em.realscout.com` and `www.realscout.com` in `script-src` and `connect-src`.

## Calendly (when integrated)

- Load `widget.js` once via `<CalendlyBadge />` (`id="calendly-widget-js"`).
- Route all URLs through `lib/calendly.ts` `buildCalendlyUrl()` for UTM params.
