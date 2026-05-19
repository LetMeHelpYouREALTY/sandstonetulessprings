import { MASTER_PLAN_NAME } from "@/lib/community";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	COMMUNITY_ADDRESS,
	getSiteEmail,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";

/** Organization + WebSite + RealEstateAgent — single @graph for GEO/GSC entity clarity. */
export function buildSiteGraphJsonLd(): Record<string, unknown> {
	const siteUrl = getSiteUrl();
	const organizationId = `${siteUrl}/#organization`;
	const websiteId = `${siteUrl}/#website`;
	const agentId = `${siteUrl}/#real-estate-agent`;

	const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry } =
		COMMUNITY_ADDRESS;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": organizationId,
				name: SITE_BUSINESS_NAME,
				url: siteUrl,
				email: getSiteEmail(),
				address: {
					"@type": "PostalAddress",
					streetAddress,
					addressLocality,
					addressRegion,
					postalCode,
					addressCountry,
				},
			},
			{
				"@type": "WebSite",
				"@id": websiteId,
				url: siteUrl,
				name: SITE_BUSINESS_NAME,
				inLanguage: "en-US",
				publisher: { "@id": organizationId },
			},
			{
				"@type": "RealEstateAgent",
				"@id": agentId,
				name: AGENT_NAME,
				url: siteUrl,
				email: getSiteEmail(),
				identifier: AGENT_LICENSE,
				description: `${SITE_BUSINESS_NAME} — buyer representation for ${MASTER_PLAN_NAME} and North Las Vegas (89084).`,
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
						postalCode: "89084",
					},
				],
			},
		],
	};
}
