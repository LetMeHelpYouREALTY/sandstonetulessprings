import { CalendlyBadge } from "@/components/calendly/CalendlyBadge";
import { ConvertResourceHints } from "@/components/performance/ConvertResourceHints";

/** High-intent routes: Calendly badge + dns-prefetch for deferred RealScout (/, /buyers, /contact). */
export default function ConvertLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<ConvertResourceHints />
			{children}
			<CalendlyBadge />
		</>
	);
}
