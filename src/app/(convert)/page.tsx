import type { Metadata } from "next";
import { LuxuryHomePage } from "@/components/home/LuxuryHomePage";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.home);

export default function HomePage() {
	return (
		<main id="main" className="flex-1">
			<LuxuryHomePage />
		</main>
	);
}
