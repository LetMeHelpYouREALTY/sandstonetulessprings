import {
	BUILDER_COMMUNITY_NAME,
	BUILDER_NAME,
	BUILDER_SALES_PHONE_DISPLAY,
	BUILDER_SALES_PHONE_TEL,
	buildCommunityFaqJsonLd,
	buildCommunityPlaceJsonLd,
	COMMUNITY_FAQ,
	COMMUNITY_HOME_SUMMARY,
	DRIVING_DIRECTIONS_FROM_I215,
	KB_HOME_COMMUNITY_URL,
	MASTER_PLAN_NAME,
	SALES_OFFICE_APPOINTMENT_NOTE,
} from "@/lib/community";
import {
	formatCommunityAddress,
	getCommunityDirectionsUrl,
	getSiteEmail,
	mailtoHref,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";

export default function Home() {
	const siteUrl = getSiteUrl();

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-12 sm:px-10 sm:py-16">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(buildCommunityPlaceJsonLd(siteUrl)),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(buildCommunityFaqJsonLd()),
				}}
			/>

			<header className="space-y-4 border-b border-black/10 pb-10 dark:border-white/10">
				<h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
					{SITE_BUSINESS_NAME}
				</h1>
				<p className="text-lg text-neutral-700 dark:text-neutral-300">
					Buyer representation and resale guidance for{" "}
					<strong>{MASTER_PLAN_NAME}</strong> in North Las Vegas — including{" "}
					{BUILDER_COMMUNITY_NAME} by {BUILDER_NAME}.
				</p>
				<p className="text-neutral-600 dark:text-neutral-400">
					{formatCommunityAddress()}
				</p>
			</header>

			<section className="space-y-4" aria-labelledby="community-overview">
				<h2
					id="community-overview"
					className="text-xl font-semibold tracking-tight"
				>
					About {BUILDER_COMMUNITY_NAME}
				</h2>
				<p className="text-neutral-700 dark:text-neutral-300">
					{BUILDER_COMMUNITY_NAME} is part of the larger{" "}
					<strong>{MASTER_PLAN_NAME}</strong> master-planned area in North Las
					Vegas. {COMMUNITY_HOME_SUMMARY}
				</p>
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					For builder floor plans, pricing updates, and the interest list, see
					the official{" "}
					<a
						className="font-medium underline underline-offset-4"
						href={KB_HOME_COMMUNITY_URL}
						rel="noopener noreferrer"
						target="_blank"
					>
						{BUILDER_NAME} {BUILDER_COMMUNITY_NAME} website
					</a>
					.
				</p>
			</section>

			<section className="space-y-4" aria-labelledby="visit-sales-office">
				<h2
					id="visit-sales-office"
					className="text-xl font-semibold tracking-tight"
				>
					Visiting the sales office
				</h2>
				<p className="text-neutral-700 dark:text-neutral-300">
					The {BUILDER_NAME} sales office for {BUILDER_COMMUNITY_NAME} is at{" "}
					<strong>N. 5th St. and Sandstone Ranch Pkwy.</strong>,{" "}
					{formatCommunityAddress().split(", ").slice(1).join(", ")}.
				</p>
				<div className="flex flex-wrap gap-3">
					<a
						className="inline-flex items-center justify-center rounded-full border border-black/10 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:border-white/15 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
						href={getCommunityDirectionsUrl()}
						rel="noopener noreferrer"
						target="_blank"
					>
						Directions (Google Maps)
					</a>
					<a
						className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]"
						href={`tel:${BUILDER_SALES_PHONE_TEL}`}
					>
						Call {BUILDER_NAME} sales {BUILDER_SALES_PHONE_DISPLAY}
					</a>
				</div>
				<p className="text-neutral-700 dark:text-neutral-300">
					{SALES_OFFICE_APPOINTMENT_NOTE}
				</p>
			</section>

			<section className="space-y-4" aria-labelledby="driving-directions">
				<h2
					id="driving-directions"
					className="text-xl font-semibold tracking-tight"
				>
					How do you get there from I-215?
				</h2>
				<ol className="list-decimal space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
					{DRIVING_DIRECTIONS_FROM_I215.map((step) => (
						<li key={step}>{step}</li>
					))}
				</ol>
			</section>

			<section className="space-y-4" aria-labelledby="work-with-agent">
				<h2
					id="work-with-agent"
					className="text-xl font-semibold tracking-tight"
				>
					Work with Dr. Jan Duffy on your purchase
				</h2>
				<p className="text-neutral-700 dark:text-neutral-300">
					Dr. Jan Duffy is an independent Nevada REALTOR® representing buyers —
					not {BUILDER_NAME}. Email for questions about resale, representation,
					or navigating new construction in {MASTER_PLAN_NAME}.
				</p>
				<a
					className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]"
					href={mailtoHref(`${SITE_BUSINESS_NAME} — buyer inquiry`)}
				>
					{getSiteEmail()}
				</a>
			</section>

			<section className="space-y-6" aria-labelledby="community-faq">
				<h2 id="community-faq" className="text-xl font-semibold tracking-tight">
					Frequently asked questions
				</h2>
				<dl className="space-y-6">
					{COMMUNITY_FAQ.map((item) => (
						<div key={item.question}>
							<dt className="font-medium text-neutral-900 dark:text-neutral-100">
								{item.question}
							</dt>
							<dd className="mt-2 text-neutral-700 dark:text-neutral-300">
								{item.answer}
							</dd>
						</div>
					))}
				</dl>
			</section>

			<p className="border-t border-black/10 pt-8 text-xs leading-relaxed text-neutral-500 dark:border-white/10 dark:text-neutral-500">
				Community facts reference publicly listed {BUILDER_NAME} information for{" "}
				{BUILDER_COMMUNITY_NAME}. Builder phone and website are for sales-office
				visits and builder materials only. {SITE_BUSINESS_NAME} is independent of{" "}
				{BUILDER_NAME}.
			</p>
		</div>
	);
}
