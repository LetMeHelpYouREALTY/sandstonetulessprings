import type { Metadata } from "next";
import { FaqList } from "@/components/content/FaqList";
import { MarketingPage } from "@/components/content/MarketingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { ALL_SITE_FAQ, buildCommunityFaqJsonLd } from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.faq);

export default function FaqPage() {
	return (
		<MarketingPage
			page={SITE_PAGES.faq}
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — direct answers about visiting
					KB Home Landings at Sandstone, driving from I-215, and working with an
					independent REALTOR®.
				</p>
			}
		>
			<JsonLd data={buildCommunityFaqJsonLd(ALL_SITE_FAQ)} />
			<FaqList items={ALL_SITE_FAQ} />
		</MarketingPage>
	);
}
