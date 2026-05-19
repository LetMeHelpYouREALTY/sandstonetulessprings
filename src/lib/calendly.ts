const DEFAULT_BRAND_COLOR = "1d4ed8";
const SITE_UTM_SOURCE = "sandstonetulessprings.com";

const CALENDLY_WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_WIDGET_CSS =
	"https://assets.calendly.com/assets/external/widget.css";

export type CalendlyEventType = "tour" | "consultation";

export type CalendlyUtm = {
	utmSource?: string;
	utmMedium?: string;
	utmCampaign?: string;
};

let calendlyLoadPromise: Promise<void> | null = null;

function appendCalendlyStylesheet(): void {
	if (document.querySelector(`link[href="${CALENDLY_WIDGET_CSS}"]`)) {
		return;
	}
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = CALENDLY_WIDGET_CSS;
	document.head.appendChild(link);
}

/** Load Calendly widget.js + CSS once (on badge hover/click or embed mount). */
export function loadCalendlyAssets(): Promise<void> {
	if (typeof window === "undefined") {
		return Promise.resolve();
	}

	if (window.Calendly) {
		return Promise.resolve();
	}

	if (calendlyLoadPromise) {
		return calendlyLoadPromise;
	}

	calendlyLoadPromise = new Promise((resolve, reject) => {
		appendCalendlyStylesheet();

		const existing = document.querySelector<HTMLScriptElement>(
			`script[src="${CALENDLY_WIDGET_JS}"]`,
		);
		if (existing) {
			existing.addEventListener("load", () => resolve(), { once: true });
			existing.addEventListener("error", () => reject(), { once: true });
			return;
		}

		const script = document.createElement("script");
		script.src = CALENDLY_WIDGET_JS;
		script.async = true;
		script.id = "calendly-widget-js";
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Calendly widget failed to load"));
		document.body.appendChild(script);
	});

	return calendlyLoadPromise;
}

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
