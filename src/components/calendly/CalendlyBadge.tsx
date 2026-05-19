"use client";

import { useCallback, useState } from "react";
import { buildCalendlyUrl, hasCalendlyConfigured, loadCalendlyAssets } from "@/lib/calendly";

/** Floating 15-min conversation CTA — loads Calendly on hover or click. */
export function CalendlyBadge() {
	const [pending, setPending] = useState(false);
	const consultationUrl = buildCalendlyUrl("consultation", {
		utmMedium: "badge",
		utmCampaign: "floating",
	});

	const openWidget = useCallback(async () => {
		if (!consultationUrl) {
			return;
		}
		setPending(true);
		try {
			await loadCalendlyAssets();
			window.Calendly?.initPopupWidget({ url: consultationUrl });
		} finally {
			setPending(false);
		}
	}, [consultationUrl]);

	if (!hasCalendlyConfigured() || !consultationUrl) {
		return null;
	}

	return (
		<button
			type="button"
			onPointerEnter={() => {
				void loadCalendlyAssets();
			}}
			onClick={() => {
				void openWidget();
			}}
			disabled={pending}
			className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800 disabled:opacity-70"
			aria-label="Schedule a conversation with Dr. Jan Duffy"
		>
			{pending ? "Loading…" : "Schedule a call"}
		</button>
	);
}
