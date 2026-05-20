import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/content/MarketingPage";
import { PageLinks } from "@/components/content/PageLinks";
import { getMasterPlanGeoSummary, MASTER_PLAN_NAME } from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.area);

export default function NorthLasVegasPage() {
	return (
		<MarketingPage
			page={SITE_PAGES.area}
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — {MASTER_PLAN_NAME} sits in North
					Las Vegas (Clark County), with convenient access to the I-215 belt route
					and the broader Las Vegas Valley.
				</p>
			}
		>
			<section className="space-y-3" aria-labelledby="zip-and-access">
				<h2 id="zip-and-access" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					What zip code is Sandstone in?
				</h2>
				<p>{getMasterPlanGeoSummary()}</p>
			</section>
			<section className="space-y-3" aria-labelledby="freeway-access">
				<h2
					id="freeway-access"
					className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
				>
					How do commuters reach the Las Vegas Valley from Sandstone?
				</h2>
				<p>
					Most buyers use <strong>I-215</strong> via <strong>N. 5th St.</strong>{" "}
					for regional access. Step-by-step driving directions to the KB Home
					sales office are on our{" "}
					<Link className="underline underline-offset-4" href={SITE_PAGES.visit.path}>
						visit page
					</Link>
					.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="nearby-lifestyle">
				<h2 id="nearby-lifestyle" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					What is nearby for day-to-day living?
				</h2>
				<p>
					North Las Vegas offers parks, local retail, and quick freeway access.
					KB Home highlights proximity to recreation destinations in the valley,
					including areas toward Mount Charleston and Lee Canyon for outdoor
					trips — verify drive times from your preferred lot before you buy.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="tule-springs">
				<h2 id="tule-springs" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					Why is it called Tule Springs?
				</h2>
				<p>
					The master plan name reflects the Tule Springs area of North Las Vegas,
					a growing submarket north of central Las Vegas. Hyperlocal pages like
					this help buyers understand place context beyond the floor plan alone.
				</p>
			</section>
			<PageLinks
				pages={[SITE_PAGES.masterPlan, SITE_PAGES.newHomes, SITE_PAGES.visit, SITE_PAGES.buyers]}
				title="Community pages"
			/>
			<p>
				<Link className="underline underline-offset-4" href={SITE_PAGES.contact.path}>
					Contact Dr. Jan Duffy
				</Link>{" "}
				for representation questions in 89084.
			</p>
		</MarketingPage>
	);
}
