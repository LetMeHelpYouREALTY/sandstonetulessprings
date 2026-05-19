const DEFAULT_BRAND_COLOR = "1d4ed8";
const SITE_UTM_SOURCE = "sandstonetulessprings.com";

export type CalendlyEventType = "tour" | "consultation";

export type CalendlyUtm = {
	utmSource?: string;
	utmMedium?: string;
	utmCampaign?: string;
};

function baseCalendlyUrl(): string | undefined {
	return (
		process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
		process.env.NEXT_PUBLIC_CALENDLY_TOUR_URL?.trim() ||
		undefined
	);
}

function eventUrl(type: CalendlyEventType): string | undefined {
	if (type === "consultation") {
		return (
			process.env.NEXT_PUBLIC_CALENDLY_CONSULTATION_URL?.trim() || baseCalendlyUrl()
		);
	}
	return process.env.NEXT_PUBLIC_CALENDLY_TOUR_URL?.trim() || baseCalendlyUrl();
}

export function buildCalendlyUrl(
	type: CalendlyEventType = "tour",
	options?: CalendlyUtm,
): string | undefined {
	const raw = eventUrl(type);
	if (!raw) return undefined;

	try {
		const url = new URL(raw);
		url.searchParams.set("hide_gdpr_banner", "1");
		url.searchParams.set("primary_color", DEFAULT_BRAND_COLOR.replace("#", ""));
		url.searchParams.set(
			"utm_source",
			options?.utmSource?.trim() || SITE_UTM_SOURCE,
		);
		if (options?.utmMedium) {
			url.searchParams.set("utm_medium", options.utmMedium);
		}
		if (options?.utmCampaign) {
			url.searchParams.set("utm_campaign", options.utmCampaign);
		}
		return url.toString();
	} catch {
		return raw;
	}
}

export function hasCalendlyConfigured(): boolean {
	return Boolean(buildCalendlyUrl("tour") || buildCalendlyUrl("consultation"));
}
