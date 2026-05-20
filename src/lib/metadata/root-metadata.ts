import type { Metadata } from "next";
import {
	AGENT_GBP_OFFICE_LABEL,
	formatCommunityAddress,
	formatOfficeAddress,
	HOME_SALES_AREA_LABEL,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { PRIMARY_HOME_SEARCH_QUERY } from "@/lib/seo-search-intent";
import { getGoogleSiteVerification } from "@/lib/metadata/google-verification";
import { getSiteUrl } from "@/lib/site-url";

const DEFAULT_DESCRIPTION = `${SITE_BUSINESS_NAME} — ${PRIMARY_HOME_SEARCH_QUERY} in North Las Vegas (89084). ${AGENT_GBP_OFFICE_LABEL}: ${formatOfficeAddress()}. ${HOME_SALES_AREA_LABEL}: ${formatCommunityAddress()}. Buyer representation for Sandstone at Tule Springs and KB Home Landings.`;

/** Root layout metadata — metadataBase, defaults, GSC verification, OG/Twitter fallbacks. */
export function buildRootMetadata(): Metadata {
	const googleVerification = getGoogleSiteVerification();

	return {
		metadataBase: new URL(getSiteUrl()),
		title: {
			default: SITE_BUSINESS_NAME,
			template: `%s | ${SITE_BUSINESS_NAME}`,
		},
		description: DEFAULT_DESCRIPTION,
		applicationName: SITE_BUSINESS_NAME,
		alternates: {
			canonical: "/",
		},
		openGraph: {
			type: "website",
			locale: "en_US",
			siteName: SITE_BUSINESS_NAME,
			title: SITE_BUSINESS_NAME,
			description: DEFAULT_DESCRIPTION,
			url: "/",
			images: [
				{
					url: "/opengraph-image",
					width: 1200,
					height: 630,
					alt: SITE_BUSINESS_NAME,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: SITE_BUSINESS_NAME,
			description: DEFAULT_DESCRIPTION,
			images: ["/opengraph-image"],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
		...(googleVerification
			? {
					verification: {
						google: googleVerification,
					},
				}
			: {}),
	};
}
