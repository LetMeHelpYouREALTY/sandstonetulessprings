import type { SitemapRoute } from "@/lib/site-url";

/** Core marketing routes — 8 URLs for launch SEO / GEO / AEO (pillar + topical, not thin clones). */
export type SitePageConfig = SitemapRoute & {
	/** Short label for header navigation */
	navLabel: string;
	/** Document title segment (before site name template) */
	title: string;
	/** Meta description — unique per URL */
	description: string;
	/** Visible H1 — unique per URL */
	h1: string;
	/** Local SEO keywords — unique per URL */
	keywords: string[];
};

export type BreadcrumbItem = {
	name: string;
	path: string;
};

export const SITE_PAGES = {
	home: {
		path: "/",
		navLabel: "Home",
		title: "Homes at Sandstone Tule Springs, North Las Vegas",
		description:
			"Buyer representation for Sandstone at Tule Springs and KB Home Landings at Sandstone in North Las Vegas (89084). Dr. Jan Duffy, REALTOR®.",
		h1: "Sandstone Tule Springs | Homes by Dr. Jan Duffy",
		keywords: [
			"Sandstone Tule Springs homes",
			"North Las Vegas new homes 89084",
			"Dr. Jan Duffy REALTOR",
		],
		changeFrequency: "weekly",
		priority: 1,
	},
	masterPlan: {
		path: "/sandstone-at-tule-springs",
		navLabel: "Master plan",
		title: "Sandstone at Tule Springs Master Plan",
		description:
			"Overview of the Sandstone at Tule Springs master-planned community in North Las Vegas, NV 89084 — villages, location, and how to visit.",
		h1: "Sandstone at Tule Springs in North Las Vegas",
		keywords: [
			"Sandstone at Tule Springs master plan",
			"Tule Springs North Las Vegas",
			"89084 new construction",
		],
		changeFrequency: "monthly",
		priority: 0.9,
	},
	newHomes: {
		path: "/landings-at-sandstone",
		navLabel: "New homes",
		title: "KB Home Landings at Sandstone",
		description:
			"KB Home Landings at Sandstone at Tule Springs: home sizes, builder sales office at N. 5th St. and Sandstone Ranch Pkwy., and floor plans on kbhome.com.",
		h1: "Landings at Sandstone at Tule Springs by KB Home",
		keywords: [
			"KB Home Landings at Sandstone",
			"new homes Sandstone Ranch Pkwy",
			"North Las Vegas KB Home",
		],
		changeFrequency: "weekly",
		priority: 0.9,
	},
	visit: {
		path: "/visit",
		navLabel: "Visit",
		title: "Directions to the Sandstone Sales Office",
		description:
			"How to reach KB Home Landings at Sandstone from I-215: N. 5th St., Sandstone Ranch Pkwy., Jasmine Hills St., and Mimosa Ridge Ave. in 89084.",
		h1: "How do you get to the Sandstone sales office?",
		keywords: [
			"directions Sandstone Tule Springs",
			"I-215 to Sandstone Ranch Pkwy",
			"KB Home sales office North Las Vegas",
		],
		changeFrequency: "monthly",
		priority: 0.8,
	},
	buyers: {
		path: "/buyers",
		navLabel: "Buyers",
		title: "Buyer Representation at Sandstone",
		description:
			"Work with Dr. Jan Duffy for independent buyer representation on new construction and resale homes in Sandstone at Tule Springs, North Las Vegas.",
		h1: "Buyer representation at Sandstone Tule Springs",
		keywords: [
			"buyer agent Sandstone Tule Springs",
			"new construction buyer representation Las Vegas",
			"REALTOR North Las Vegas 89084",
		],
		changeFrequency: "monthly",
		priority: 0.85,
	},
	faq: {
		path: "/faq",
		navLabel: "FAQ",
		title: "Sandstone at Tule Springs FAQ",
		description:
			"Answers about KB Home Landings at Sandstone: sales office location, I-215 directions, home sizes, tours, and builder vs REALTOR® contacts.",
		h1: "Frequently asked questions about Sandstone",
		keywords: [
			"Sandstone Tule Springs FAQ",
			"KB Home Landings questions",
			"visit Sandstone sales office",
		],
		changeFrequency: "monthly",
		priority: 0.75,
	},
	area: {
		path: "/north-las-vegas",
		navLabel: "Area",
		title: "North Las Vegas & Tule Springs Area Guide",
		description:
			"Living near Sandstone at Tule Springs in North Las Vegas (89084): I-215 access, Tule Springs, and nearby recreation in the Las Vegas Valley.",
		h1: "North Las Vegas and the Tule Springs area",
		keywords: [
			"North Las Vegas 89084 homes",
			"Tule Springs area guide",
			"living near I-215 North Las Vegas",
		],
		changeFrequency: "monthly",
		priority: 0.7,
	},
	contact: {
		path: "/contact",
		navLabel: "Contact",
		title: "Contact Dr. Jan Duffy",
		description:
			"Contact Dr. Jan Duffy for Sandstone at Tule Springs real estate in North Las Vegas. Community address, directions, and email.",
		h1: "Contact and community location",
		keywords: [
			"contact Dr. Jan Duffy Sandstone",
			"schedule tour Sandstone Tule Springs",
			"Sandstone Ranch Pkwy real estate",
		],
		changeFrequency: "yearly",
		priority: 0.8,
	},
} as const satisfies Record<string, SitePageConfig>;

export function breadcrumbTrail(
	page: SitePageConfig,
): readonly BreadcrumbItem[] {
	if (page.path === "/") {
		return [{ name: "Home", path: "/" }];
	}
	return [
		{ name: "Home", path: "/" },
		{ name: page.navLabel, path: page.path },
	];
}

export const PRIMARY_NAV = [
	SITE_PAGES.home,
	SITE_PAGES.masterPlan,
	SITE_PAGES.newHomes,
	SITE_PAGES.visit,
	SITE_PAGES.buyers,
	SITE_PAGES.faq,
	SITE_PAGES.area,
	SITE_PAGES.contact,
] as const;

export const SITEMAP_ROUTES: SitemapRoute[] = PRIMARY_NAV.map(
	({ path, changeFrequency, priority }) => ({
		path,
		changeFrequency,
		priority,
	}),
);

export function getSitePageByPath(path: string): SitePageConfig | undefined {
	return PRIMARY_NAV.find((page) => page.path === path);
}
