import type { Metadata } from "next";
import Link from "next/link";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { HomeGuideSection } from "@/components/sections/HomeGuideSection";
import { MarketingPage } from "@/components/content/MarketingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
	BUILDER_COMMUNITY_NAME,
	buildCommunityPlaceJsonLd,
	MASTER_PLAN_NAME,
} from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_PAGES } from "@/lib/site-pages";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.home);

export default function HomePage() {
	const siteUrl = getSiteUrl();

	return (
		<MarketingPage
			page={SITE_PAGES.home}
			showOfficeListings
			lead={
				<p>
					Independent buyer representation and resale guidance for{" "}
					<strong>{MASTER_PLAN_NAME}</strong> in North Las Vegas — including{" "}
					{BUILDER_COMMUNITY_NAME}.
				</p>
			}
		>
			<JsonLd data={buildCommunityPlaceJsonLd(siteUrl)} />
			<p>
				This site helps you understand the Sandstone master plan, visit the KB
				Home sales office, and work with Dr. Jan Duffy as your Nevada REALTOR® —
				separate from the builder.
			</p>
			<HomeGuideSection
				explorePages={[
					SITE_PAGES.masterPlan,
					SITE_PAGES.newHomes,
					SITE_PAGES.visit,
					SITE_PAGES.buyers,
					SITE_PAGES.faq,
					SITE_PAGES.area,
					SITE_PAGES.contact,
				]}
			/>
			<div className="flex flex-wrap gap-3">
				<ScheduleCta utmMedium="home-hero" buttonLabel="Schedule with Dr. Jan Duffy" />
				<Link
					className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]"
					href={SITE_PAGES.newHomes.path}
				>
					See new homes at Landings
				</Link>
			</div>
		</MarketingPage>
	);
}
