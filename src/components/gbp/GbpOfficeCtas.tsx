import {
	getGbpPhoneDisplay,
	getGbpPhoneTelHref,
} from "@/lib/google-business-profile";
import { getOfficeDirectionsUrl } from "@/lib/site-contact";
import { buildViewReviewsUrl, buildWriteReviewUrl } from "@/lib/reviews";

const pillPrimaryClass =
	"inline-flex items-center justify-center rounded-full border border-black/10 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:border-white/15 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100";

const pillSecondaryClass =
	"inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]";

type GbpOfficeCtasProps = {
	/** UTM fragment for analytics when linked from different sections. */
	utmContext?: string;
	/** compact = text links; pills = button-style (contact hero). */
	variant?: "compact" | "pills";
};

/**
 * Standard GBP actions: Call, Directions, View Reviews, Write Review.
 * Reviews links hidden when NEXT_PUBLIC_GBP_REVIEWS_DISABLED=true.
 */
export function GbpOfficeCtas({
	utmContext = "gbp-cta",
	variant = "compact",
}: GbpOfficeCtasProps) {
	const tel = getGbpPhoneTelHref();
	const phoneDisplay = getGbpPhoneDisplay();
	const reviewsUrl = buildViewReviewsUrl();
	const writeReviewUrl = buildWriteReviewUrl();

	const linkClass =
		variant === "pills"
			? pillSecondaryClass
			: "font-medium underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100";

	const callClass = variant === "pills" ? pillPrimaryClass : linkClass;

	const items: { key: string; href: string; label: string; className: string }[] = [
		{
			key: "directions",
			href: getOfficeDirectionsUrl(),
			label: "Directions",
			className: linkClass,
		},
	];

	items.unshift({
		key: "call",
		href: tel,
		label: `Call ${phoneDisplay}`,
		className: callClass,
	});

	if (reviewsUrl) {
		items.push({
			key: "reviews",
			href: reviewsUrl,
			label: "View Google Reviews",
			className: linkClass,
		});
	}

	if (writeReviewUrl) {
		items.push({
			key: "write-review",
			href: writeReviewUrl,
			label: "Write a Review",
			className: linkClass,
		});
	}

	if (items.length === 0) return null;

	return (
		<nav
			className={
				variant === "pills"
					? "flex flex-wrap gap-3"
					: "flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
			}
			aria-label="Google Business Profile actions"
			data-utm-context={utmContext}
		>
			{items.map((item) => (
				<a
					key={item.key}
					className={item.className}
					href={item.href}
					rel={item.key === "directions" || item.key.startsWith("review") ? "noopener noreferrer" : undefined}
					target={item.key === "directions" || item.key.startsWith("review") ? "_blank" : undefined}
				>
					{item.label}
				</a>
			))}
		</nav>
	);
}
