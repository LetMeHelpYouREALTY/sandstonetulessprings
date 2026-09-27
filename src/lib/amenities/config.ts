import { COMMUNITY_GEO, formatCommunityAddress } from "@/lib/site-contact";
import { BUILDER_COMMUNITY_NAME, MASTER_PLAN_NAME } from "@/lib/community";
import type { AmenityCategory, AmenityCategoryId } from "@/lib/amenities/types";

/**
 * Map center — same pin as the homes sales area / GBP-aligned coordinates in
 * `site-contact.ts` (36.292, -115.155 per GBP onboarding docs).
 */
export const AMENITY_MAP_CENTER = {
	latitude: COMMUNITY_GEO.latitude,
	longitude: COMMUNITY_GEO.longitude,
} as const;

export const AMENITY_MAP_DEFAULT_ZOOM = 13;

/** Search radius for Places `searchNearby` (meters). */
export const AMENITY_SEARCH_RADIUS_METERS = 8_000;

export const AMENITY_COMMUNITY_MARKER_LABEL = BUILDER_COMMUNITY_NAME;

export const AMENITY_PAGE_CITY = "North Las Vegas";

export const AMENITY_PAGE_COMMUNITY_LABEL = MASTER_PLAN_NAME;

export const AMENITY_MAP_COMMUNITY_DESCRIPTION = `Homes sales area near ${formatCommunityAddress()} — Sandstone at Tule Springs / Landings corridor (89084).`;

/** Master-planned community — full category set (not 55+ or high-rise ordering). */
export const AMENITY_CATEGORIES: readonly AmenityCategory[] = [
	{
		id: "restaurants",
		label: "Restaurants",
		placesTypes: ["restaurant"],
	},
	{
		id: "cafes",
		label: "Cafes",
		placesTypes: ["cafe", "coffee_shop"],
	},
	{
		id: "grocery",
		label: "Grocery",
		placesTypes: ["grocery_store", "supermarket"],
	},
	{
		id: "parks",
		label: "Parks",
		placesTypes: ["park"],
	},
	{
		id: "golf",
		label: "Golf",
		placesTypes: ["golf_course"],
	},
	{
		id: "healthcare",
		label: "Healthcare",
		placesTypes: ["hospital", "doctor"],
	},
	{
		id: "pharmacies",
		label: "Pharmacies",
		placesTypes: ["pharmacy", "drugstore"],
	},
	{
		id: "shopping",
		label: "Shopping",
		placesTypes: ["shopping_mall", "department_store"],
	},
	{
		id: "parking",
		label: "Parking",
		placesTypes: ["parking"],
	},
	{
		id: "fitness",
		label: "Fitness",
		placesTypes: ["gym", "fitness_center"],
	},
	{
		id: "schools",
		label: "Schools",
		placesTypes: ["school", "primary_school", "secondary_school"],
	},
] as const;

export function getAmenityCategory(
	id: AmenityCategoryId,
): AmenityCategory | undefined {
	return AMENITY_CATEGORIES.find((category) => category.id === id);
}

export function buildCommunityMapEmbedUrl(): string {
	const { latitude, longitude } = AMENITY_MAP_CENTER;
	return `https://www.google.com/maps?q=${latitude},${longitude}&z=${AMENITY_MAP_DEFAULT_ZOOM}&output=embed`;
}

export function buildPlaceDirectionsUrl(placeName: string, address: string): string {
	const query = `${placeName}, ${address}`;
	return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
