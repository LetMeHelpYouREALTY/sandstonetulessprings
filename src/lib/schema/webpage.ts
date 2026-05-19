import type { SitePageConfig } from "@/lib/site-pages";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export function buildWebPageJsonLd(page: SitePageConfig): Record<string, unknown> {
	const pageUrl = absoluteUrl(page.path);

	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${pageUrl}#webpage`,
		url: pageUrl,
		name: page.title,
		description: page.description,
		isPartOf: { "@id": `${getSiteUrl()}/#website` },
		about: { "@id": `${getSiteUrl()}/#organization` },
		inLanguage: "en-US",
	};
}
