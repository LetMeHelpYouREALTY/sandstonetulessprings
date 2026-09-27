import { MASTER_PLAN_NAME } from "@/lib/community";

export type AmenityContentSection = {
	id: string;
	title: string;
	paragraphs: readonly string[];
};

/** Server-rendered hyperlocal copy — verifiable place names only. */
export const AMENITY_CONTENT_SECTIONS: readonly AmenityContentSection[] = [
	{
		id: "dining",
		title: "Dining near Sandstone at Tule Springs",
		paragraphs: [
			`Aliante Casino + Hotel on Aliante Pkwy anchors sit-down dining, casual options, and entertainment north of the ${MASTER_PLAN_NAME} corridor. Many buyers also drive to Smith's plaza and nearby chain restaurants along Aliante and Centennial Pkwy.`,
			"Use the map filters for live restaurant results when your Google Maps API key is configured; otherwise see the curated list below the map.",
		],
	},
	{
		id: "parks-recreation",
		title: "Parks and recreation",
		paragraphs: [
			"Floyd Lamb Park at Tule Springs offers trails, picnic areas, and fishing ponds in a desert oasis setting northwest of North Las Vegas.",
			"Tule Springs Fossil Beds National Monument preserves Ice Age fossil deposits and open desert landscape — check the National Park Service for current visitor access and trailheads.",
			`KB Home marketing for Landings at Sandstone notes planned on-site amenities such as courts and a dog park; confirm what is built and open before you rely on them in your purchase decision.`,
		],
	},
	{
		id: "golf",
		title: "Golf",
		paragraphs: [
			"Aliante Golf Club is a public 18-hole course in the Aliante master plan with a clubhouse on Club House Dr.",
			"Additional valley courses — including Las Vegas Paiute Golf Resort to the north — are within a regional drive; verify tee times and membership policies directly with each facility.",
		],
	},
	{
		id: "healthcare",
		title: "Healthcare",
		paragraphs: [
			"Centennial Hills Hospital Medical Center on N Durango Dr is a major acute-care hospital serving the northwest Las Vegas valley.",
			"Retail clinics and urgent-care brands along Aliante Pkwy and Centennial Pkwy supplement primary care; confirm networks with your insurance provider.",
		],
	},
	{
		id: "shopping-grocery",
		title: "Shopping and grocery",
		paragraphs: [
			"Smith's Food and Drug on N Aliante Pkwy is the everyday supermarket many 89084 buyers reference.",
			"Target on N 5th St covers household goods, apparel, and groceries in one stop.",
			"Larger regional malls and big-box corridors sit farther south toward central Las Vegas and Summerlin — plan drive times from your lot.",
		],
	},
	{
		id: "schools",
		title: "Schools (Clark County)",
		paragraphs: [
			"School assignment in Nevada is address-specific. William E. Ferron Elementary is one CCSD campus in the 89084 zip code.",
			"Use Clark County School District zoning tools and speak with CCSD before you assume a particular school for a homesite or resale listing.",
		],
	},
	{
		id: "commute",
		title: "Commute and regional access",
		paragraphs: [
			"Most Sandstone buyers use I-215 via N. 5th St. for belt-route access across the Las Vegas Valley.",
			"The Las Vegas Strip resort corridor is typically about 25–35 minutes in light traffic via I-215 and I-15 (approximate).",
			"Harry Reid International Airport is typically about 30–40 minutes depending on route and time of day (approximate).",
			"Downtown Summerlin and the Summerlin master plan are a cross-valley drive — often 25–40 minutes depending on traffic (approximate).",
		],
	},
];
