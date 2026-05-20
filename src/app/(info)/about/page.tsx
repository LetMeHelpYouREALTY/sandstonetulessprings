import type { Metadata } from "next";
import Link from "next/link";
import { GbpOfficePanel } from "@/components/gbp/GbpOfficePanel";
import { MarketingPage } from "@/components/content/MarketingPage";
import { PageLinks } from "@/components/content/PageLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { MASTER_PLAN_NAME } from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { buildGbpAgentPerson } from "@/lib/schema/gbp-office";
import { getSiteUrl } from "@/lib/site-url";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.about);

export default function AboutPage() {
	const siteUrl = getSiteUrl();

	return (
		<MarketingPage
			page={SITE_PAGES.about}
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> is Dr. Jan Duffy&apos;s staffed
					North Las Vegas office for buyer representation at{" "}
					<strong>{MASTER_PLAN_NAME}</strong> — the same business name, phone, and
					address you should see on the Google listing once it is verified.
				</p>
			}
		>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "ProfilePage",
					"@id": `${siteUrl}/about#profile`,
					url: `${siteUrl}/about`,
					name: `About ${AGENT_NAME}`,
					mainEntity: {
						...buildGbpAgentPerson(),
						jobTitle: "REALTOR®",
						worksFor: {
							"@type": "Organization",
							name: BROKERAGE_NAME,
						},
					},
				}}
			/>
			<section className="space-y-3" aria-labelledby="who-is-agent">
				<h2
					id="who-is-agent"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
				>
					Who is {AGENT_NAME}?
				</h2>
				<p>
					{AGENT_NAME} is a Nevada REALTOR® (license {AGENT_LICENSE}) with{" "}
					{BROKERAGE_NAME}. She represents home buyers — not KB Home — for new
					construction and resale in the Sandstone at Tule Springs area, including
					showings near the homes sales area in zip code 89084.
				</p>
			</section>
			<section className="space-y-3" aria-labelledby="gbp-alignment">
				<h2
					id="gbp-alignment"
					className="font-display text-[length:var(--text-xl)] text-lux-text"
				>
					How does this website match the Google Business Profile?
				</h2>
				<p>
					Google asks that your website show the same business name, address, phone,
					and hours as your listing. This site publishes that information in the
					footer on every page, on the contact page with a map, and in structured
					data for search engines. The KB Home intersection address is listed
					separately as the homes sales area — not as the agent&apos;s office
					address.
				</p>
			</section>
			<GbpOfficePanel utmContext="about-gbp" />
			<PageLinks
				pages={[SITE_PAGES.contact, SITE_PAGES.buyers, SITE_PAGES.faq, SITE_PAGES.newHomes]}
				title="Next steps"
			/>
			<p className="text-[length:var(--text-sm)] text-lux-muted-soft">
				<Link className="underline underline-offset-4" href={SITE_PAGES.contact.path}>
					Contact and directions
				</Link>
			</p>
		</MarketingPage>
	);
}
