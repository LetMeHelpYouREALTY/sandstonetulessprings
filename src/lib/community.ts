import { COMMUNITY_ADDRESS, formatCommunityAddress } from "@/lib/site-contact";

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

export const DRIVING_DIRECTIONS_FROM_I215 = [
	"From I-215, exit N. 5th St. heading north.",
	"Turn right on Sandstone Ranch Pkwy.",
	"Turn right on Jasmine Hills St.",
	"Turn right on Mimosa Ridge Ave. The community is on the right.",
] as const;

export const SALES_OFFICE_APPOINTMENT_NOTE =
	"KB Home sales offices at new communities generally operate by appointment only. Contact the builder directly to schedule a visit.";

export const COMMUNITY_HOME_SUMMARY = `Single-family homes ranging from ${HOME_SQFT_MIN.toLocaleString()} to ${HOME_SQFT_MAX.toLocaleString()} square feet.`;

export const COMMUNITY_FAQ = [
	{
		question: `Where is the ${BUILDER_NAME} sales office for ${BUILDER_COMMUNITY_NAME}?`,
		answer: `The sales office is at ${formatCommunityAddress()}, at the intersection of N. 5th St. and Sandstone Ranch Pkwy. in North Las Vegas. It serves ${BUILDER_COMMUNITY_NAME} within the larger ${MASTER_PLAN_NAME} master plan.`,
	},
	{
		question: `How do I drive to ${BUILDER_COMMUNITY_NAME} from I-215?`,
		answer: DRIVING_DIRECTIONS_FROM_I215.join(" "),
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

export function buildCommunityFaqJsonLd(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: COMMUNITY_FAQ.map((item) => ({
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
		description: `${BUILDER_COMMUNITY_NAME} is a ${BUILDER_NAME} village in the ${MASTER_PLAN_NAME} master plan in North Las Vegas, Nevada.`,
		url: siteUrl,
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
	};
}
