import { MASTER_PLAN_NAME } from "@/lib/community";
import { BROKERAGE_NAME, getSiteEmail, SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { PRIMARY_HOME_SEARCH_QUERY } from "@/lib/seo-search-intent";
import {
	buildGbpOfficeLocationFields,
	buildGbpRealEstateAgentFields,
} from "@/lib/schema/gbp-office";
import { getSiteUrl } from "@/lib/site-url";

/** Organization + WebSite + RealEstateAgent — single @graph for GEO/GSC entity clarity. */
export function buildSiteGraphJsonLd(): Record<string, unknown> {
	const siteUrl = getSiteUrl();
	const organizationId = `${siteUrl}/#organization`;
	const websiteId = `${siteUrl}/#website`;
	const agentId = `${siteUrl}/#real-estate-agent`;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": organizationId,
				name: SITE_BUSINESS_NAME,
				url: siteUrl,
				email: getSiteEmail(),
				...buildGbpOfficeLocationFields(),
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
				url: siteUrl,
				description: `${SITE_BUSINESS_NAME} — buyer representation for ${PRIMARY_HOME_SEARCH_QUERY} in ${MASTER_PLAN_NAME}, North Las Vegas (89084).`,
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
			},
		],
	};
}
