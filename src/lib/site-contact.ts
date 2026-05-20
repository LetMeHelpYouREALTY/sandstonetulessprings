/** GBP business name — must match the Google Business Profile exactly. */
export const SITE_BUSINESS_NAME =
	"Sandstone Tules Springs | Homes By Dr. Jan Duffy";

/** GBP brand segment (before the pipe) — use for titles and body copy tied to the listing. */
export const SITE_GBP_BRAND_NAME = "Sandstone Tules Springs";

/** Short brand for header navigation. */
export const SITE_HEADER_LABEL = SITE_GBP_BRAND_NAME;

/** Default public contact email — must match GBP when email is listed there. */
const DEFAULT_SITE_EMAIL = "drjansells@sandstonetulessprings.com";

/** GBP call-tracking phone — must match this site's Google Business Profile. */
export const GBP_PHONE_DISPLAY = "(702) 466-1509";
export const GBP_PHONE_E164 = "+17024661509";

export const AGENT_NAME = "Dr. Jan Duffy";
export const AGENT_LICENSE = "S.0197614.LLC";
export const BROKERAGE_NAME =
	"Berkshire Hathaway HomeServices Nevada Properties";

/** Visible label — homes / builder sales map area (89084). */
export const HOME_SALES_AREA_LABEL = "Homes sales area";

/** Visible label — staffed office on this site's Google Business Profile (89032). */
export const AGENT_GBP_OFFICE_LABEL = "Agent GBP office";

/** Agent GBP office — must match this site's Google Business Profile exactly. */
export const OFFICE_ADDRESS = {
	streetAddress: "851 W Lone Mountain Rd",
	addressLocality: "North Las Vegas",
	addressRegion: "NV",
	postalCode: "89032",
	addressCountry: "US",
} as const;

/** Visible office label when citing the agent's Berkshire office location. */
export const OFFICE_DISPLAY_NAME =
	"Dr. Jan Duffy - Berkshire Hathaway HomeServices";

/** Homes sales area (KB Home sales office intersection — not the agent GBP office). */
export const COMMUNITY_ADDRESS = {
	streetAddress: "N 5th St and Sandstone Ranch Pkw",
	addressLocality: "North Las Vegas",
	addressRegion: "NV",
	postalCode: "89084",
	addressCountry: "US",
} as const;

/** Google Business Profile map pin — match the lat/long in GBP dashboard. */
export const GBP_GEO = {
	latitude: 36.292,
	longitude: -115.155,
} as const;

/** Homes sales area map pin (same intersection as GBP when pins align). */
export const COMMUNITY_GEO = GBP_GEO;

export function formatOfficeAddress(): string {
	const { streetAddress, addressLocality, addressRegion, postalCode } =
		OFFICE_ADDRESS;
	return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
}

export function getOfficeDirectionsUrl(): string {
	const { latitude, longitude } = GBP_GEO;
	return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export function formatCommunityAddress(): string {
	const { streetAddress, addressLocality, addressRegion, postalCode } =
		COMMUNITY_ADDRESS;
	return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
}

export function getCommunityDirectionsUrl(): string {
	const { latitude, longitude } = COMMUNITY_GEO;
	return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

/** Canonical site contact email (GBP-aligned when verified). */
export function getSiteEmail(): string {
	return process.env.NEXT_PUBLIC_SITE_EMAIL?.trim() || DEFAULT_SITE_EMAIL;
}

export function mailtoHref(subject?: string): string {
	const email = getSiteEmail();
	if (!subject) {
		return `mailto:${email}`;
	}
	return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
