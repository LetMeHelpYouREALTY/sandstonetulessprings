import {
	formatOfficeAddress,
	GBP_GEO,
	GBP_PHONE_E164,
	OFFICE_ADDRESS,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";

/** Day-of-week keys for schema.org OpeningHoursSpecification. */
export type Weekday =
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday"
	| "Sunday";

export type GbpHoursBlock = {
	days: readonly Weekday[];
	opens: string;
	closes: string;
};

/**
 * Staffed office hours at 851 W Lone Mountain Rd — align with the Google Business Profile
 * dashboard (portfolio sites at this address publish Mon–Fri 9–6, Sat 10–4, Sun by appointment).
 */
export const GBP_WEEKDAY_HOURS: GbpHoursBlock = {
	days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
	opens: "09:00",
	closes: "18:00",
};

export const GBP_SATURDAY_HOURS: GbpHoursBlock = {
	days: ["Saturday"],
	opens: "10:00",
	closes: "16:00",
};

export const GBP_SUNDAY_NOTE = "Sunday by appointment";

/** Human-readable hours for visible copy and FAQ answers. */
export function formatGbpOfficeHoursPlain(): string {
	return `Monday through Friday, 9:00 AM to 6:00 PM; Saturday, 10:00 AM to 4:00 PM; ${GBP_SUNDAY_NOTE.toLowerCase()}.`;
}

/** Short line for footer / compact NAP blocks. */
export function formatGbpOfficeHoursShort(): string {
	return "Mon–Fri 9 AM–6 PM · Sat 10 AM–4 PM · Sun by appointment";
}

/** Call-tracking line for this GBP — env override, else site default from GBP dashboard. */
export function getGbpPhoneE164(): string {
	return process.env.NEXT_PUBLIC_GBP_PHONE?.trim() || GBP_PHONE_E164;
}

export function getGbpPhoneDisplay(): string {
	const e164 = getGbpPhoneE164();
	const digits = e164.replace(/\D/g, "");
	if (digits.length === 11 && digits.startsWith("1")) {
		return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
	}
	if (digits.length === 10) {
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
	}
	return e164;
}

export function getGbpPhoneTelHref(): string {
	const digits = getGbpPhoneE164().replace(/\D/g, "");
	return digits.startsWith("1") ? `tel:+${digits}` : `tel:+1${digits}`;
}

export function isGbpReviewsDisabled(): boolean {
	return process.env.NEXT_PUBLIC_GBP_REVIEWS_DISABLED === "true";
}

export function getGbpPlaceId(): string | undefined {
	return process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim() || undefined;
}

export function getGbpWriteReviewUrl(): string | undefined {
	return process.env.NEXT_PUBLIC_GBP_WRITEREVIEW_URL?.trim() || undefined;
}

export function getGoogleMapsApiKey(): string | undefined {
	return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() || undefined;
}

/** Embed URL — Place ID + API key when configured; otherwise address/coordinate iframe (no key). */
export function buildGbpMapEmbedUrl(): string {
	const placeId = getGbpPlaceId();
	const apiKey = getGoogleMapsApiKey();
	if (placeId && apiKey) {
		return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=place_id:${encodeURIComponent(placeId)}`;
	}
	const { latitude, longitude } = GBP_GEO;
	return `https://maps.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;
}

export type GbpAggregateRating = {
	ratingValue: number;
	reviewCount: number;
};

/** Emit aggregateRating only when GBP has 5+ verified reviews (env-driven). */
export function getGbpAggregateRating(): GbpAggregateRating | undefined {
	const countRaw = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT?.trim();
	const valueRaw = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE?.trim();
	if (!countRaw || !valueRaw) return undefined;

	const reviewCount = Number.parseInt(countRaw, 10);
	const ratingValue = Number.parseFloat(valueRaw);
	if (
		!Number.isFinite(reviewCount) ||
		!Number.isFinite(ratingValue) ||
		reviewCount < 5 ||
		ratingValue <= 0 ||
		ratingValue > 5
	) {
		return undefined;
	}

	return { ratingValue, reviewCount };
}

/** Canonical NAP object for Maps search / review deep links. */
export const CANONICAL_GBP_NAP = {
	name: SITE_BUSINESS_NAME,
	streetAddress: OFFICE_ADDRESS.streetAddress,
	addressLocality: OFFICE_ADDRESS.addressLocality,
	addressRegion: OFFICE_ADDRESS.addressRegion,
	postalCode: OFFICE_ADDRESS.postalCode,
	addressCountry: OFFICE_ADDRESS.addressCountry,
} as const;

export function formatCanonicalGbpAddress(): string {
	return formatOfficeAddress();
}
