import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/content/MarketingPage";
import { PageLinks } from "@/components/content/PageLinks";
import { BUILDER_NAME, MASTER_PLAN_NAME } from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { CalendlyButton } from "@/components/calendly/CalendlyButton";
import {
	AGENT_NAME,
	BROKERAGE_NAME,
	getSiteEmail,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.buyers);

export default function BuyersPage() {
	return (
		<MarketingPage
			page={SITE_PAGES.buyers}
			showOfficeListings
			lead={
				<p>
					{AGENT_NAME} provides independent Nevada buyer representation for new
					construction and resale homes in {MASTER_PLAN_NAME} — not employed by{" "}
					{BUILDER_NAME}.
				</p>
			}
		>
			<section className="space-y-3" aria-labelledby="why-agent">
				<h2 id="why-agent" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					Why work with a buyer&apos;s agent at a new-home community?
				</h2>
				<p>
					The builder sales team represents the builder. A buyer&apos;s REALTOR®
					helps you compare villages, understand contracts and timelines, and
					navigate resale if your plans change later within Sandstone.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="how-to-start">
				<h2 id="how-to-start" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					How do you start with Dr. Jan Duffy?
				</h2>
				<p>
					Book a time online or send a note by email with your timeline, budget
					range, and whether you are focused on new construction or resale in the
					master plan.
				</p>
				<div className="flex flex-wrap gap-3">
					<ScheduleCta
						utmMedium="buyers"
						buttonLabel="Schedule a buyer consultation"
					/>
					<CalendlyButton
						eventType="consultation"
						utm={{ utmMedium: "buyers", utmCampaign: "consultation" }}
						className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]"
					>
						15-minute phone call
					</CalendlyButton>
				</div>
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					Email:{" "}
					<a className="underline underline-offset-4" href={`mailto:${getSiteEmail()}`}>
						{getSiteEmail()}
					</a>
				</p>
			</section>
			<p className="text-sm text-neutral-600 dark:text-neutral-400">
				{BROKERAGE_NAME}. Supervising brokerage disclosure per Nevada requirements.
			</p>
			<PageLinks
				pages={[SITE_PAGES.newHomes, SITE_PAGES.visit, SITE_PAGES.faq, SITE_PAGES.contact]}
				title="Related pages"
			/>
		</MarketingPage>
	);
}
