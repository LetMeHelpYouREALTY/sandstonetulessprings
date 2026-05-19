import type { Metadata } from "next";
import type { SitePageConfig } from "@/lib/site-pages";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";

export function buildPageMetadata(page: SitePageConfig): Metadata {
	const canonical = page.path === "/" ? "/" : page.path;

	return {
		title: page.title,
		description: page.description,
		keywords: [...page.keywords],
		alternates: {
			canonical,
		},
		openGraph: {
			title: page.title,
			description: page.description,
			url: canonical,
			siteName: SITE_BUSINESS_NAME,
			locale: "en_US",
			type: "website",
		},
		twitter: {
			card: "summary",
			title: page.title,
			description: page.description,
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}
