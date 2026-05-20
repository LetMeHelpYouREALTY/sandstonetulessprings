import {
	COMMUNITY_ADDRESS,
	COMMUNITY_GEO,
	formatCommunityAddress,
	HOME_SALES_AREA_LABEL,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import {
	GEO_ALTERNATE_NAMES,
	MASTER_PLAN_SEARCH_NAME,
	PRIMARY_HOME_SEARCH_QUERY,
} from "@/lib/seo-search-intent";
import { getSiteUrl } from "@/lib/site-url";

/** Master-planned area that includes KB Home Landings and other villages. */
export const MASTER_PLAN_NAME = "Sandstone at Tule Springs";

/** KB Home village within the master plan (builder marketing name). */
export const BUILDER_COMMUNITY_NAME = "Landings at Sandstone at Tule Springs";

export const BUILDER_NAME = "KB Home";

export const KB_HOME_COMMUNITY_URL =
	"https://www.kbhome.com/new-homes-las-vegas/landings-at-sandstone-at-tule-springs";

/** KB Home builder sales line for scheduling model-home / sales-office visits. */
export const BUILDER_SALES_PHONE_DISPLAY = "(725) 726-8785";
export const BUILDER_SALES_PHONE_TEL = "+17257268785";

export const HOME_SQFT_MIN = 1572;
export const HOME_SQFT_MAX = 2469;

/** Turn-by-turn copy aligned with KB Home published directions (Pkwy. in steps; NAP uses Pkw). */
export const DRIVING_DIRECTIONS_FROM_I215 = [
	"From I-215, exit N. 5th St. heading north.",
	"Turn right on Sandstone Ranch Pkwy.",
	"Turn right on Jasmine Hills St.",
	"Turn right on Mimosa Ridge Ave. The community is on the right.",
] as const;

/** Single-paragraph directions for FAQ / AI Overviews (matches KB Home snippet style). */
export const DRIVING_DIRECTIONS_FROM_I215_SUMMARY =
	DRIVING_DIRECTIONS_FROM_I215.join(" ");

export const SALES_OFFICE_APPOINTMENT_NOTE =
	"KB Home sales offices at new communities generally operate by appointment only. Contact the builder directly to schedule a visit.";

export const COMMUNITY_HOME_SUMMARY = `Single-family homes ranging from ${HOME_SQFT_MIN.toLocaleString()} to ${HOME_SQFT_MAX.toLocaleString()} square feet.`;

/** GEO entity summary — cite only verifiable builder/master-plan facts. */
export function getMasterPlanGeoSummary(): string {
	return `${SITE_BUSINESS_NAME} serves buyers looking for ${PRIMARY_HOME_SEARCH_QUERY} in ${MASTER_PLAN_NAME}, a master-planned area in North Las Vegas (89084), with builder villages including KB Home's Landings at Sandstone. The ${HOME_SALES_AREA_LABEL.toLowerCase()} is at ${formatCommunityAddress()}, with freeway access via I-215 and N. 5th St.`;
}

/** Highlights published on KB Home's Landings community page (planned amenities may change). */
export const LANDINGS_KB_HIGHLIGHTS = [
	"Master-planned community setting",
	"Two-story homes with backyards (per KB Home marketing)",
	"Planned community amenities such as pickleball and basketball courts and a dog park (per KB Home)",
	"Convenient access to I-215",
	"Short drive to Aliante Casino and Hotel and local golf courses (per KB Home neighborhood copy)",
] as const;

export const COMMUNITY_FAQ = [
	{
		question: `Where are ${PRIMARY_HOME_SEARCH_QUERY} for sale in North Las Vegas?`,
		answer: `New construction and resale in ${MASTER_PLAN_SEARCH_NAME} (89084) are marketed through builder villages such as ${BUILDER_COMMUNITY_NAME}. The ${HOME_SALES_AREA_LABEL.toLowerCase()} is at ${formatCommunityAddress()}. ${SITE_BUSINESS_NAME} provides independent buyer representation — separate from ${BUILDER_NAME} sales.`,
	},
	{
		question: `How do you get to ${PRIMARY_HOME_SEARCH_QUERY} from I-215?`,
		answer: DRIVING_DIRECTIONS_FROM_I215_SUMMARY,
	},
	{
		question: `Where is the ${HOME_SALES_AREA_LABEL} for ${BUILDER_COMMUNITY_NAME}?`,
		answer: `The ${HOME_SALES_AREA_LABEL.toLowerCase()} is at ${formatCommunityAddress()}. It serves ${BUILDER_COMMUNITY_NAME} within the larger ${MASTER_PLAN_NAME} master plan.`,
	},
	{
		question: `How do I drive to ${BUILDER_COMMUNITY_NAME} from I-215?`,
		answer: DRIVING_DIRECTIONS_FROM_I215_SUMMARY,
	},
	{
		question: "Can I tour the KB Home sales office without an appointment?",
		answer: `${SALES_OFFICE_APPOINTMENT_NOTE} Call ${BUILDER_SALES_PHONE_DISPLAY} to schedule a time.`,
	},
	{
		question: `What home sizes are offered at ${BUILDER_COMMUNITY_NAME}?`,
		answer: COMMUNITY_HOME_SUMMARY,
	},
	{
		question: "Where can I see KB Home floor plans and availability?",
		answer: `Visit the official ${BUILDER_NAME} community page for ${BUILDER_COMMUNITY_NAME} for floor plans, interest-list signup, and builder updates.`,
	},
] as const;

/** Additional buyer-focused FAQs for /faq (AEO — agent vs builder). */
export const BUYER_FAQ = [
	{
		question: "Do I need a REALTOR® to buy at Landings at Sandstone?",
		answer:
			`You can tour the KB Home sales office directly, but many buyers use ${SITE_BUSINESS_NAME} for independent Nevada buyer representation, contract review, and resale guidance within ${MASTER_PLAN_NAME}. Dr. Jan Duffy is not affiliated with KB Home.`,
	},
	{
		question: "Who do I call for builder tours versus buyer representation?",
		answer: `Call ${BUILDER_SALES_PHONE_DISPLAY} to schedule KB Home sales-office visits. Use the Calendly scheduler on this site to book time with ${SITE_BUSINESS_NAME} for buyer representation on new construction or resale in the master plan.`,
	},
] as const;

export const ALL_SITE_FAQ = [...COMMUNITY_FAQ, ...BUYER_FAQ] as const;

export function buildCommunityFaqJsonLd(
	items: readonly { question: string; answer: string }[] = COMMUNITY_FAQ,
): Record<string, unknown> {
	const siteUrl = getSiteUrl();

	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		about: { "@id": `${siteUrl}/#organization` },
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

export function buildCommunityPlaceJsonLd(siteUrl: string): Record<string, unknown> {
	const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry } =
		COMMUNITY_ADDRESS;

	return {
		"@context": "https://schema.org",
		"@type": "Place",
		"@id": `${siteUrl}/#landings-at-sandstone`,
		name: BUILDER_COMMUNITY_NAME,
		alternateName: [...GEO_ALTERNATE_NAMES],
		description: `${BUILDER_COMMUNITY_NAME} is a ${BUILDER_NAME} village in the ${MASTER_PLAN_NAME} master plan in North Las Vegas, Nevada (${COMMUNITY_ADDRESS.postalCode}). ${PRIMARY_HOME_SEARCH_QUERY} are shown on kbhome.com; buyer representation is offered by ${SITE_BUSINESS_NAME}.`,
		url: siteUrl,
		provider: {
			"@type": "RealEstateAgent",
			"@id": `${siteUrl}/#real-estate-agent`,
			name: SITE_BUSINESS_NAME,
		},
		containsPlace: {
			"@type": "Residence",
			name: BUILDER_COMMUNITY_NAME,
		},
		address: {
			"@type": "PostalAddress",
			streetAddress,
			addressLocality,
			addressRegion,
			postalCode,
			addressCountry,
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: COMMUNITY_GEO.latitude,
			longitude: COMMUNITY_GEO.longitude,
		},
	};
}
