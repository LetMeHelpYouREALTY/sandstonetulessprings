import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/content/MarketingPage";
import { PageLinks } from "@/components/content/PageLinks";
import { FaqList } from "@/components/content/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import {
	BUILDER_COMMUNITY_NAME,
	BUILDER_NAME,
	buildCommunityFaqJsonLd,
	buildCommunityPlaceJsonLd,
	getMasterPlanGeoSummary,
	KB_HOME_SANDSTONE_PRESS_RELEASE_URL,
	MASTER_PLAN_FAQ,
	MASTER_PLAN_NAME,
} from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { formatCommunityAddress, SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";
import { getSiteUrl } from "@/lib/site-url";

const base = buildPageMetadata(SITE_PAGES.masterPlan);
export const metadata: Metadata = {
	...base,
	title: {
		absolute: "Sandstone at Tule Springs Master Plan | North Las Vegas",
	},
	description:
		"KB Home's Sandstone master plan in North Las Vegas 89084: nearly 300 acres, four communities, 1,500+ homes planned. Facts, map and tours with Dr. Jan Duffy.",
};

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
			<JsonLd data={[buildCommunityPlaceJsonLd(siteUrl), buildCommunityFaqJsonLd(MASTER_PLAN_FAQ)]} />
			<section className="space-y-3" aria-labelledby="sandstone-at-a-glance">
				<h2
					id="sandstone-at-a-glance"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
				>
					Sandstone at a glance (per KB Home, Sept. 4, 2026)
				</h2>
				<ul className="list-disc space-y-2 pl-5 text-lux-text">
					<li>
						Nearly 300 acres, with four new communities and more than 1,500 planned
						homes.
					</li>
					<li>
						Landings and Reserves (one- and two-story single-family homes) are open.
						Meadows (two-story townhomes) and Gardens (two-story single-family homes)
						are under construction.
					</li>
					<li>
						More than 12 acres of planned on-site parks, an extensive trail system
						and a new trailhead with access to Tule Springs Fossil Beds National
						Monument.
					</li>
					<li>
						Planned amenities include pickleball and basketball courts, horseshoe
						pits, ramadas, barbecue and picnic areas, playgrounds and a dog park.
					</li>
					<li>
						North 5th Street and the Las Vegas Beltway (CC-215), with access to
						Interstates 11 and 15. Clark County School District.
					</li>
				</ul>
				<p className="text-[length:var(--text-sm)] text-lux-muted-soft">
					Source:{" "}
					<a
						className="underline underline-offset-4"
						href={KB_HOME_SANDSTONE_PRESS_RELEASE_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						KB Home news release, Sept. 4, 2026 (PR Newswire)
					</a>
					<span className="sr-only"> (opens in a new tab)</span>
				</p>
			</section>
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
			<section className="space-y-3" aria-labelledby="master-plan-faq">
				<h2 id="master-plan-faq" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Master plan questions
				</h2>
				<FaqList items={MASTER_PLAN_FAQ} />
			</section>
			<PageLinks
				pages={[SITE_PAGES.newHomes, SITE_PAGES.visit, SITE_PAGES.buyers, SITE_PAGES.area]}
				title="Related pages"
			/>
		</MarketingPage>
	);
}