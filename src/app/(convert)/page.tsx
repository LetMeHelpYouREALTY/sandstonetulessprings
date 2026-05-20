import type { Metadata } from "next";
import Link from "next/link";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { PageLinks } from "@/components/content/PageLinks";
import { MarketingPage } from "@/components/content/MarketingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
	BUILDER_COMMUNITY_NAME,
	buildCommunityPlaceJsonLd,
	DRIVING_DIRECTIONS_FROM_I215,
	MASTER_PLAN_NAME,
} from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PRIMARY_HOME_SEARCH_QUERY } from "@/lib/seo-search-intent";
import {
	formatCommunityAddress,
	SITE_BUSINESS_NAME,
	SITE_GBP_BRAND_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.home);

export default function HomePage() {
	const siteUrl = getSiteUrl();

	return (
		<MarketingPage
			page={SITE_PAGES.home}
			showOfficeListings
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> helps buyers with{" "}
					<strong>{PRIMARY_HOME_SEARCH_QUERY}</strong> in{" "}
					<strong>{MASTER_PLAN_NAME}</strong>, North Las Vegas (89084) — including{" "}
					{BUILDER_COMMUNITY_NAME}. Independent buyer representation and resale
					guidance; separate from KB Home sales.
				</p>
			}
		>
			<JsonLd data={buildCommunityPlaceJsonLd(siteUrl)} />
			<p>
				This site helps you understand the Sandstone master plan, visit the KB
				Home sales office, and work with {SITE_BUSINESS_NAME} as your Nevada
				REALTOR® — separate from the builder.
			</p>
			<section className="space-y-3" aria-labelledby="where-homes-for-sale">
				<h2
					id="where-homes-for-sale"
					className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
				>
					Where are {PRIMARY_HOME_SEARCH_QUERY} for sale?
				</h2>
				<p>
					New construction in the master plan is marketed through KB Home villages
					such as {BUILDER_COMMUNITY_NAME}. The homes sales area is at{" "}
					<strong>{formatCommunityAddress()}</strong>. Use this site for buyer
					representation; use KB Home for builder tours and floor plans.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="i215-home">
				<h2
					id="i215-home"
					className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
				>
					How do you get to {PRIMARY_HOME_SEARCH_QUERY} from I-215?
				</h2>
				<ol className="list-decimal space-y-2 pl-5">
					{DRIVING_DIRECTIONS_FROM_I215.map((step) => (
						<li key={step}>{step}</li>
					))}
				</ol>
				<p>
					<Link className="underline underline-offset-4" href={SITE_PAGES.visit.path}>
						Full visit and directions page
					</Link>
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="who-represents-buyers">
				<h2
					id="who-represents-buyers"
					className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
				>
					Who represents buyers at {SITE_GBP_BRAND_NAME}?
				</h2>
				<p>
					Dr. Jan Duffy offers independent buyer representation for new
					construction and resale within {MASTER_PLAN_NAME}. KB Home staff at
					Landings represent the builder only — you can use both: tour with the
					builder, then strategize offers and timelines with your REALTOR®.
				</p>
			</section>
			<PageLinks
				pages={[
					SITE_PAGES.masterPlan,
					SITE_PAGES.newHomes,
					SITE_PAGES.visit,
					SITE_PAGES.buyers,
					SITE_PAGES.faq,
					SITE_PAGES.area,
					SITE_PAGES.contact,
				]}
				title="Start here"
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
