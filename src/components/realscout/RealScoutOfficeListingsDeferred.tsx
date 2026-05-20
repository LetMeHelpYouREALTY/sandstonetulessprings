"use client";

import { useEffect, useRef, useState } from "react";
import { RealScoutScript } from "@/components/realscout/RealScoutScript";
import {
	getRealScoutAgentEncodedId,
	hasRealScoutAgentId,
	REALSCOUT_OFFICE_LISTINGS_DEFAULTS,
} from "@/lib/realscout-config";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";

type RealScoutOfficeListingsDeferredProps = {
	headingId?: string;
	placement?: "below-hero" | "footer";
};

/**
 * Loads RealScout script when the listings block is near the viewport (below hero).
 */
export function RealScoutOfficeListingsDeferred({
	headingId = "office-listings-heading",
	placement = "below-hero",
}: RealScoutOfficeListingsDeferredProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const [loadScript, setLoadScript] = useState(false);

	useEffect(() => {
		const node = sectionRef.current;
		if (!node || !hasRealScoutAgentId()) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setLoadScript(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px 0px", threshold: 0 },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	if (!hasRealScoutAgentId()) {
		return null;
	}

	const agentId = getRealScoutAgentEncodedId();
	const { sortOrder, listingStatus, propertyTypes, priceMin, priceMax } =
		REALSCOUT_OFFICE_LISTINGS_DEFAULTS;

	const sectionClass =
		placement === "below-hero"
			? "w-full border-y border-[var(--border-subtle)] bg-lux-surface px-[var(--gutter)] py-10"
			: "w-full border-t border-[var(--border-subtle)] px-[var(--gutter)] py-12";

	return (
		<section
			ref={sectionRef}
			aria-labelledby={headingId}
			className={sectionClass}
		>
			{loadScript ? <RealScoutScript /> : null}
			<div className="lux-container">
				<h2
					id={headingId}
					className="mb-6 font-display text-[length:var(--text-2xl)] text-lux-text"
				>
					Homes for sale — {SITE_BUSINESS_NAME}
				</h2>
				<realscout-office-listings
					agent-encoded-id={agentId}
					listing-status={listingStatus}
					price-max={priceMax}
					price-min={priceMin}
					property-types={propertyTypes}
					sort-order={sortOrder}
				/>
				<p className="mt-4 text-[length:var(--text-sm)] text-lux-muted-soft">
					Listing data provided by RealScout and participating MLS(s). All
					information deemed reliable but not guaranteed. Buyer to verify all
					facts with the listing broker and appropriate professionals.
				</p>
			</div>
		</section>
	);
}
