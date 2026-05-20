import Link from "next/link";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { getGbpPhoneDisplay, getGbpPhoneTelHref } from "@/lib/google-business-profile";
import { AGENT_NAME, SITE_BUSINESS_NAME, SITE_HEADER_LABEL } from "@/lib/site-contact";
import { PRIMARY_NAV, SITE_PAGES } from "@/lib/site-pages";

export function SiteHeader() {
	return (
		<header
			className="sticky top-0 z-[100] border-b border-[var(--border-subtle)] bg-[rgba(18,18,18,0.96)] backdrop-blur-md"
			role="banner"
		>
			<div className="lux-container flex min-h-[var(--header-height)] flex-wrap items-center justify-between gap-4 py-3">
				<Link className="flex flex-col gap-0.5 no-underline hover:no-underline" href={SITE_PAGES.home.path}>
					<span className="sr-only">{SITE_BUSINESS_NAME} — </span>
					<span className="font-display text-[length:var(--text-lg)] text-lux-text">
						{SITE_HEADER_LABEL}
					</span>
					<span className="text-[length:var(--text-sm)] text-lux-muted">
						{AGENT_NAME} · Las Vegas REALTOR®
					</span>
				</Link>
				<nav className="hidden lg:block" aria-label="Primary">
					<ul className="m-0 flex list-none flex-wrap gap-6 p-0">
						{PRIMARY_NAV.map((page) => (
							<li key={page.path}>
								<Link
									className="text-[length:var(--text-sm)] font-medium text-lux-muted no-underline hover:text-lux-text"
									href={page.path}
								>
									{page.navLabel}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<div className="flex flex-wrap items-center gap-3">
					<a
						className="lux-btn-ghost min-h-[var(--tap-min)] px-4 py-2 text-[length:var(--text-sm)]"
						href={getGbpPhoneTelHref()}
					>
						{getGbpPhoneDisplay()}
					</a>
					<ScheduleCta
						utmMedium="header"
						buttonLabel="Schedule a Consultation"
						variant="luxury-primary"
					/>
				</div>
			</div>
		</header>
	);
}
