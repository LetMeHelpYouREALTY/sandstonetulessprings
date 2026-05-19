import type { MetadataRoute } from "next";
import { getSitemapLastModified } from "@/lib/build-date";
import { PRIMARY_NAV } from "@/lib/site-pages";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Sitemap rows for Google Search Console — absolute URLs on canonical host,
 * unique paths only, lastmod at build time.
 */
export function getSitemapEntries(): MetadataRoute.Sitemap {
	const lastModified = getSitemapLastModified();

	return PRIMARY_NAV.map((route) => ({
		url: absoluteUrl(route.path),
		lastModified,
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));
}
