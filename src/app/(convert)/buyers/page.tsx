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
	getSiteEmail,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

const base = buildPageMetadata(SITE_PAGES.buyers);
export const metadata: Metadata = {
	...base,
	title: {
		absolute: "Sandstone at Tule Springs Buyer's Agent | Dr. Jan Duffy",
	},
	description:
		"Why use a buyer's agent for KB Home's Sandstone at Tule Springs in North Las Vegas 89084, and how to start with Dr. Jan Duffy.",
};

const SELL_FIRST_CALENDLY_URL =
	"https://calendly.com/drjanduffy/listing-consultation?utm_source=sandstonetulessprings.com&utm_medium=website&utm_campaign=buyers&utm_content=buyers-sell-first";

export default function BuyersPage() {
	return (
		<MarketingPage
			page={SITE_PAGES.buyers}
			showOfficeListings
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — {AGENT_NAME} provides
					independent Nevada buyer representation for new construction and resale
					homes in {MASTER_PLAN_NAME} — not employed by {BUILDER_NAME}.
				</p>
			}
		>
			<section className="space-y-3" aria-labelledby="why-agent">
				<h2 id="why-agent" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Why work with a buyer&apos;s agent at a new-home community?
				</h2>
				<p>
					The builder sales team represents the builder. A buyer&apos;s REALTOR®
					helps you compare villages, understand contracts and timelines, and
					navigate resale if your plans change later within Sandstone.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="how-to-start">
				<h2 id="how-to-start" className="font-display text-[length:var(--text-xl)] text-lux-text">
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
						variant="luxury-primary"
					/>
					<CalendlyButton
						eventType="consultation"
						utm={{ utmMedium: "buyers", utmCampaign: "consultation" }}
						variant="luxury-ghost"
					>
						15-minute phone call
					</CalendlyButton>
				</div>
				<p className="text-[length:var(--text-sm)] text-lux-muted-soft">
					Email:{" "}
					<a className="underline underline-offset-4" href={`mailto:${getSiteEmail()}`}>
						{getSiteEmail()}
					</a>
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="sell-first">
				<h2 id="sell-first" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Selling before you buy
				</h2>
				<p>
					<a
						className="underline underline-offset-4"
						href={SELL_FIRST_CALENDLY_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						Selling a home before you buy at Sandstone? Plan the sale with Dr. Jan
						Duffy.
						<span className="sr-only"> (opens Calendly in a new tab)</span>
					</a>
				</p>
			</section>

			<PageLinks
				pages={[SITE_PAGES.newHomes, SITE_PAGES.visit, SITE_PAGES.faq, SITE_PAGES.contact]}
				title="Related pages"
			/>
		</MarketingPage>
	);
}
