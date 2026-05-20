import { MASTER_PLAN_NAME } from "@/lib/community";
import { BROKERAGE_NAME, SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { buildGbpRealEstateAgentFields } from "@/lib/schema/gbp-office";
import { getSiteUrl } from "@/lib/site-url";

/** Office/agent entity JSON-LD — GBP business name on the listing entity. */
export function buildRealEstateAgentJsonLd(): Record<string, unknown> {
	const siteUrl = getSiteUrl();
	const organizationId = `${siteUrl}/#organization`;

	return {
		"@context": "https://schema.org",
		"@type": "RealEstateAgent",
		"@id": `${siteUrl}/#real-estate-agent`,
		url: siteUrl,
		description: `${SITE_BUSINESS_NAME} — buyer representation for ${MASTER_PLAN_NAME} and North Las Vegas (89084).`,
		...buildGbpRealEstateAgentFields(),
		worksFor: { "@id": organizationId },
		parentOrganization: {
			"@type": "Organization",
			name: BROKERAGE_NAME,
		},
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
				postalCode: "89032",
			},
			{
				"@type": "PostalCode",
				postalCode: "89084",
			},
		],
	};
}
