import type { MetadataRoute } from "next";
import { absoluteUrl, SITEMAP_ROUTES } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
	return SITEMAP_ROUTES.map((route) => ({
		url: absoluteUrl(route.path),
		lastModified: new Date(),
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));
}
