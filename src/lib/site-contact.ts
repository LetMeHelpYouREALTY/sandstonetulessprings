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

/** Google Business Profile place ID — present only when GBP listing is verified. */
export function getGbpPlaceId(): string | undefined {
	return process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim() || undefined;
}

/** Canonical GBP profile URL for schema `sameAs` (g.page or maps.app.goo.gl). */
export function getGbpProfileUrl(): string | undefined {
	return process.env.NEXT_PUBLIC_GBP_PROFILE_URL?.trim() || undefined;
}

/** Agent phone in E.164 (e.g. +17022221964). Set only when it matches verified GBP. */
export function getAgentPhoneTel(): string | undefined {
	const raw = process.env.NEXT_PUBLIC_AGENT_PHONE?.trim();
	if (!raw) return undefined;
	return raw.startsWith("+") ? raw : `+${raw.replace(/\D/g, "")}`;
}

/** Human-formatted US phone (e.g. (702) 222-1964) derived from NEXT_PUBLIC_AGENT_PHONE. */
export function getAgentPhoneDisplay(): string | undefined {
	const tel = getAgentPhoneTel();
	if (!tel) return undefined;
	const digits = tel.replace(/\D/g, "");
	const us = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
	if (us.length !== 10) return tel;
	return `(${us.slice(0, 3)}) ${us.slice(3, 6)}-${us.slice(6)}`;
}
