import { buildGbpMapEmbedUrl } from "@/lib/google-business-profile";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";

type GBPMapCardProps = {
	/** Accessible label for the map region. */
	title?: string;
	className?: string;
};

/**
 * Google Map embed for this site's GBP office pin.
 * Uses Place ID + API key when configured; otherwise a coordinate-based embed (no key).
 */
export function GBPMapCard({
	title = `Map — ${SITE_BUSINESS_NAME}`,
	className = "",
}: GBPMapCardProps) {
	const embedUrl = buildGbpMapEmbedUrl();

	return (
		<div
			className={`overflow-hidden rounded-lg border border-black/10 dark:border-white/10 ${className}`.trim()}
		>
			<iframe
				title={title}
				src={embedUrl}
				className="h-64 w-full border-0 sm:h-72"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				allowFullScreen
			/>
		</div>
	);
}
