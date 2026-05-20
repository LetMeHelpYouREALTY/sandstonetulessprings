import {
	getGbpAggregateRating,
	getGbpPhoneE164,
} from "@/lib/google-business-profile";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	GBP_GEO,
	getSiteEmail,
	OFFICE_ADDRESS,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { buildGbpOpeningHoursSpecification } from "@/lib/schema/opening-hours";

/** Postal address for this site's GBP office (89032). */
export function buildGbpPostalAddress(): Record<string, string> {
	const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry } =
		OFFICE_ADDRESS;
	return {
		"@type": "PostalAddress",
		streetAddress,
		addressLocality,
		addressRegion,
		postalCode,
		addressCountry,
	};
}

/** Map pin for this site's Google Business Profile. */
export function buildGbpGeoCoordinates(): Record<string, unknown> {
	return {
		"@type": "GeoCoordinates",
		latitude: GBP_GEO.latitude,
		longitude: GBP_GEO.longitude,
	};
}

/** Licensed agent — nested under the GBP RealEstateAgent entity. */
export function buildGbpAgentPerson(): Record<string, unknown> {
	return {
		"@type": "Person",
		name: AGENT_NAME,
		identifier: AGENT_LICENSE,
		email: getSiteEmail(),
	};
}

/** Address + geo for GBP office entities. */
export function buildGbpOfficeLocationFields(): Record<string, unknown> {
	return {
		address: buildGbpPostalAddress(),
		geo: buildGbpGeoCoordinates(),
	};
}

/** Hours, phone, and optional aggregate rating — shared by Organization and RealEstateAgent. */
export function buildGbpServiceFields(): Record<string, unknown> {
	const aggregateRating = buildOptionalAggregateRating();
	const telephone = getGbpPhoneE164();

	return {
		openingHoursSpecification: buildGbpOpeningHoursSpecification(),
		telephone,
		contactPoint: {
			"@type": "ContactPoint",
			telephone,
			contactType: "customer service",
			areaServed: "US",
			availableLanguage: ["English"],
		},
		...(aggregateRating ? { aggregateRating } : {}),
	};
}

function buildOptionalAggregateRating(): Record<string, unknown> | undefined {
	const rating = getGbpAggregateRating();
	if (!rating) return undefined;

	return {
		"@type": "AggregateRating",
		ratingValue: rating.ratingValue,
		reviewCount: rating.reviewCount,
		bestRating: 5,
		worstRating: 1,
	};
}

/** RealEstateAgent listing — name matches GBP exactly. */
export function buildGbpRealEstateAgentFields(): Record<string, unknown> {
	return {
		name: SITE_BUSINESS_NAME,
		email: getSiteEmail(),
		...buildGbpOfficeLocationFields(),
		...buildGbpServiceFields(),
		employee: buildGbpAgentPerson(),
	};
}
