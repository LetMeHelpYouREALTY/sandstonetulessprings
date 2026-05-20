import type { ReactNode } from "react";
import { SiteNapSummary } from "@/components/layout/SiteNapSummary";
import { RealScoutOfficeListingsDeferred } from "@/components/realscout/RealScoutOfficeListingsDeferred";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/schema/breadcrumb";
import { buildWebPageJsonLd } from "@/lib/schema/webpage";
import { breadcrumbTrail, type SitePageConfig } from "@/lib/site-pages";

type MarketingPageProps = {
	page: SitePageConfig;
	lead?: ReactNode;
	children: ReactNode;
	/** Convert routes only (/, /buyers, /contact) — deferred RealScout below hero. */
	showOfficeListings?: boolean;
	/** Info routes — compact dual-location NAP above page footer. */
	showNapSummary?: boolean;
};

export function MarketingPage({
	page,
	lead,
	children,
	showOfficeListings = false,
	showNapSummary = false,
}: MarketingPageProps) {
	const crumbs = breadcrumbTrail(page);

	return (
		<article id="main" className="flex w-full flex-1 flex-col">
			<div className="lux-container flex flex-col gap-8 py-12 sm:py-16">
				<JsonLd
					data={[buildWebPageJsonLd(page), buildBreadcrumbJsonLd(crumbs)]}
				/>
				<Breadcrumbs items={crumbs} />
				<header className="max-w-[var(--measure)] space-y-4 border-b border-[var(--border-subtle)] pb-8">
					<h1 className="font-display text-[length:var(--text-3xl)] text-lux-text text-balance">
						{page.h1}
					</h1>
					{lead ? (
						<div className="text-[length:var(--text-lg)] text-lux-muted">{lead}</div>
					) : null}
				</header>
			</div>

			{showOfficeListings ? (
				<RealScoutOfficeListingsDeferred placement="below-hero" />
			) : null}

			<div className="lux-container flex-1 space-y-8 pb-12 text-lux-muted sm:pb-16 [&_a]:text-lux-gold-soft [&_a:hover]:text-lux-gold-hover [&_h2]:font-display [&_h2]:text-[length:var(--text-xl)] [&_h2]:text-lux-text [&_h3]:font-display [&_h3]:text-lux-text [&_li]:leading-[var(--leading-body)] [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:text-lux-text">
				{children}
				{showNapSummary ? <SiteNapSummary /> : null}
			</div>
		</article>
	);
}
