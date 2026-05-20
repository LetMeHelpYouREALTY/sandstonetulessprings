import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/content/MarketingPage";
import {
	BUILDER_COMMUNITY_NAME,
	BUILDER_NAME,
	BUILDER_SALES_PHONE_DISPLAY,
	BUILDER_SALES_PHONE_TEL,
	DRIVING_DIRECTIONS_FROM_I215,
	SALES_OFFICE_APPOINTMENT_NOTE,
} from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PRIMARY_HOME_SEARCH_QUERY } from "@/lib/seo-search-intent";
import {
	formatCommunityAddress,
	getCommunityDirectionsUrl,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.visit);

export default function VisitPage() {
	return (
		<MarketingPage
			page={SITE_PAGES.visit}
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — the {BUILDER_NAME} sales area
					for {BUILDER_COMMUNITY_NAME} is at {formatCommunityAddress()}.
				</p>
			}
		>
			<section className="space-y-4" aria-labelledby="i215-directions">
				<h2 id="i215-directions" className="font-display text-[length:var(--text-xl)] text-lux-text">
					How do you get to {PRIMARY_HOME_SEARCH_QUERY} from I-215?
				</h2>
				<p>
					Follow these steps to reach the KB Home sales area for{" "}
					{BUILDER_COMMUNITY_NAME} at {formatCommunityAddress()}.
				</p>
				<ol className="list-decimal space-y-2 pl-5">
					{DRIVING_DIRECTIONS_FROM_I215.map((step) => (
						<li key={step}>{step}</li>
					))}
				</ol>
			</section>
			<section className="space-y-3" aria-labelledby="appointments">
				<h2 id="appointments" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Are walk-in tours available?
				</h2>
				<p>{SALES_OFFICE_APPOINTMENT_NOTE}</p>
				<p>
					<a
						className="font-medium underline underline-offset-4"
						href={`tel:${BUILDER_SALES_PHONE_TEL}`}
					>
						Call {BUILDER_SALES_PHONE_DISPLAY}
					</a>{" "}
					to schedule with {BUILDER_NAME}.
				</p>
			</section>
			<p>
				<a
					className="lux-btn-primary"
					href={getCommunityDirectionsUrl()}
					rel="noopener noreferrer"
					target="_blank"
				>
					Open directions in Google Maps
				</a>
			</p>
			<p>
				<Link className="underline underline-offset-4" href={SITE_PAGES.buyers.path}>
					Buyer representation with Dr. Jan Duffy
				</Link>{" "}
				is separate from {BUILDER_NAME} sales.
			</p>
		</MarketingPage>
	);
}
