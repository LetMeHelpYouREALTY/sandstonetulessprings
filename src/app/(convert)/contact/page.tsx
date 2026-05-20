import type { Metadata } from "next";
import { CalendlyEmbed } from "@/components/calendly/CalendlyEmbed";
import { GbpOfficePanel } from "@/components/gbp/GbpOfficePanel";
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
	BROKERAGE_NAME,
	formatCommunityAddress,
	getCommunityDirectionsUrl,
	getSiteEmail,
	HOME_SALES_AREA_LABEL,
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
					<strong>agent GBP office</strong> for buyer representation with Dr. Jan
					Duffy.
				</p>
			}
		>
			<section className="space-y-3" aria-labelledby="homes-sales-area">
				<h2
					id="homes-sales-area"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
				>
					{HOME_SALES_AREA_LABEL}
				</h2>
				<p className="text-[length:var(--text-sm)] text-lux-muted-soft">
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
			<GbpOfficePanel showMap ctaVariant="pills" utmContext="contact-gbp" />
			<section className="space-y-3" aria-labelledby="schedule-buyer-consult">
				<h2
					id="schedule-buyer-consult"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
				>
					Schedule a buyer consultation
				</h2>
				<p>
					Book a private tour or buyer strategy session online — appointments route
					through Calendly and sync to Follow Up Boss for follow-up.
				</p>
				<CalendlyEmbed
					eventType="tour"
					utm={{ utmMedium: "contact", utmCampaign: "inline-tour" }}
				/>
				<p className="text-sm">
					{BROKERAGE_NAME} · License {AGENT_LICENSE}
				</p>
				<p className="text-[length:var(--text-sm)] text-lux-muted-soft">
					Email:{" "}
					<a className="underline underline-offset-4" href={`mailto:${getSiteEmail()}`}>
						{getSiteEmail()}
					</a>
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="builder-contact">
				<h2
					id="builder-contact"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
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
