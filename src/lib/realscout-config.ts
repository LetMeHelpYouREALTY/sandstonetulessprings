/** Default embed from RealScout office-listings widget (override via env per site). */
const DEFAULT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

export const REALSCOUT_OFFICE_LISTINGS_DEFAULTS = {
	sortOrder: "STATUS_AND_SIGNIFICANT_CHANGE",
	listingStatus: "For Sale",
	propertyTypes: "SFR",
	priceMin: "505000",
	priceMax: "909000",
} as const;

export function getRealScoutAgentEncodedId(): string {
	return (
		process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID?.trim() ||
		process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ENCODED_ID?.trim() ||
		DEFAULT_AGENT_ENCODED_ID
	);
}

export function hasRealScoutAgentId(): boolean {
	return Boolean(getRealScoutAgentEncodedId());
}
