import type { Metadata } from "next";
import { AmenityMapSection } from "@/components/amenities/AmenityMapSection";
import { AmenityTrustCta } from "@/components/amenities/AmenityTrustCta";
import { FaqList } from "@/components/content/FaqList";
import { MarketingPage } from "@/components/content/MarketingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { AMENITY_CONTENT_SECTIONS } from "@/lib/amenities/content-sections";
import { AMENITIES_PAGE_FAQ } from "@/lib/amenities/faq";
import {
	buildAmenitiesCommunityPlaceJsonLd,
	buildAmenitiesFaqJsonLd,
	buildAmenitiesItemListJsonLd,
} from "@/lib/amenities/schema";
import { MASTER_PLAN_NAME } from "@/lib/community";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = buildPageMetadata(SITE_PAGES.amenities);

export default function AmenitiesPage() {
	return (
		<MarketingPage
			page={SITE_PAGES.amenities}
			showNapSummary
			lead={
				<p>
					<strong>{SITE_BUSINESS_NAME}</strong> — hyperlocal map and written guide
					to dining, recreation, healthcare, shopping, schools, and regional
					commutes around {MASTER_PLAN_NAME} in North Las Vegas (89084).
				</p>
			}
		>
			<JsonLd
				data={[
					buildAmenitiesFaqJsonLd(),
					buildAmenitiesItemListJsonLd(),
					buildAmenitiesCommunityPlaceJsonLd(),
				]}
			/>

			<AmenityMapSection
				variant="marketing"
				eyebrow=""
				title="Interactive amenity map"
				lead="Use the category filters to explore nearby dining, shopping, parks, and services around the Sandstone at Tule Springs corridor, or browse featured destinations in the list below."
				showFullStaticList
				hideAmenitiesPageLink
			/>

			{AMENITY_CONTENT_SECTIONS.map((section) => (
				<section key={section.id} className="space-y-3" aria-labelledby={section.id}>
					<h2 id={section.id} className="font-display text-[length:var(--text-xl)] text-lux-text">
						{section.title}
					</h2>
					{section.paragraphs.map((paragraph) => (
						<p key={paragraph.slice(0, 48)}>{paragraph}</p>
					))}
				</section>
			))}

			<section className="space-y-4" aria-labelledby="amenities-faq">
				<h2 id="amenities-faq" className="font-display text-[length:var(--text-xl)] text-lux-text">
					Nearby living FAQ
				</h2>
				<FaqList items={AMENITIES_PAGE_FAQ} />
			</section>

			<AmenityTrustCta />
		</MarketingPage>
	);
}
