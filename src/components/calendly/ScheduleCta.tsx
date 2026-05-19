import { CalendlyButton } from "@/components/calendly/CalendlyButton";
import { getSiteEmail, mailtoHref } from "@/lib/site-contact";
import { hasCalendlyConfigured } from "@/lib/calendly";

type ScheduleCtaProps = {
	utmMedium: string;
	utmCampaign?: string;
	buttonLabel?: string;
	showEmailFallback?: boolean;
};

/** Primary scheduling CTA; falls back to mailto when Calendly env is unset. */
export function ScheduleCta({
	utmMedium,
	utmCampaign,
	buttonLabel = "Schedule a private tour",
	showEmailFallback = true,
}: ScheduleCtaProps) {
	const utm = { utmMedium, utmCampaign: utmCampaign ?? utmMedium };

	if (hasCalendlyConfigured()) {
		return (
			<CalendlyButton utm={utm} eventType="tour">
				{buttonLabel}
			</CalendlyButton>
		);
	}

	if (!showEmailFallback) {
		return null;
	}

	return (
		<a
			className="inline-flex items-center justify-center rounded-full border border-black/10 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:border-white/15 dark:bg-white dark:text-neutral-900"
			href={mailtoHref("Schedule — Sandstone")}
		>
			Email to schedule — {getSiteEmail()}
		</a>
	);
}
