import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/content/MarketingPage";
import { PageLinks } from "@/components/content/PageLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
	BUILDER_COMMUNITY_NAME,
	BUILDER_NAME,
	buildCommunityPlaceJsonLd,
	getMasterPlanGeoSummary,
	MASTER_PLAN_NAME,
} from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { formatCommunityAddress, SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.masterPlan);

export default function MasterPlanPage() {
	const siteUrl = getSiteUrl();

	return (
		<MarketingPage
			page={SITE_PAGES.masterPlan}
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — <strong>{MASTER_PLAN_NAME}</strong>{" "}
					is a master-planned community in North Las Vegas, Nevada (89084), north of
					the I-215 and N. 5th St. corridor.
				</p>
			}
		>
			<JsonLd data={buildCommunityPlaceJsonLd(siteUrl)} />
			<section className="space-y-3" aria-labelledby="what-is-sandstone">
				<h2 id="what-is-sandstone" className="font-display text-[length:var(--text-xl)] text-lux-text">
					What is Sandstone at Tule Springs?
				</h2>
				<p>{getMasterPlanGeoSummary()}</p>
				<p>
					Builder villages roll out in phases; {BUILDER_NAME} markets{" "}
					{BUILDER_COMMUNITY_NAME} within this plan. For village-specific floor
					plans and tours, see our{" "}
					<Link className="underline underline-offset-4" href={SITE_PAGES.newHomes.path}>
						Landings at Sandstone page
					</Link>
					.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="where-located">
				<h2 id="where-located" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Where is the community located?
				</h2>
				<p>
					The KB Home sales office for Landings serves buyers near{" "}
					{formatCommunityAddress()}. Use our{" "}
					<Link className="underline underline-offset-4" href={SITE_PAGES.visit.path}>
						visit and directions page
					</Link>{" "}
					for step-by-step driving directions from I-215.
				</p>
			</section>
			<PageLinks
				pages={[SITE_PAGES.newHomes, SITE_PAGES.visit, SITE_PAGES.buyers, SITE_PAGES.area]}
				title="Related pages"
			/>
		</MarketingPage>
	);
}
