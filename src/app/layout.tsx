import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
	AGENT_LICENSE,
	BROKERAGE_NAME,
	formatOfficeAddress,
	getOfficeDirectionsUrl,
	getSiteEmail,
	OFFICE_DISPLAY_NAME,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildRootMetadata } from "@/lib/metadata/root-metadata";
import { buildSiteGraphJsonLd } from "@/lib/schema/site-graph";
import "./globals.css";

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen flex flex-col antialiased">
				<JsonLd data={buildSiteGraphJsonLd()} />
				<SiteHeader />
				{children}
				<footer className="mt-auto border-t border-black/10 px-6 py-6 text-center text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-400">
					<p className="font-medium text-neutral-900 dark:text-neutral-100">
						{SITE_BUSINESS_NAME}
					</p>
					<p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
						{OFFICE_DISPLAY_NAME}
					</p>
					<address className="mt-2 not-italic">
						{formatOfficeAddress()}
					</address>
					<div className="mt-4 flex flex-wrap items-center justify-center gap-3">
						<ScheduleCta utmMedium="footer" buttonLabel="Schedule with Dr. Jan" />
					</div>
					<p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
						<a
							className="hover:underline hover:underline-offset-4"
							href={getOfficeDirectionsUrl()}
							rel="noopener noreferrer"
							target="_blank"
						>
							Directions
						</a>
						<span aria-hidden className="text-neutral-400">
							·
						</span>
						<a
							className="hover:underline hover:underline-offset-4"
							href={`mailto:${getSiteEmail()}`}
						>
							{getSiteEmail()}
						</a>
					</p>
					<p className="mt-2 text-xs">
						{BROKERAGE_NAME} · License {AGENT_LICENSE}
					</p>
				</footer>
				<SpeedInsights />
			</body>
		</html>
	);
}
