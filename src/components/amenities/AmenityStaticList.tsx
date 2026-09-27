import { buildPlaceDirectionsUrl, getAmenityCategory } from "@/lib/amenities/config";
import type { AmenityCategoryId } from "@/lib/amenities/types";
import {
	formatAmenityAddress,
	getCuratedPlacesByCategory,
} from "@/lib/amenities/curated-places";

type AmenityStaticListProps = {
	category: AmenityCategoryId;
	/** When true, show all curated places grouped by category. */
	showAll?: boolean;
};

export function AmenityStaticList({ category, showAll = false }: AmenityStaticListProps) {
	if (showAll) {
		return (
			<div className="space-y-8">
				{(
					[
						"grocery",
						"shopping",
						"restaurants",
						"parks",
						"golf",
						"healthcare",
						"pharmacies",
						"fitness",
						"schools",
					] as AmenityCategoryId[]
				).map((categoryId) => {
					const places = getCuratedPlacesByCategory(categoryId);
					if (places.length === 0) return null;
					const label = getAmenityCategory(categoryId)?.label ?? categoryId;
					return (
						<section key={categoryId} aria-labelledby={`static-${categoryId}`}>
							<h3
								id={`static-${categoryId}`}
								className="font-display text-[length:var(--text-lg)] text-lux-text"
							>
								{label}
							</h3>
							<ul className="mt-3 space-y-2">
								{places.map((place) => (
									<li key={place.id}>
										<strong className="text-lux-text">{place.name}</strong>
										<span className="text-lux-muted">
											{" "}
											— {formatAmenityAddress(place)}
										</span>
										{" "}
										<a
											className="text-lux-gold-soft underline underline-offset-4 hover:text-lux-gold-hover"
											href={buildPlaceDirectionsUrl(
												place.name,
												formatAmenityAddress(place),
											)}
											target="_blank"
											rel="noopener noreferrer"
										>
											Directions
										</a>
									</li>
								))}
							</ul>
						</section>
					);
				})}
			</div>
		);
	}

	const places = getCuratedPlacesByCategory(category);
	if (places.length === 0) {
		return (
			<p className="text-[length:var(--text-sm)] text-lux-muted">
				No curated listings for this category yet. Switch categories or open the
				full amenities page.
			</p>
		);
	}

	return (
		<ul className="space-y-2 text-[length:var(--text-sm)]" aria-live="polite">
			{places.map((place) => (
				<li key={place.id}>
					<strong className="text-lux-text">{place.name}</strong>
					<span className="text-lux-muted"> — {formatAmenityAddress(place)}</span>
					{" "}
					<a
						className="text-lux-gold-soft underline underline-offset-4 hover:text-lux-gold-hover"
						href={buildPlaceDirectionsUrl(place.name, formatAmenityAddress(place))}
						target="_blank"
						rel="noopener noreferrer"
					>
						Directions
					</a>
				</li>
			))}
		</ul>
	);
}
