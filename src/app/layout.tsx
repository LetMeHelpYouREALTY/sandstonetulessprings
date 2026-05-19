import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
	AGENT_LICENSE,
	BROKERAGE_NAME,
	formatCommunityAddress,
	getCommunityDirectionsUrl,
	getSiteEmail,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { CalendlyBadge } from "@/components/calendly/CalendlyBadge";
import { CalendlyScript } from "@/components/calendly/CalendlyScript";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RealScoutScript } from "@/components/realscout/RealScoutScript";
import { JsonLd } from "@/components/seo/JsonLd";
import { hasCalendlyConfigured } from "@/lib/calendly";
import { buildRealEstateAgentJsonLd } from "@/lib/schema/agent";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: {
		default: SITE_BUSINESS_NAME,
		template: `%s | ${SITE_BUSINESS_NAME}`,
	},
	description:
		"Buyer representation for Sandstone at Tule Springs and KB Home Landings at Sandstone in North Las Vegas (89084). Sales office at N. 5th St. and Sandstone Ranch Pkwy. with Dr. Jan Duffy, REALTOR®.",
	alternates: {
		canonical: "/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://em.realscout.com" />
				<link rel="preconnect" href="https://www.realscout.com" />
				{hasCalendlyConfigured() ? (
					<link
						href="https://assets.calendly.com/assets/external/widget.css"
						rel="stylesheet"
					/>
				) : null}
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
			>
				<JsonLd data={buildRealEstateAgentJsonLd()} />
				<RealScoutScript />
				<CalendlyScript />
				<SiteHeader />
				{children}
				<CalendlyBadge />
				<footer className="mt-auto border-t border-black/10 px-6 py-6 text-center text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-400">
					<p className="font-medium text-neutral-900 dark:text-neutral-100">
						{SITE_BUSINESS_NAME}
					</p>
					<address className="mt-2 not-italic">
						{formatCommunityAddress()}
					</address>
					<div className="mt-4 flex flex-wrap items-center justify-center gap-3">
						<ScheduleCta utmMedium="footer" buttonLabel="Schedule with Dr. Jan" />
					</div>
					<p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
						<a
							className="hover:underline hover:underline-offset-4"
							href={getCommunityDirectionsUrl()}
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
			</body>
		</html>
	);
}
