import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildRootMetadata } from "@/lib/metadata/root-metadata";
import { buildSiteGraphJsonLd } from "@/lib/schema/site-graph";
import "./globals.css";

const playfair = Playfair_Display({
	subsets: ["latin"],
	weight: ["500", "600"],
	variable: "--font-display-family",
	display: "swap",
});

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-body-family",
	display: "swap",
});

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-US" className={`${playfair.variable} ${inter.variable}`}>
			<body className="flex min-h-screen flex-col antialiased">
				<a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-md focus:border focus:border-[var(--border)] focus:bg-lux-surface focus:px-4 focus:py-2 focus:text-lux-text" href="#main">
					Skip to main content
				</a>
				<JsonLd data={buildSiteGraphJsonLd()} />
				<SiteHeader />
				{children}
				<SiteFooter />
				<SpeedInsights />
			</body>
		</html>
	);
}
