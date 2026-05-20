import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/layout/SiteFooter";
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
				<SiteFooter />
				<SpeedInsights />
			</body>
		</html>
	);
}
