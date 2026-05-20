import {
	AGENT_LICENSE,
	BROKERAGE_NAME,
	SITE_BUSINESS_NAME,
	SITE_GBP_BRAND_NAME,
} from "@/lib/site-contact";
import { PRIMARY_HOME_SEARCH_QUERY } from "@/lib/seo-search-intent";
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
		title: "Sandstone Tule Springs Homes | Dr. Jan Duffy | North Las Vegas 89084",
		description: `${SITE_BUSINESS_NAME} — ${PRIMARY_HOME_SEARCH_QUERY} in North Las Vegas (89084) and the Las Vegas valley. Independent buyer representation for KB Home Landings at Sandstone at Tule Springs, resale, and consultations with Dr. Jan Duffy, REALTOR®. Call (702) 466-1509.`,
		h1: `${SITE_GBP_BRAND_NAME} — luxury home guidance in North Las Vegas`,
		keywords: [
			SITE_BUSINESS_NAME,
			PRIMARY_HOME_SEARCH_QUERY,
			"Sandstone Tule Springs homes 89084",
			"Landings at Sandstone at Tule Springs",
			`${SITE_GBP_BRAND_NAME} REALTOR`,
			"North Las Vegas new homes 89084",
		],

		changeFrequency: "weekly",

		priority: 1,

	},

	masterPlan: {
		path: "/sandstone-at-tule-springs",
		navLabel: "Master plan",
		title: "Sandstone at Tule Springs Master Plan Homes | 89084",
		description: `${SITE_BUSINESS_NAME} — ${PRIMARY_HOME_SEARCH_QUERY} in the Sandstone at Tule Springs master plan, North Las Vegas NV 89084: KB Home villages, homes sales area, and visit directions.`,
		h1: `${SITE_GBP_BRAND_NAME} — Sandstone at Tule Springs`,
		keywords: [
			SITE_BUSINESS_NAME,
			PRIMARY_HOME_SEARCH_QUERY,
			"Sandstone at Tule Springs master plan",
			`${SITE_GBP_BRAND_NAME} North Las Vegas`,
		],

		changeFrequency: "monthly",

		priority: 0.9,

	},

	newHomes: {
		path: "/landings-at-sandstone",
		navLabel: "New homes",
		title: "Landings at Sandstone at Tule Springs Homes | KB Home 89084",
		description: `${SITE_BUSINESS_NAME} — ${PRIMARY_HOME_SEARCH_QUERY} at Landings at Sandstone at Tule Springs: 1,572–2,469 sq ft two-story homes, I-215 access, sales area at N 5th St and Sandstone Ranch Pkw, and official floor plans on kbhome.com.`,
		h1: `${SITE_GBP_BRAND_NAME} — Landings at Sandstone by KB Home`,
		keywords: [
			SITE_BUSINESS_NAME,
			PRIMARY_HOME_SEARCH_QUERY,
			"KB Home Landings at Sandstone",
			"Landings at Sandstone at Tule Springs homes",
			`${SITE_GBP_BRAND_NAME} new homes`,
		],

		changeFrequency: "weekly",

		priority: 0.9,

	},

	visit: {
		path: "/visit",
		navLabel: "Visit",
		title: "Directions to Sandstone Tule Springs Homes from I-215",
		description: `${SITE_BUSINESS_NAME} — driving directions to ${PRIMARY_HOME_SEARCH_QUERY}: exit I-215 at N. 5th St north, Sandstone Ranch Pkwy., Jasmine Hills St., and Mimosa Ridge Ave., North Las Vegas NV 89084.`,
		h1: `${SITE_GBP_BRAND_NAME} — directions to the homes sales area`,
		keywords: [
			SITE_BUSINESS_NAME,
			PRIMARY_HOME_SEARCH_QUERY,
			"directions Sandstone at Tule Springs I-215",
			"KB Home sales office North Las Vegas",
		],

		changeFrequency: "monthly",

		priority: 0.8,

	},

	buyers: {

		path: "/buyers",

		navLabel: "Buyers",

		title: `Buyer representation — ${SITE_GBP_BRAND_NAME}`,

		description: `${SITE_BUSINESS_NAME} — independent buyer representation on new construction and resale homes in Sandstone at Tule Springs, North Las Vegas.`,

		h1: SITE_BUSINESS_NAME,

		keywords: [

			SITE_BUSINESS_NAME,

			`buyer agent ${SITE_GBP_BRAND_NAME}`,

			"new construction buyer representation Las Vegas",

		],

		changeFrequency: "monthly",

		priority: 0.85,

	},

	faq: {
		path: "/faq",
		navLabel: "FAQ",
		title: "Sandstone Tule Springs Homes FAQ",
		description: `${SITE_BUSINESS_NAME} — FAQ for ${PRIMARY_HOME_SEARCH_QUERY}: where homes are for sale in 89084, I-215 driving directions, KB Home Landings tours, home sizes, and buyer vs builder contacts.`,
		h1: `${SITE_GBP_BRAND_NAME} — frequently asked questions`,
		keywords: [
			SITE_BUSINESS_NAME,
			PRIMARY_HOME_SEARCH_QUERY,
			`${SITE_GBP_BRAND_NAME} FAQ`,
			"visit Sandstone homes sales area",
		],

		changeFrequency: "monthly",

		priority: 0.75,

	},

	area: {

		path: "/north-las-vegas",

		navLabel: "Area",

		title: `Area guide — ${SITE_GBP_BRAND_NAME}`,

		description: `${SITE_BUSINESS_NAME} — living near Sandstone at Tule Springs in North Las Vegas (89084): I-215 access, Tule Springs, and nearby recreation in the Las Vegas Valley.`,

		h1: `${SITE_GBP_BRAND_NAME} — North Las Vegas area guide`,

		keywords: [

			SITE_BUSINESS_NAME,

			`${SITE_GBP_BRAND_NAME} area guide`,

			"North Las Vegas 89084 homes",

		],

		changeFrequency: "monthly",

		priority: 0.7,

	},

	about: {
		path: "/about",
		navLabel: "About",
		title: `About Dr. Jan Duffy — ${SITE_GBP_BRAND_NAME}`,
		description: `${SITE_BUSINESS_NAME} — Nevada REALTOR® ${AGENT_LICENSE} with ${BROKERAGE_NAME}. Buyer agent for Sandstone at Tule Springs; office NAP matches Google Business Profile requirements.`,
		h1: `${SITE_GBP_BRAND_NAME} — about Dr. Jan Duffy`,
		keywords: [
			SITE_BUSINESS_NAME,
			"Dr. Jan Duffy REALTOR North Las Vegas",
			`${SITE_GBP_BRAND_NAME} buyer agent`,
		],
		changeFrequency: "yearly",
		priority: 0.75,
	},
	contact: {
		path: "/contact",
		navLabel: "Contact",
		title: `Contact — ${SITE_GBP_BRAND_NAME}`,
		description: `${SITE_BUSINESS_NAME} — agent GBP office on Lone Mountain Rd (89032), homes sales area at N 5th St and Sandstone Ranch Pkw (89084), phone (702) 466-1509, hours, email, and directions.`,
		h1: SITE_BUSINESS_NAME,
		keywords: [
			SITE_BUSINESS_NAME,
			`contact ${SITE_GBP_BRAND_NAME}`,
			`schedule tour ${SITE_GBP_BRAND_NAME}`,
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

	SITE_PAGES.about,

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

