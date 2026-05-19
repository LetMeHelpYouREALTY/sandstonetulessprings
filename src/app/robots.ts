import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
	const siteUrl = getSiteUrl();

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			// Do not block /_next/static — Google needs CSS/JS for rendering.
		},
		sitemap: absoluteUrl("/sitemap.xml"),
		host: siteUrl,
	};
}
