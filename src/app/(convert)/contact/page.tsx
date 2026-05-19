import type { Metadata } from "next";
import { CalendlyEmbed } from "@/components/calendly/CalendlyEmbed";
import { MarketingPage } from "@/components/content/MarketingPage";
import { PageLinks } from "@/components/content/PageLinks";
import {
	BUILDER_NAME,
	BUILDER_SALES_PHONE_DISPLAY,
	BUILDER_SALES_PHONE_TEL,
} from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	formatCommunityAddress,
	getAgentPhoneDisplay,
	getAgentPhoneTel,
	getCommunityDirectionsUrl,
	getSiteEmail,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.contact);

export default function ContactPage() {
	const agentPhoneTel = getAgentPhoneTel();
	const agentPhoneDisplay = getAgentPhoneDisplay();

	return (
		<MarketingPage
			page={SITE_PAGES.contact}
			showOfficeListings
			lead={
				<p>
					Reach {AGENT_NAME} for buyer representation. Community visits and
					builder tours use the KB Home line below.
				</p>
			}
		>
			<section className="space-y-4" aria-labelledby="agent-contact">
				<h2 id="agent-contact" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					Schedule with {AGENT_NAME}
				</h2>
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — book a private tour or buyer
					consultation online (leads sync to Follow Up Boss via Calendly).
				</p>
				<CalendlyEmbed
					eventType="tour"
					utm={{ utmMedium: "contact", utmCampaign: "inline-tour" }}
				/>
				<p className="text-sm">
					{BROKERAGE_NAME} · License {AGENT_LICENSE}
				</p>
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					Email (NAP):{" "}
					<a className="underline underline-offset-4" href={`mailto:${getSiteEmail()}`}>
						{getSiteEmail()}
					</a>
				</p>
				{agentPhoneTel && agentPhoneDisplay ? (
					<p className="text-sm text-neutral-600 dark:text-neutral-400">
						Phone (NAP):{" "}
						<a className="underline underline-offset-4" href={`tel:${agentPhoneTel}`}>
							{agentPhoneDisplay}
						</a>
					</p>
				) : null}
			</section>
			<section className="space-y-3" aria-labelledby="community-location">
				<h2 id="community-location" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					Community location (KB Home sales office area)
				</h2>
				<address className="not-italic">{formatCommunityAddress()}</address>
				<p>
					<a
						className="font-medium underline underline-offset-4"
						href={getCommunityDirectionsUrl()}
						rel="noopener noreferrer"
						target="_blank"
					>
						Directions on Google Maps
					</a>
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="builder-contact">
				<h2 id="builder-contact" className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					{BUILDER_NAME} sales (builder tours only)
				</h2>
				<p>
					<a className="underline underline-offset-4" href={`tel:${BUILDER_SALES_PHONE_TEL}`}>
						{BUILDER_SALES_PHONE_DISPLAY}
					</a>
				</p>
			</section>
			<PageLinks pages={[SITE_PAGES.visit, SITE_PAGES.faq, SITE_PAGES.buyers]} title="Helpful links" />
		</MarketingPage>
	);
}
