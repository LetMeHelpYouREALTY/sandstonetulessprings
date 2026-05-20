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
	AGENT_GBP_OFFICE_LABEL,
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	formatCommunityAddress,
	formatOfficeAddress,
	getCommunityDirectionsUrl,
	getOfficeDirectionsUrl,
	getSiteEmail,
	HOME_SALES_AREA_LABEL,
	OFFICE_DISPLAY_NAME,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.contact);

export default function ContactPage() {
	return (
		<MarketingPage
			page={SITE_PAGES.contact}
			showOfficeListings
			lead={
				<p>
					Two locations: the <strong>{HOME_SALES_AREA_LABEL.toLowerCase()}</strong>{" "}
					where KB Home hosts model tours, and the{" "}
					<strong>{AGENT_GBP_OFFICE_LABEL.toLowerCase()}</strong> for buyer
					representation with {AGENT_NAME}.
				</p>
			}
		>
			<section className="space-y-3" aria-labelledby="homes-sales-area">
				<h2
					id="homes-sales-area"
					className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
				>
					{HOME_SALES_AREA_LABEL}
				</h2>
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					KB Home sales office intersection in North Las Vegas (89084).
				</p>
				<address className="not-italic">{formatCommunityAddress()}</address>
				<p>
					<a
						className="font-medium underline underline-offset-4"
						href={getCommunityDirectionsUrl()}
						rel="noopener noreferrer"
						target="_blank"
					>
						Directions to homes sales area
					</a>
				</p>
			</section>
			<section className="space-y-4" aria-labelledby="agent-gbp-office">
				<h2
					id="agent-gbp-office"
					className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
				>
					{AGENT_GBP_OFFICE_LABEL}
				</h2>
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — book a private tour or buyer
					consultation online (leads sync to Follow Up Boss via Calendly).
				</p>
				<p className="text-sm">
					<strong>{OFFICE_DISPLAY_NAME}</strong>
					<br />
					<address className="mt-1 not-italic">{formatOfficeAddress()}</address>
					<a
						className="mt-2 inline-block font-medium underline underline-offset-4"
						href={getOfficeDirectionsUrl()}
						rel="noopener noreferrer"
						target="_blank"
					>
						Directions to agent office
					</a>
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
			</section>
			<section className="space-y-3" aria-labelledby="builder-contact">
				<h2
					id="builder-contact"
					className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
				>
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
