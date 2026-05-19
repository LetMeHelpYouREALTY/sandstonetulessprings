import type { BreadcrumbItem } from "@/lib/site-pages";
import { absoluteUrl } from "@/lib/site-url";

export function buildBreadcrumbJsonLd(
	items: readonly BreadcrumbItem[],
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}
