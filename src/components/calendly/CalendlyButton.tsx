"use client";

import type { ReactNode } from "react";
import {
	buildCalendlyUrl,
	hasCalendlyConfigured,
	type CalendlyEventType,
	type CalendlyUtm,
} from "@/lib/calendly";

const defaultButtonClass =
	"inline-flex items-center justify-center rounded-full border border-black/10 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:border-white/15 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200";

type CalendlyButtonProps = {
	children: ReactNode;
	className?: string;
	eventType?: CalendlyEventType;
	utm: CalendlyUtm;
};

export function CalendlyButton({
	children,
	className = defaultButtonClass,
	eventType = "tour",
	utm,
}: CalendlyButtonProps) {
	const url = buildCalendlyUrl(eventType, utm);

	if (!hasCalendlyConfigured() || !url) {
		return null;
	}

	return (
		<button
			type="button"
			className={className}
			onClick={() => {
				window.Calendly?.initPopupWidget({ url });
			}}
		>
			{children}
		</button>
	);
}
