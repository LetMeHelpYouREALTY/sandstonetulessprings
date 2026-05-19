"use client";

import { useEffect, useRef } from "react";
import {
	buildCalendlyUrl,
	hasCalendlyConfigured,
	loadCalendlyAssets,
	type CalendlyEventType,
	type CalendlyUtm,
} from "@/lib/calendly";

type CalendlyEmbedProps = {
	eventType?: CalendlyEventType;
	utm: CalendlyUtm;
	className?: string;
};

export function CalendlyEmbed({
	eventType = "tour",
	utm,
	className = "min-h-[700px] w-full",
}: CalendlyEmbedProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const url = buildCalendlyUrl(eventType, utm);

	useEffect(() => {
		if (!url || !containerRef.current) {
			return;
		}

		let cancelled = false;

		void loadCalendlyAssets().then(() => {
			if (cancelled || !containerRef.current || !window.Calendly) {
				return;
			}
			containerRef.current.innerHTML = "";
			window.Calendly.initInlineWidget({
				url,
				parentElement: containerRef.current,
			});
		});

		return () => {
			cancelled = true;
		};
	}, [url]);

	if (!hasCalendlyConfigured() || !url) {
		return (
			<p className="rounded-lg border border-dashed border-black/20 p-6 text-sm text-neutral-600 dark:border-white/20 dark:text-neutral-400">
				Scheduling is not configured yet. Set{" "}
				<code className="text-xs">NEXT_PUBLIC_CALENDLY_TOUR_URL</code> in Vercel,
				or email Dr. Jan Duffy from the footer.
			</p>
		);
	}

	return <div ref={containerRef} className={className} />;
}
