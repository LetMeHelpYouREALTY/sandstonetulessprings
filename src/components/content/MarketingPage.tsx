import type { ReactNode } from "react";
import { RealScoutOfficeListings } from "@/components/realscout/RealScoutOfficeListings";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/schema/breadcrumb";
import { breadcrumbTrail, type SitePageConfig } from "@/lib/site-pages";

type MarketingPageProps = {
	page: SitePageConfig;
	lead?: ReactNode;
	children: ReactNode;
	/** Set false to hide office listings on a one-off route (default: show under hero). */
	showOfficeListings?: boolean;
};

export function MarketingPage({
	page,
	lead,
	children,
	showOfficeListings = true,
}: MarketingPageProps) {
	const crumbs = breadcrumbTrail(page);

	return (
		<article className="flex w-full flex-1 flex-col">
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16">
				<JsonLd data={buildBreadcrumbJsonLd(crumbs)} />
				<Breadcrumbs items={crumbs} />
				<header className="space-y-4 border-b border-black/10 pb-8 dark:border-white/10">
					<h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
						{page.h1}
					</h1>
					{lead ? (
						<div className="text-lg text-neutral-700 dark:text-neutral-300">{lead}</div>
					) : null}
				</header>
			</div>

			{showOfficeListings ? (
				<RealScoutOfficeListings placement="below-hero" />
			) : null}

			<div className="mx-auto w-full max-w-3xl flex-1 space-y-8 px-6 pb-12 text-neutral-700 sm:px-10 sm:pb-16 dark:text-neutral-300">
				{children}
			</div>
		</article>
	);
}
