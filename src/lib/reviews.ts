import {
	CANONICAL_GBP_NAP,
	getGbpPlaceId,
	getGbpWriteReviewUrl,
	isGbpReviewsDisabled,
} from "@/lib/google-business-profile";

/**
 * Google Maps search URL anchored to this site's GBP NAP.
 * Upgrades to Place ID when NEXT_PUBLIC_GBP_PLACE_ID is set.
 */
export function buildMapsSearchUrl(): string {
	const placeId = getGbpPlaceId();
	if (placeId) {
		return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CANONICAL_GBP_NAP.name)}&query_place_id=${encodeURIComponent(placeId)}`;
	}

	const query = [
		CANONICAL_GBP_NAP.name,
		CANONICAL_GBP_NAP.streetAddress,
		`${CANONICAL_GBP_NAP.addressLocality}, ${CANONICAL_GBP_NAP.addressRegion} ${CANONICAL_GBP_NAP.postalCode}`,
	].join(", ");

	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Opens the Google reviews tab for this listing when Place ID is configured. */
export function buildViewReviewsUrl(): string | undefined {
	if (isGbpReviewsDisabled()) return undefined;

	const placeId = getGbpPlaceId();
	if (placeId) {
		return `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`;
	}

	return buildMapsSearchUrl();
}

/** Pre-opened review form from GBP dashboard (g.page/r/...) when provided. */
export function buildWriteReviewUrl(): string | undefined {
	if (isGbpReviewsDisabled()) return undefined;

	const shortLink = getGbpWriteReviewUrl();
	if (shortLink) return shortLink;

	const placeId = getGbpPlaceId();
	if (placeId) {
		return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
	}

	return undefined;
}
