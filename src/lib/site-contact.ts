/** GBP business name — must match the Google Business Profile exactly. */
export const SITE_BUSINESS_NAME =
	"Sandstone Tules Springs | Homes by Dr. Jan Duffy";

/** Default public contact email — must match GBP when email is listed there. */
const DEFAULT_SITE_EMAIL = "drjansells@sandstonetulessprings.com";

export const AGENT_NAME = "Dr. Jan Duffy";
export const AGENT_LICENSE = "S.0197614.LLC";
export const BROKERAGE_NAME =
	"Berkshire Hathaway HomeServices Nevada Properties";

/** Sandstone community location — align with GBP service area / community pin. */
export const COMMUNITY_ADDRESS = {
	streetAddress: "N. 5th St. and Sandstone Ranch Pkwy.",
	addressLocality: "North Las Vegas",
	addressRegion: "NV",
	postalCode: "89084",
	addressCountry: "US",
} as const;

export function formatCommunityAddress(): string {
	const { streetAddress, addressLocality, addressRegion, postalCode } =
		COMMUNITY_ADDRESS;
	return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
}

export function getCommunityDirectionsUrl(): string {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatCommunityAddress())}`;
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
