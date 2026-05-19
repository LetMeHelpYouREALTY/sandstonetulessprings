const DEFAULT_SITE_URL = "https://www.sandstonetulessprings.com";

/** Production origin for metadata, sitemap, and robots — must match Google Search Console property. */
export function getSiteUrl(): string {
	const raw =
		process.env.NEXT_PUBLIC_BASE_URL ??
		process.env.NEXT_PUBLIC_SITE_URL ??
		DEFAULT_SITE_URL;

	return raw.replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
	const base = getSiteUrl();
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return normalized === "/" ? base : `${base}${normalized}`;
}

export type SitemapRoute = {
	path: string;
	changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
	priority: number;
};

export { SITEMAP_ROUTES } from "@/lib/site-pages";
