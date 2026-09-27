import Link from "next/link";
import { CommunityAmenityMap } from "@/components/amenities/CommunityAmenityMap";
import { AMENITY_PAGE_COMMUNITY_LABEL } from "@/lib/amenities/config";
import { SITE_PAGES } from "@/lib/site-pages";

type AmenityMapSectionProps = {
	/** Section heading — defaults to homepage-style title. */
	title?: string;
	/** Optional lead copy under the heading. */
	lead?: string;
	/** Full curated list on fallback (amenities page). */
	showFullStaticList?: boolean;
	/** Eyebrow label above title. */
	eyebrow?: string;
	variant?: "marketing" | "lux-section";
	/** Hide link when already on /amenities. */
	hideAmenitiesPageLink?: boolean;
};

export function AmenityMapSection({
	title = `Life near ${AMENITY_PAGE_COMMUNITY_LABEL}`,
	lead = "Filter restaurants, groceries, parks, healthcare, and more around the Sandstone at Tule Springs corridor in North Las Vegas (89084).",
	showFullStaticList = false,
	eyebrow = "What's nearby",
	variant = "marketing",
	hideAmenitiesPageLink = false,
}: AmenityMapSectionProps) {
	const inner = (
		<>
			<header className="mb-6 max-w-[var(--measure)] space-y-3">
				{eyebrow ? <p className="lux-eyebrow">{eyebrow}</p> : null}
				<h2 className="font-display text-[length:var(--text-2xl)] text-lux-text text-balance">
					{title}
				</h2>
				<p className="text-[length:var(--text-lg)] text-lux-muted">{lead}</p>
				{hideAmenitiesPageLink ? null : (
					<p className="text-[length:var(--text-sm)]">
						<Link
							className="text-lux-gold-soft underline underline-offset-4 hover:text-lux-gold-hover"
							href={SITE_PAGES.amenities.path}
						>
							Explore the full nearby amenities guide →
						</Link>
					</p>
				)}
			</header>
			<CommunityAmenityMap showFullStaticList={showFullStaticList} />
		</>
	);

	if (variant === "lux-section") {
		return (
			<section className="lux-section border-t border-[var(--border-subtle)]" aria-labelledby="nearby-map-heading">
				<div className="lux-container">
					<div id="nearby-map-heading" className="sr-only">{title}</div>
					{inner}
				</div>
			</section>
		);
	}

	return (
		<section className="space-y-4" aria-labelledby="nearby-map-heading">
			<div id="nearby-map-heading" className="sr-only">{title}</div>
			{inner}
		</section>
	);
}
