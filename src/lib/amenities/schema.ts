import { AMENITY_MAP_CENTER } from "@/lib/amenities/config";
import { CURATED_AMENITY_PLACES } from "@/lib/amenities/curated-places";
import { AMENITIES_PAGE_FAQ } from "@/lib/amenities/faq";
import { MASTER_PLAN_NAME } from "@/lib/community";
import { COMMUNITY_ADDRESS, SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";

export function buildAmenitiesFaqJsonLd(): Record<string, unknown> {
	const siteUrl = getSiteUrl();

	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		about: { "@id": `${siteUrl}/#organization` },
		mainEntity: AMENITIES_PAGE_FAQ.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

export function buildAmenitiesItemListJsonLd(): Record<string, unknown> {
	const siteUrl = getSiteUrl();

	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: `Nearby amenities — ${MASTER_PLAN_NAME}`,
		itemListElement: CURATED_AMENITY_PLACES.map((place, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": place.schemaType,
				name: place.name,
				url: place.sourceUrl,
				address: {
					"@type": "PostalAddress",
					streetAddress: place.streetAddress,
					addressLocality: place.addressLocality,
					addressRegion: place.addressRegion,
					postalCode: place.postalCode,
					addressCountry: "US",
				},
			},
		})),
		url: `${siteUrl}/amenities`,
	};
}

/** Community anchor Place with geo — complements `#landings-at-sandstone` on other pages. */
export function buildAmenitiesCommunityPlaceJsonLd(): Record<string, unknown> {
	const siteUrl = getSiteUrl();
	const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry } =
		COMMUNITY_ADDRESS;

	return {
		"@context": "https://schema.org",
		"@type": "Place",
		"@id": `${siteUrl}/amenities#community-map-center`,
		name: MASTER_PLAN_NAME,
		description: `Map center for ${MASTER_PLAN_NAME} buyer guidance by ${SITE_BUSINESS_NAME}.`,
		address: {
			"@type": "PostalAddress",
			streetAddress,
			addressLocality,
			addressRegion,
			postalCode,
			addressCountry,
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: AMENITY_MAP_CENTER.latitude,
			longitude: AMENITY_MAP_CENTER.longitude,
		},
	};
}
