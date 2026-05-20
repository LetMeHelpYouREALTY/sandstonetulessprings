import {
	CalendlyButton,
	type CalendlyButtonVariant,
} from "@/components/calendly/CalendlyButton";
import { getSiteEmail, mailtoHref, SITE_GBP_BRAND_NAME } from "@/lib/site-contact";
import { hasCalendlyConfigured } from "@/lib/calendly";

type ScheduleCtaProps = {
	utmMedium: string;
	utmCampaign?: string;
	buttonLabel?: string;
	showEmailFallback?: boolean;
	variant?: CalendlyButtonVariant;
};

/** Primary scheduling CTA; falls back to mailto when Calendly env is unset. */
export function ScheduleCta({
	utmMedium,
	utmCampaign,
	buttonLabel = "Schedule a private tour",
	showEmailFallback = true,
	variant = "default",
}: ScheduleCtaProps) {
	const utm = { utmMedium, utmCampaign: utmCampaign ?? utmMedium };

	if (hasCalendlyConfigured()) {
		return (
			<CalendlyButton utm={utm} eventType="tour" variant={variant}>
				{buttonLabel}
			</CalendlyButton>
		);
	}

	if (!showEmailFallback) {
		return null;
	}

	const mailtoClass =
		variant === "luxury-ghost"
			? "lux-btn-ghost"
			: variant === "luxury-primary"
				? "lux-btn-primary"
				: "inline-flex items-center justify-center rounded-full border border-black/10 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800";

	return (
		<a className={mailtoClass} href={mailtoHref(`Schedule — ${SITE_GBP_BRAND_NAME}`)}>
			Email to schedule — {getSiteEmail()}
		</a>
	);
}
