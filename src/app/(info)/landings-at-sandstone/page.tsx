import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/content/MarketingPage";
import { PageLinks } from "@/components/content/PageLinks";
import {
	BUILDER_COMMUNITY_NAME,
	BUILDER_NAME,
	BUILDER_SALES_PHONE_DISPLAY,
	BUILDER_SALES_PHONE_TEL,
	COMMUNITY_HOME_SUMMARY,
	KB_HOME_COMMUNITY_URL,
	LANDINGS_KB_HIGHLIGHTS,
	MASTER_PLAN_NAME,
	SALES_OFFICE_APPOINTMENT_NOTE,
} from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PRIMARY_HOME_SEARCH_QUERY } from "@/lib/seo-search-intent";
import {
	formatCommunityAddress,
	HOME_SALES_AREA_LABEL,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.newHomes);

export default function LandingsAtSandstonePage() {
	return (
		<MarketingPage
			page={SITE_PAGES.newHomes}
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — {BUILDER_COMMUNITY_NAME} is a{" "}
					{BUILDER_NAME} neighborhood inside {MASTER_PLAN_NAME}. {COMMUNITY_HOME_SUMMARY}
				</p>
			}
		>
			<section className="space-y-3" aria-labelledby="sandstone-homes-for-sale">
				<h2
					id="sandstone-homes-for-sale"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
				>
					Where are {PRIMARY_HOME_SEARCH_QUERY} at Landings?
				</h2>
				<p>
					{PRIMARY_HOME_SEARCH_QUERY} in {MASTER_PLAN_NAME} include KB Home&apos;s{" "}
					{BUILDER_COMMUNITY_NAME} — two-story homes with backyards (per KB Home).
					The {HOME_SALES_AREA_LABEL.toLowerCase()} is at{" "}
					<strong>{formatCommunityAddress()}</strong>. Additional villages in the
					master plan may be listed on kbhome.com; verify active communities with
					the builder.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="community-highlights">
				<h2
					id="community-highlights"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
				>
					What does KB Home highlight at Landings?
				</h2>
				<p className="text-[length:var(--text-sm)] text-lux-muted-soft">
					Summarized from the official {BUILDER_NAME} community page — verify
					current amenities with the builder before you buy.
				</p>
				<ul className="list-disc space-y-2 pl-5">
					{LANDINGS_KB_HIGHLIGHTS.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>
			<section className="space-y-3" aria-labelledby="sales-office">
				<h2 id="sales-office" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Where is the KB Home sales office?
				</h2>
				<p>
					The {HOME_SALES_AREA_LABEL.toLowerCase()} is at{" "}
					<strong>{formatCommunityAddress()}</strong>.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="schedule-tour">
				<h2 id="schedule-tour" className="font-display text-[length:var(--text-xl)] text-lux-text">
					How do you schedule a builder tour?
				</h2>
				<p>{SALES_OFFICE_APPOINTMENT_NOTE}</p>
				<p>
					<a
						className="font-medium underline underline-offset-4"
						href={`tel:${BUILDER_SALES_PHONE_TEL}`}
					>
						Call {BUILDER_NAME} sales {BUILDER_SALES_PHONE_DISPLAY}
					</a>
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="floor-plans">
				<h2 id="floor-plans" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Where are floor plans and availability listed?
				</h2>
				<p>
					<a
						className="font-medium underline underline-offset-4"
						href={KB_HOME_COMMUNITY_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						{BUILDER_NAME} — {BUILDER_COMMUNITY_NAME}
					</a>{" "}
					publishes official floor plans, community highlights, and interest-list
					signup.
				</p>
			</section>
			<PageLinks
				pages={[SITE_PAGES.visit, SITE_PAGES.buyers, SITE_PAGES.faq, SITE_PAGES.contact]}
				title="Next steps"
			/>
		</MarketingPage>
	);
}
