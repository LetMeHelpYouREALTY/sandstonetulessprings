import type { SitePageConfig } from "@/lib/site-pages";
import { SITE_PAGES } from "@/lib/site-pages";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	formatOfficeAddress,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { ALL_SITE_FAQ } from "@/lib/community";

export type LuxuryCard = {
	title: string;
	answer: string;
	href: string;
	linkLabel: string;
};

export const TRUST_SIGNALS = [
	{
		value: AGENT_LICENSE,
		label: `Nevada real estate license — ${AGENT_NAME}`,
	},
	{
		value: "Berkshire Hathaway",
		label: `${BROKERAGE_NAME} supervision`,
	},
	{
		value: "Senior-first design",
		label: "Large type, strong contrast, 44px touch targets",
	},
	{
		value: "Local depth",
		label: "Neighborhood-level pricing and showing strategy",
	},
] as const;

/** Market cards — links use existing site routes where available. */
export const MARKET_FOCUS: readonly LuxuryCard[] = [
	{
		title: "North Las Vegas & Sandstone",
		answer:
			"Master-planned growth including Sandstone at Tule Springs (89084) and the agent GBP office corridor (89032).",
		href: SITE_PAGES.area.path,
		linkLabel: "North Las Vegas guide",
	},
	{
		title: "Summerlin West",
		answer:
			"Established luxury, golf-adjacent enclaves, and resale estates with discerning buyer pools.",
		href: SITE_PAGES.buyers.path,
		linkLabel: "Buyer representation",
	},
	{
		title: "Skye Canyon",
		answer:
			"Newer builds, mountain views, and active families balancing design and outdoor access.",
		href: SITE_PAGES.buyers.path,
		linkLabel: "Search & guidance",
	},
	{
		title: "Centennial Hills",
		answer:
			"Value-forward luxury with room to customize—popular for move-up and relocating executives.",
		href: SITE_PAGES.buyers.path,
		linkLabel: "Buyer services",
	},
	{
		title: "Henderson",
		answer:
			"Green Valley and Seven Hills luxury with distinct commute and lifestyle profiles.",
		href: SITE_PAGES.buyers.path,
		linkLabel: "Las Vegas valley buyers",
	},
	{
		title: "Las Vegas core",
		answer:
			"Guard-gated and legacy luxury pockets for investors and second-home owners.",
		href: SITE_PAGES.buyers.path,
		linkLabel: "Explore listings",
	},
] as const;

export type LuxuryService = {
	title: string;
	description: string;
	page: SitePageConfig;
};

export const LUXURY_SERVICES: readonly LuxuryService[] = [
	{
		title: "New construction & resale buyers",
		description:
			"Independent representation at KB Home Landings and resale within the master plan.",
		page: SITE_PAGES.buyers,
	},
	{
		title: "Master plan & community tours",
		description:
			"Understand Sandstone at Tule Springs, builder vs agent roles, and visit logistics.",
		page: SITE_PAGES.masterPlan,
	},
	{
		title: "Directions & private tours",
		description:
			"Step-by-step I-215 routing to the homes sales area and appointment-friendly pacing.",
		page: SITE_PAGES.visit,
	},
	{
		title: "California & out-of-state relocators",
		description:
			"Comparison tours, remote due diligence, and lifestyle mapping before you commit.",
		page: SITE_PAGES.buyers,
	},
	{
		title: "55+ & downsizers",
		description:
			"Single-level priorities, HOA clarity, and patient walkthrough pacing.",
		page: SITE_PAGES.buyers,
	},
	{
		title: "Questions & process",
		description:
			"Direct answers about hours, builder tours, and working with your REALTOR®.",
		page: SITE_PAGES.faq,
	},
] as const;

export const FEATURED_COMMUNITIES: readonly LuxuryCard[] = [
	{
		title: "Sandstone at Tule Springs",
		answer:
			"Master plan context, KB Home villages, and buyer representation at the 89084 sales area.",
		href: SITE_PAGES.masterPlan.path,
		linkLabel: "Master plan guide",
	},
	{
		title: "Landings at Sandstone",
		answer:
			"New construction tiers, lot premiums, and touring with your agent—not the builder alone.",
		href: SITE_PAGES.newHomes.path,
		linkLabel: "Landings at Sandstone",
	},
	{
		title: "Office & contact",
		answer: `Staffed office at ${formatOfficeAddress()}. Schedule consultations and view directions.`,
		href: SITE_PAGES.contact.path,
		linkLabel: "Contact & NAP",
	},
] as const;

/** Homepage FAQ subset — mirrors visible copy for AEO JSON-LD. */
export const HOME_PAGE_FAQ = ALL_SITE_FAQ.slice(0, 4);
