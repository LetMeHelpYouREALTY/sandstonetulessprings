"use client";

import Script from "next/script";
import { hasCalendlyConfigured } from "@/lib/calendly";

/** Loads Calendly widget.js once per page (portfolio standard). */
export function CalendlyScript() {
	if (!hasCalendlyConfigured()) {
		return null;
	}

	return (
		<Script
			id="calendly-widget-js"
			src="https://assets.calendly.com/assets/external/widget.js"
			strategy="afterInteractive"
		/>
	);
}
