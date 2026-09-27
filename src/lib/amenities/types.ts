/** Curated or API-sourced amenity row for map markers and static HTML. */
export type AmenityPlace = {
	id: string;
	name: string;
	category: AmenityCategoryId;
	/** Verified street address — omit from schema when undefined. */
	streetAddress: string;
	addressLocality: string;
	addressRegion: string;
	postalCode: string;
	/** Official business / agency page used to verify this listing. */
	sourceUrl: string;
	/** Schema.org type for ItemList entries. */
	schemaType:
		| "Restaurant"
		| "GroceryStore"
		| "Store"
		| "Park"
		| "GolfCourse"
		| "Hospital"
		| "Pharmacy"
		| "School"
		| "SportsActivityLocation"
		| "Place";
	latitude?: number;
	longitude?: number;
};

export type AmenityCategoryId =
	| "restaurants"
	| "cafes"
	| "grocery"
	| "parks"
	| "golf"
	| "healthcare"
	| "pharmacies"
	| "shopping"
	| "parking"
	| "fitness"
	| "schools";

export type AmenityCategory = {
	id: AmenityCategoryId;
	label: string;
	/** Google Places API (New) `includedPrimaryTypes` values. */
	placesTypes: readonly string[];
};
