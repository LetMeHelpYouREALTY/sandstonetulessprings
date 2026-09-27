import type { AmenityCategoryId, AmenityPlace } from "@/lib/amenities/types";

/**
 * Hyperlocal destinations for SSR copy, map fallback, and ItemList schema.
 * Name and address verified against each `sourceUrl` (2026-09).
 */
export const CURATED_AMENITY_PLACES: readonly AmenityPlace[] = [
	{
		id: "smiths-aliante",
		name: "Smith's Food and Drug",
		category: "grocery",
		streetAddress: "6855 N Aliante Pkwy",
		addressLocality: "North Las Vegas",
		addressRegion: "NV",
		postalCode: "89084",
		schemaType: "GroceryStore",
		sourceUrl:
			"https://www.smithsfoodanddrug.com/stores/grocery/nv/north-las-vegas/aliante-n-las-vegas/706/00338",
	},
	{
		id: "target-n5th",
		name: "Target",
		category: "shopping",
		streetAddress: "7090 N 5th St",
		addressLocality: "North Las Vegas",
		addressRegion: "NV",
		postalCode: "89084",
		schemaType: "Store",
		sourceUrl: "https://www.target.com/sl/north-las-vegas/5th-st/3344",
	},
	{
		id: "aliante-casino",
		name: "Aliante Casino + Hotel",
		category: "restaurants",
		streetAddress: "7300 Aliante Pkwy",
		addressLocality: "North Las Vegas",
		addressRegion: "NV",
		postalCode: "89084",
		schemaType: "Restaurant",
		sourceUrl: "https://www.aliantegaming.com/",
	},
	{
		id: "aliante-golf",
		name: "Aliante Golf Club",
		category: "golf",
		streetAddress: "2400 Club House Dr",
		addressLocality: "North Las Vegas",
		addressRegion: "NV",
		postalCode: "89084",
		schemaType: "GolfCourse",
		sourceUrl: "https://www.aliantegolfclub.com/",
	},
	{
		id: "floyd-lamb-park",
		name: "Floyd Lamb Park at Tule Springs",
		category: "parks",
		streetAddress: "9200 Tule Springs Rd",
		addressLocality: "Las Vegas",
		addressRegion: "NV",
		postalCode: "89131",
		schemaType: "Park",
		sourceUrl:
			"https://www.lasvegasnevada.gov/Residents/Parks-Facilities/Floyd-Lamb-Park",
	},
	{
		id: "centennial-hills-hospital",
		name: "Centennial Hills Hospital Medical Center",
		category: "healthcare",
		streetAddress: "6900 N Durango Dr",
		addressLocality: "Las Vegas",
		addressRegion: "NV",
		postalCode: "89149",
		schemaType: "Hospital",
		sourceUrl: "https://www.centennialhillshospital.com/",
	},
	{
		id: "cvs-aliante",
		name: "CVS Pharmacy",
		category: "pharmacies",
		streetAddress: "7285 Aliante Pkwy",
		addressLocality: "North Las Vegas",
		addressRegion: "NV",
		postalCode: "89084",
		schemaType: "Pharmacy",
		sourceUrl:
			"https://www.cvs.com/store-locator/north-las-vegas-nv-pharmacies/7285-aliante-pkwy-north-las-vegas-nv-89084/storeid=7251",
	},
	{
		id: "walgreens-aliante",
		name: "Walgreens",
		category: "pharmacies",
		streetAddress: "6435 Aliante Pkwy",
		addressLocality: "North Las Vegas",
		addressRegion: "NV",
		postalCode: "89084",
		schemaType: "Pharmacy",
		sourceUrl: "https://www.walgreens.com/storelocator/storeDetails.jsp?stnum=2590",
	},
	{
		id: "ferron-elementary",
		name: "William E. Ferron Elementary School",
		category: "schools",
		streetAddress: "5600 Master Sheep Dr",
		addressLocality: "North Las Vegas",
		addressRegion: "NV",
		postalCode: "89084",
		schemaType: "School",
		sourceUrl: "https://ferrones.ccsd.net/",
	},
	{
		id: "centennial-hills-ymca",
		name: "YMCA of Southern Nevada — Centennial Hills",
		category: "fitness",
		streetAddress: "6601 N Buffalo Dr",
		addressLocality: "Las Vegas",
		addressRegion: "NV",
		postalCode: "89131",
		schemaType: "SportsActivityLocation",
		sourceUrl: "https://www.ymcasnv.org/locations/centennial-hills/",
	},
] as const;

export function formatAmenityAddress(place: AmenityPlace): string {
	return `${place.streetAddress}, ${place.addressLocality}, ${place.addressRegion} ${place.postalCode}`;
}

export function getCuratedPlacesByCategory(
	category: AmenityCategoryId,
): AmenityPlace[] {
	return CURATED_AMENITY_PLACES.filter((place) => place.category === category);
}
