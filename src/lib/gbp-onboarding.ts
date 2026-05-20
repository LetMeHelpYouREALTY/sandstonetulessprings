import {
	formatGbpOfficeHoursPlain,
	formatCanonicalGbpAddress,
} from "@/lib/google-business-profile";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	GBP_PHONE_DISPLAY,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { MASTER_PLAN_NAME, BUILDER_COMMUNITY_NAME } from "@/lib/community";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Copy and settings to paste into the Google Business Profile dashboard.
 * Sources: Google Business Profile guidelines (represent your business, May 2026)
 * and 2026 local SEO practice (NAP parity, Q&A seeding, no review incentives on-site).
 */

export const GBP_WEBSITE_URL = getSiteUrl();

/** Primary category — fewest categories that describe the core business. */
export const GBP_PRIMARY_CATEGORY = "Real estate agent";

export const GBP_ADDITIONAL_CATEGORIES = [
	"Real estate agency",
	"Real estate consultant",
] as const;

/**
 * Business description for GBP (no links; no promotional pricing per Google).
 * Keep identical facts on this site’s footer, /contact, and JSON-LD.
 */
export const GBP_BUSINESS_DESCRIPTION = `${SITE_BUSINESS_NAME} is the North Las Vegas buyer-representation office for ${MASTER_PLAN_NAME} and KB Home’s ${BUILDER_COMMUNITY_NAME}. ${AGENT_NAME}, Nevada license ${AGENT_LICENSE}, practices with ${BROKERAGE_NAME}. This office helps buyers with new construction and resale in the master plan — independent from KB Home sales. Staffed office at ${formatCanonicalGbpAddress()}. Hours: ${formatGbpOfficeHoursPlain()}`;

/** Service-area zips to add in GBP (community + office) — adjust if your service radius changes. */
export const GBP_SERVICE_AREA_LABELS = [
	"North Las Vegas, NV",
	"89032",
	"89084",
] as const;

/** Suggested Q&A to seed in GBP after the profile is created (match on-site FAQ). */
export const GBP_SUGGESTED_QA = [
	{
		question: `What are the office hours for ${SITE_BUSINESS_NAME}?`,
		answer: `${formatGbpOfficeHoursPlain()} Call ${GBP_PHONE_DISPLAY} or schedule through the website.`,
	},
	{
		question: `Where is the homes sales area for ${BUILDER_COMMUNITY_NAME}?`,
		answer: `The KB Home sales intersection is at N 5th St and Sandstone Ranch Pkw, North Las Vegas, NV 89084. Driving directions from I-215 are at ${getSiteUrl()}/visit.`,
	},
	{
		question: "Do I need a REALTOR to buy at Landings at Sandstone?",
		answer:
			"You can tour with KB Home directly. Many buyers also use Dr. Jan Duffy for independent Nevada buyer representation, contract guidance, and resale planning within Sandstone at Tule Springs.",
	},
] as const;

/** Photo types Google expects for a staffed real estate office (upload from GBP dashboard). */
export const GBP_PHOTO_CHECKLIST = [
	"Storefront or suite signage showing the business name (if posted at 851 W Lone Mountain Rd)",
	"Interior of the staffed office or meeting area",
	"Headshot of Dr. Jan Duffy (professional, well-lit)",
	"North Las Vegas / Sandstone at Tule Springs context (master plan monument or area — no misleading labels)",
	"Team or Berkshire Hathaway office branding where permitted",
] as const;

/**
 * Operator reminders — 2026 GBP review policy: no review gating, no staff-name prompts,
 * no discounts for reviews (Google Prohibited & Restricted Content, early 2026).
 */
export const GBP_REVIEW_POLICY_REMINDERS = [
	"Do not offer discounts or gifts in exchange for reviews on this site or in follow-up email.",
	"Do not ask reviewers to mention staff by name or use a tablet that pre-screens ratings.",
	"Use organic review requests only after a completed client experience.",
	"Set NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true on preview URLs until the listing is verified.",
] as const;
