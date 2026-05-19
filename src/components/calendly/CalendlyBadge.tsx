"use client";

import { buildCalendlyUrl, hasCalendlyConfigured } from "@/lib/calendly";

/** Floating 15-min conversation CTA (requires CalendlyScript in root layout). */
export function CalendlyBadge() {
	const consultationUrl = buildCalendlyUrl("consultation", {
		utmMedium: "badge",
		utmCampaign: "floating",
	});

	if (!hasCalendlyConfigured() || !consultationUrl) {
		return null;
	}

	return (
		<button
				type="button"
				onClick={() => {
					window.Calendly?.initPopupWidget({ url: consultationUrl });
				}}
				className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800"
				aria-label="Schedule a conversation with Dr. Jan Duffy"
			>
				Schedule a call
		</button>
	);
}
