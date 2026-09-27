import type { AmenityCategoryId, AmenityPlace } from "@/lib/amenities/types";

/**
 * Verified nearby destinations for SSR copy, fallback map list, and ItemList schema.
 * Addresses from published retailer / government / hospital listings (2026).
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
