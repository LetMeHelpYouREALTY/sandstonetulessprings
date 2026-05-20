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
			languages: {
				"en-US": canonical,
			},
		},
		openGraph: {
			title: page.title,
			description: page.description,
			url: canonical,
			siteName: SITE_BUSINESS_NAME,
			locale: "en_US",
			type: "website",
			images: [
				{
					url: "/opengraph-image",
					width: 1200,
					height: 630,
					alt: `${page.h1} | ${SITE_BUSINESS_NAME}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: page.title,
			description: page.description,
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
	};
}
