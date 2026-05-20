# Luxury agent design system (static prototype)

Charcoal + ivory + muted gold design tokens and a senior-readable homepage prototype for Dr. Jan Duffy / Las Vegas luxury positioning.

## Files

| File | Purpose |
|------|---------|
| `tokens.css` | CSS custom properties (color, type, spacing) |
| `luxury-agent.css` | Layout and components |
| `index.html` | Homepage with JSON-LD, FAQ, semantic sections |

## Preview locally

```bash
cd design-system/luxury-agent
npx --yes serve -p 5199
```

Open http://localhost:5199

## Next.js port (done)

Tokens live in `src/styles/luxury-tokens.css` (imported by `src/app/globals.css`). Homepage: `src/components/home/LuxuryHomePage.tsx` via `src/app/(convert)/page.tsx`. Sitewide header/footer use luxury classes; consultation uses Calendly + GBP CTAs (no generic lead form).
