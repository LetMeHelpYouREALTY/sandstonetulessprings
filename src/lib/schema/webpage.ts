import type { SitePageConfig } from "@/lib/site-pages";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export function buildWebPageJsonLd(page: SitePageConfig): Record<string, unknown> {
	const pageUrl = absoluteUrl(page.path);
	const siteUrl = getSiteUrl();

	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${pageUrl}#webpage`,
		url: pageUrl,
		name: page.h1,
		description: page.description,
		isPartOf: { "@id": `${siteUrl}/#website` },
		about: { "@id": `${siteUrl}/#organization` },
		publisher: { "@id": `${siteUrl}/#organization` },
		inLanguage: "en-US",
		mainEntity: { "@id": `${siteUrl}/#organization` },
		keywords: SITE_BUSINESS_NAME,
	};
}
