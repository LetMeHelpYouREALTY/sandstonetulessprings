import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/sitemap-entries";

/** Served at /sitemap.xml — submit this URL in Google Search Console (property must match host). */
export default function sitemap(): MetadataRoute.Sitemap {
	return getSitemapEntries();
}
