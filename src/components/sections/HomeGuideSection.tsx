import Link from "next/link";
import { MASTER_PLAN_NAME } from "@/lib/community";
import { AGENT_NAME, formatCommunityAddress, getCommunityDirectionsUrl } from "@/lib/site-contact";
import type { SitePageConfig } from "@/lib/site-pages";

type HomeGuideSectionProps = {
	explorePages: readonly SitePageConfig[];
};

export function HomeGuideSection({ explorePages }: HomeGuideSectionProps) {
	return (
		<div className="space-y-10">
			<section
				aria-labelledby="who-represents-buyers"
				className="overflow-hidden rounded-2xl border border-[#c4b59a]/40 bg-gradient-to-br from-[#f7f3ec] via-white to-[#eef3f7] shadow-sm dark:border-white/10 dark:from-neutral-900 dark:via-neutral-950 dark:to-[#1a2833]"
			>
				<div className="border-b border-[#c4b59a]/30 px-6 py-5 dark:border-white/10 sm:px-8">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c7a94]">
						Buyer representation
					</p>
					<h2
						id="who-represents-buyers"
						className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl"
					>
						Who represents buyers at Sandstone Tule Springs?
					</h2>
					<p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
						{AGENT_NAME} offers independent buyer representation for new construction
						and resale within {MASTER_PLAN_NAME}. KB Home staff at Landings represent
						the builder only — you can use both: tour with the builder, then
						strategize offers and timelines with your REALTOR®.
					</p>
				</div>

				<div className="grid gap-px bg-[#c4b59a]/25 dark:bg-white/10 sm:grid-cols-2">
					<div className="bg-white/80 px-6 py-5 dark:bg-neutral-950/60 sm:px-8">
						<p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
							At the sales office
						</p>
						<p className="mt-2 font-medium text-neutral-900 dark:text-neutral-100">
							KB Home (builder)
						</p>
						<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
							Model tours, floor plans, and builder incentives for Landings at
							Sandstone.
						</p>
					</div>
					<div className="bg-[#eef3f7]/90 px-6 py-5 dark:bg-[#1a2833]/80 sm:px-8">
						<p className="text-xs font-semibold uppercase tracking-wider text-[#5c7a94]">
							Your advocate
						</p>
						<p className="mt-2 font-medium text-neutral-900 dark:text-neutral-100">
							{AGENT_NAME}, REALTOR®
						</p>
						<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
							Independent guidance on contracts, resale, and negotiation within
							the master plan.
						</p>
					</div>
				</div>
			</section>

			<div className="flex flex-col gap-3 rounded-xl border border-black/8 bg-black/[.02] px-5 py-4 dark:border-white/10 dark:bg-white/[.03] sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
						Community area
					</p>
					<address className="mt-1 not-italic font-medium text-neutral-900 dark:text-neutral-100">
						{formatCommunityAddress()}
					</address>
				</div>
				<a
					className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#5c7a94]/30 bg-[#5c7a94] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4a6578] dark:border-[#658dac]/40 dark:bg-[#658dac] dark:hover:bg-[#5c7a94]"
					href={getCommunityDirectionsUrl()}
					rel="noopener noreferrer"
					target="_blank"
				>
					Directions
				</a>
			</div>

			<section aria-labelledby="start-here-heading">
				<div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b7355]">
							Explore
						</p>
						<h2
							id="start-here-heading"
							className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
						>
							Start here
						</h2>
					</div>
					<p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
						Guides for the master plan, KB Home Landings, visits, and working with
						an independent REALTOR® in 89084.
					</p>
				</div>

				<ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{explorePages.map((page) => (
						<li key={page.path}>
							<Link
								className="group flex h-full flex-col rounded-xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#5c7a94]/40 hover:shadow-md dark:border-white/10 dark:bg-neutral-900 dark:hover:border-[#658dac]/50"
								href={page.path}
							>
								<span className="text-sm font-semibold text-[#3d6b8c] group-hover:text-[#2d5570] dark:text-[#8eb4d4] dark:group-hover:text-[#a8c9e0]">
									{page.navLabel}
								</span>
								<span className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
									{page.description}
								</span>
								<span
									aria-hidden
									className="mt-3 text-xs font-medium text-neutral-400 transition group-hover:text-[#5c7a94] dark:group-hover:text-[#8eb4d4]"
								>
									Read more →
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
