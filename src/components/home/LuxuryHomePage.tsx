import Link from "next/link";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { GbpOfficeCtas } from "@/components/gbp/GbpOfficeCtas";
import { RealScoutOfficeListingsDeferred } from "@/components/realscout/RealScoutOfficeListingsDeferred";
import { JsonLd } from "@/components/seo/JsonLd";
import {
	BUILDER_COMMUNITY_NAME,
	buildCommunityFaqJsonLd,
	buildCommunityPlaceJsonLd,
	MASTER_PLAN_NAME,
} from "@/lib/community";
import {
	FEATURED_COMMUNITIES,
	HOME_PAGE_FAQ,
	LUXURY_SERVICES,
	MARKET_FOCUS,
	TRUST_SIGNALS,
} from "@/lib/home-luxury-content";
import { PRIMARY_HOME_SEARCH_QUERY } from "@/lib/seo-search-intent";
import {
	AGENT_NAME,
	BROKERAGE_NAME,
	formatOfficeAddress,
	SITE_BUSINESS_NAME,
	SITE_GBP_BRAND_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";
import { getSiteUrl } from "@/lib/site-url";

export function LuxuryHomePage() {
	const siteUrl = getSiteUrl();

	return (
		<>
			<JsonLd
				data={[
					buildCommunityPlaceJsonLd(siteUrl),
					buildCommunityFaqJsonLd(HOME_PAGE_FAQ),
				]}
			/>

			{/* Hero */}
			<section
				className="lux-section border-b border-[var(--border-subtle)] bg-gradient-to-b from-lux-surface to-lux-bg"
				aria-labelledby="home-hero-heading"
			>
				<div className="lux-container grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
					<div>
						<p className="lux-eyebrow">North Las Vegas · Las Vegas Valley</p>
						<h1
							id="home-hero-heading"
							className="font-display text-[length:var(--text-hero)] text-lux-text"
						>
							{SITE_GBP_BRAND_NAME} — calm, clear guidance for discerning buyers
						</h1>
						<p className="mt-6 max-w-[var(--measure)] text-[length:var(--text-lg)] text-lux-muted">
							<strong className="text-lux-text">Answer:</strong> {SITE_BUSINESS_NAME}{" "}
							helps you navigate {PRIMARY_HOME_SEARCH_QUERY} in {MASTER_PLAN_NAME}{" "}
							(89084) and resale across the Las Vegas valley—with independent buyer
							representation separate from KB Home sales.
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<ScheduleCta
								utmMedium="home-hero"
								buttonLabel="Schedule a consultation"
								variant="luxury-primary"
							/>
							<Link className="lux-btn-ghost" href={SITE_PAGES.buyers.path}>
								Buyer representation
							</Link>
						</div>
						<div className="mt-8 grid gap-4 border-t border-[var(--border-subtle)] pt-8 text-[length:var(--text-sm)] text-lux-muted-soft sm:grid-cols-2">
							<div>
								<strong className="block text-lux-text">Agent office</strong>
								{formatOfficeAddress()}
							</div>
							<div>
								<strong className="block text-lux-text">Brokerage</strong>
								{BROKERAGE_NAME}
							</div>
						</div>
					</div>
					<aside
						className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-lux-surface p-6"
						aria-label="Who we serve well"
					>
						<p className="lux-eyebrow">Clients we guide well</p>
						<ul className="m-0 list-none space-y-0 p-0 text-[length:var(--text-base)] text-lux-muted">
							{[
								"Affluent downsizers simplifying their next chapter",
								"Move-up buyers securing their forever home",
								"Out-of-state relocators comparing lifestyle trade-offs",
								"55+ households prioritizing access and comfort",
							].map((line) => (
								<li
									key={line}
									className="border-b border-[var(--border-subtle)] py-3 last:border-0"
								>
									{line}
								</li>
							))}
						</ul>
					</aside>
				</div>
			</section>

			{/* Trust */}
			<section className="border-y border-[var(--border-subtle)] bg-lux-surface py-10" aria-label="Trust signals">
				<div className="lux-container">
					<ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
						{TRUST_SIGNALS.map((item) => (
							<li key={item.label} className="lux-trust-item">
								<span className="font-display block text-[length:var(--text-xl)] text-lux-text">
									{item.value}
								</span>
								<span className="text-[length:var(--text-sm)] text-lux-muted">
									{item.label}
								</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<RealScoutOfficeListingsDeferred placement="below-hero" />

			{/* Markets */}
			<section id="markets" className="lux-section" aria-labelledby="markets-heading">
				<div className="lux-container">
					<header className="mb-10 max-w-[var(--measure)]">
						<p className="lux-eyebrow">Market focus</p>
						<h2 id="markets-heading" className="lux-section-title">
							Which Las Vegas areas does {AGENT_NAME} serve?
						</h2>
						<p className="lux-section-lead">
							<strong className="text-lux-text">Answer:</strong> Representation
							spans North Las Vegas, Summerlin West, Skye Canyon, Centennial Hills,
							Henderson, and valley resale—with neighborhood-specific strategy.
						</p>
					</header>
					<ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
						{MARKET_FOCUS.map((market) => (
							<li key={market.title}>
								<article className="lux-card">
									<h3 className="lux-card__title">{market.title}</h3>
									<p className="lux-card__body">{market.answer}</p>
									<Link className="lux-card__link" href={market.href}>
										{market.linkLabel} →
									</Link>
								</article>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* Services */}
			<section
				id="services"
				className="lux-section bg-lux-surface"
				aria-labelledby="services-heading"
			>
				<div className="lux-container">
					<header className="mb-10 max-w-[var(--measure)]">
						<p className="lux-eyebrow">Representation</p>
						<h2 id="services-heading" className="lux-section-title">
							What services does {SITE_BUSINESS_NAME} provide?
						</h2>
						<p className="lux-section-lead">
							<strong className="text-lux-text">Answer:</strong> Buyer
							representation for new construction and resale, visit planning, and
							plain-language milestones—without builder-only bias at{" "}
							{BUILDER_COMMUNITY_NAME}.
						</p>
					</header>
					<ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
						{LUXURY_SERVICES.map((service) => (
							<li
								key={service.title}
								className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-lux-bg p-5"
							>
								<h3 className="m-0 font-display text-[length:var(--text-lg)] text-lux-text">
									{service.title}
								</h3>
								<p className="mt-2 text-lux-muted">{service.description}</p>
								<Link className="lux-link mt-3 inline-block text-[length:var(--text-sm)] font-semibold" href={service.page.path}>
									{service.page.navLabel} →
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* Featured communities */}
			<section
				id="communities"
				className="lux-section"
				aria-labelledby="communities-heading"
			>
				<div className="lux-container">
					<header className="mb-10 max-w-[var(--measure)]">
						<p className="lux-eyebrow">Featured communities</p>
						<h2 id="communities-heading" className="lux-section-title">
							Where should I start for {PRIMARY_HOME_SEARCH_QUERY}?
						</h2>
						<p className="lux-section-lead">
							<strong className="text-lux-text">Answer:</strong> Begin with the
							master plan overview, Landings new homes, or contact for a
							consultation—then compare live listings below when ready.
						</p>
					</header>
					<ul className="m-0 grid list-none gap-4 p-0 lg:grid-cols-3">
						{FEATURED_COMMUNITIES.map((item) => (
							<li key={item.title}>
								<article className="lux-card">
									<h3 className="lux-card__title">{item.title}</h3>
									<p className="lux-card__body">{item.answer}</p>
									<Link className="lux-card__link" href={item.href}>
										{item.linkLabel} →
									</Link>
								</article>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* FAQ */}
			<section
				id="faq"
				className="lux-section bg-lux-surface"
				aria-labelledby="faq-heading"
			>
				<div className="lux-container">
					<header className="mb-8 max-w-[var(--measure)]">
						<p className="lux-eyebrow">Questions</p>
						<h2 id="faq-heading" className="lux-section-title">
							Frequently asked questions
						</h2>
						<p className="lux-section-lead">
							<strong className="text-lux-text">Answer:</strong> Direct responses
							structured for search snippets and AI answer engines.
						</p>
					</header>
					<ul className="m-0 max-w-[var(--measure-narrow,55ch)] list-none space-y-0 border-t border-[var(--border-subtle)] p-0">
						{HOME_PAGE_FAQ.map((item) => (
							<li key={item.question} className="border-b border-[var(--border-subtle)]">
								<details className="lux-faq">
									<summary>{item.question}</summary>
									<p className="lux-faq-answer">{item.answer}</p>
								</details>
							</li>
						))}
					</ul>
					<p className="mt-8 text-[length:var(--text-sm)] text-lux-muted-soft">
						<Link className="lux-link" href={SITE_PAGES.faq.path}>
							View full FAQ →
						</Link>
					</p>
				</div>
			</section>

			{/* Consultation — Calendly primary, no generic lead form */}
			<section
				id="consultation"
				className="lux-section"
				aria-labelledby="consultation-heading"
			>
				<div className="lux-container grid gap-10 lg:grid-cols-2 lg:items-start">
					<div className="lux-prose">
						<p className="lux-eyebrow">Private consultation</p>
						<h2 id="consultation-heading" className="lux-section-title">
							How do I schedule time with {AGENT_NAME}?
						</h2>
						<p>
							<strong className="text-lux-text">Answer:</strong> Use the
							scheduler below or call from the header. Fields and buttons are sized
							for easy reading at 200% zoom.
						</p>
						<p>
							Prefer email? Visit{" "}
							<Link className="lux-link" href={SITE_PAGES.contact.path}>
								contact &amp; directions
							</Link>{" "}
							for full NAP, map, and office hours.
						</p>
					</div>
					<div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-lux-surface p-6">
						<div className="flex flex-wrap gap-3">
							<ScheduleCta
								utmMedium="home-consult"
								buttonLabel="Schedule a consultation"
								variant="luxury-primary"
							/>
							<ScheduleCta
								utmMedium="home-tour"
								buttonLabel="Book a private tour"
								variant="luxury-ghost"
							/>
						</div>
						<div className="mt-6">
							<GbpOfficeCtas utmContext="home-consult" variant="pills" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
