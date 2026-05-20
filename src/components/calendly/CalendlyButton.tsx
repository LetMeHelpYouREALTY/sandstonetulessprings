"use client";

import { useState, type ReactNode } from "react";
import {
	buildCalendlyUrl,
	hasCalendlyConfigured,
	loadCalendlyAssets,
	type CalendlyEventType,
	type CalendlyUtm,
} from "@/lib/calendly";

const defaultButtonClass =
	"inline-flex items-center justify-center rounded-full border border-black/10 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:border-white/15 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200";

export type CalendlyButtonVariant = "default" | "luxury-primary" | "luxury-ghost";

const variantClasses: Record<CalendlyButtonVariant, string> = {
	default: defaultButtonClass,
	"luxury-primary": "lux-btn-primary",
	"luxury-ghost": "lux-btn-ghost",
};

type CalendlyButtonProps = {
	children: ReactNode;
	className?: string;
	variant?: CalendlyButtonVariant;
	eventType?: CalendlyEventType;
	utm: CalendlyUtm;
};

export function CalendlyButton({
	children,
	className,
	variant = "default",
	eventType = "tour",
	utm,
}: CalendlyButtonProps) {
	const resolvedClass = className ?? variantClasses[variant];
	const [pending, setPending] = useState(false);
	const url = buildCalendlyUrl(eventType, utm);

	if (!hasCalendlyConfigured() || !url) {
		return null;
	}

	return (
		<button
			type="button"
			className={resolvedClass}
			disabled={pending}
			onPointerEnter={() => {
				void loadCalendlyAssets();
			}}
			onClick={() => {
				setPending(true);
				void loadCalendlyAssets()
					.then(() => {
						window.Calendly?.initPopupWidget({ url });
					})
					.finally(() => setPending(false));
			}}
		>
			{pending ? "Loading…" : children}
		</button>
	);
}
