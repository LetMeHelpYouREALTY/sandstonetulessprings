import { MASTER_PLAN_NAME } from "@/lib/community";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	getSiteEmail,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";

/** Office/agent entity JSON-LD — align NAP with GBP when phone and suite are verified. */
export function buildRealEstateAgentJsonLd(): Record<string, unknown> {
	const siteUrl = getSiteUrl();

	return {
		"@context": "https://schema.org",
		"@type": "RealEstateAgent",
		"@id": `${siteUrl}/#real-estate-agent`,
		name: AGENT_NAME,
		description: `${SITE_BUSINESS_NAME} — buyer representation for ${MASTER_PLAN_NAME} and North Las Vegas (89084).`,
		url: siteUrl,
		email: getSiteEmail(),
		identifier: AGENT_LICENSE,
		areaServed: [
			{
				"@type": "City",
				name: "North Las Vegas",
				containedInPlace: {
					"@type": "State",
					name: "Nevada",
					addressCountry: "US",
				},
			},
			{
				"@type": "PostalCode",
				postalCode: "89084",
			},
		],
		parentOrganization: {
			"@type": "Organization",
			name: BROKERAGE_NAME,
		},
	};
}
