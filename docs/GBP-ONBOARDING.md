# Google Business Profile onboarding — sandstonetulessprings.com

Use this checklist when **creating** the listing at [business.google.com](https://business.google.com). The live site is pre-aligned so Google can match NAP, hours, phone, and website URL during verification.

**Official references (2026):**

- [Guidelines for representing your business on Google](https://support.google.com/business/answer/3038177)
- [Overview of GBP policies](https://support.google.com/business/answer/13762416)
- [Prohibited & restricted content (reviews)](https://support.google.com/contributionpolicy/answer/7400114)

## Before you start

| Item | Value (must match site exactly) |
|------|----------------------------------|
| Business name | `Sandstone Tules Springs \| Homes By Dr. Jan Duffy` |
| Website | `https://www.sandstonetulessprings.com` |
| Phone | `(702) 466-1509` |
| Address (storefront) | `851 W Lone Mountain Rd, North Las Vegas, NV 89032` |
| Hours | Mon–Fri 9 AM–6 PM, Sat 10 AM–4 PM, Sun by appointment |
| Email | `drjansells@sandstonetulessprings.com` |

**Profile type:** Storefront with a staffed office (not service-area-only). Add a **service area** for North Las Vegas / 89084 for buyer work at Sandstone — do not hide the street address if the office receives clients by appointment.

**Do not** put phone numbers, URLs, or hours inside the business name field (Google will suspend keyword-stuffed names).

## Vercel env (production)

```env
NEXT_PUBLIC_BASE_URL=https://www.sandstonetulessprings.com
NEXT_PUBLIC_GBP_PHONE=+17024661509
NEXT_PUBLIC_SITE_EMAIL=drjansells@sandstonetulessprings.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<from Search Console>
```

After verification:

```env
NEXT_PUBLIC_GBP_PLACE_ID=ChIJ...
# Optional: NEXT_PUBLIC_GBP_WRITEREVIEW_URL=https://g.page/r/...
# After 5+ real reviews only:
# NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE=5
# NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT=<integer>
```

Preview deployments: `NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true`

## Dashboard fields (copy from `src/lib/gbp-onboarding.ts`)

- **Primary category:** Real estate agent  
- **Additional:** Real estate agency, Real estate consultant  
- **Description:** `GBP_BUSINESS_DESCRIPTION` (no links in GBP text)  
- **Service area:** North Las Vegas, 89032, 89084  

## Verification

1. Claim listing at the Lone Mountain office address.  
2. Choose postcard, phone, or email verification as offered.  
3. Pin the map at **36.292, -115.155** if Google’s geocode drifts.  
4. Match **Search Console** property host to `NEXT_PUBLIC_BASE_URL` (www).  
5. URL Inspection on `/`, `/contact`, `/about` after deploy.  
6. [Rich Results Test](https://search.google.com/test/rich-results) on homepage JSON-LD.

## After the profile is live

1. Upload photos per `GBP_PHOTO_CHECKLIST` in `gbp-onboarding.ts`.  
2. Seed Q&A from `GBP_SUGGESTED_QA` (also reflected in site FAQ).  
3. Post weekly GBP updates (community news, not price spam).  
4. Mirror any hour or phone change on **both** GBP and `src/lib/site-contact.ts`.  
5. Follow `GBP_REVIEW_POLICY_REMINDERS` — no review incentives (2026 enforcement).

## Site routes Google reviewers expect

| URL | Purpose |
|-----|---------|
| `/` | Business hub + NAP context |
| `/contact` | Full NAP, map, hours, phone, Calendly |
| `/about` | Agent license, brokerage, GBP alignment |
| `/faq` | Q&A parity with GBP |
