import {
	getRealScoutAgentEncodedId,
	hasRealScoutAgentId,
	REALSCOUT_OFFICE_LISTINGS_DEFAULTS,
} from "@/lib/realscout-config";

type RealScoutOfficeListingsProps = {
	/** Optional heading id for aria-labelledby */
	headingId?: string;
	/** below-hero: directly under page H1/lead; footer: legacy full-width band (avoid on marketing pages). */
	placement?: "below-hero" | "footer";
};

/**
 * Office listings feed — below the page hero (H1 + lead), above body copy.
 */
export function RealScoutOfficeListings({
	headingId = "office-listings-heading",
	placement = "below-hero",
}: RealScoutOfficeListingsProps) {
	if (!hasRealScoutAgentId()) {
		return null;
	}

	const agentId = getRealScoutAgentEncodedId();
	const { sortOrder, listingStatus, propertyTypes, priceMin, priceMax } =
		REALSCOUT_OFFICE_LISTINGS_DEFAULTS;

	const sectionClass =
		placement === "below-hero"
			? "w-full border-y border-black/10 bg-neutral-50/80 px-6 py-10 dark:border-white/10 dark:bg-neutral-900/40"
			: "w-full border-t border-black/10 px-6 py-12 dark:border-white/10";

	return (
		<section aria-labelledby={headingId} className={sectionClass}>
			<div className="mx-auto w-full max-w-5xl">
				<h2
					id={headingId}
					className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
				>
					Homes for sale near Sandstone at Tule Springs
				</h2>
				<realscout-office-listings
					agent-encoded-id={agentId}
					listing-status={listingStatus}
					price-max={priceMax}
					price-min={priceMin}
					property-types={propertyTypes}
					sort-order={sortOrder}
				/>
				<p className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">
					Listing data provided by RealScout and participating MLS(s). All
					information deemed reliable but not guaranteed. Buyer to verify all
					facts with the listing broker and appropriate professionals.
				</p>
			</div>
		</section>
	);
}
