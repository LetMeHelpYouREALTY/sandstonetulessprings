import Link from "next/link";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { GbpOfficeCtas } from "@/components/gbp/GbpOfficeCtas";
import {
	formatGbpOfficeHoursShort,
	getGbpPhoneDisplay,
	getGbpPhoneTelHref,
} from "@/lib/google-business-profile";
import {
	AGENT_GBP_OFFICE_LABEL,
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	formatCommunityAddress,
	formatOfficeAddress,
	getCommunityDirectionsUrl,
	getSiteEmail,
	HOME_SALES_AREA_LABEL,
	OFFICE_DISPLAY_NAME,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { PRIMARY_NAV } from "@/lib/site-pages";

/** Sitewide NAP — agent GBP office (89032) + homes sales area (89084) on every page. */
export function SiteFooter() {
	return (
		<footer
			className="mt-auto border-t border-[var(--border-subtle)] bg-lux-surface py-12 text-[length:var(--text-base)] text-lux-muted"
			role="contentinfo"
		>
			<div className="lux-container">
				<div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
					<div>
						<p className="m-0 font-display text-[length:var(--text-lg)] text-lux-text">
							{SITE_BUSINESS_NAME}
						</p>
						<p className="mt-2 text-[length:var(--text-sm)] font-semibold text-lux-muted">
							{AGENT_GBP_OFFICE_LABEL}
						</p>
						<p className="mt-1 text-[length:var(--text-sm)] text-lux-muted-soft">
							{OFFICE_DISPLAY_NAME}
						</p>
						<address className="mt-3 not-italic leading-[var(--leading-body)]">
							{formatOfficeAddress()}
						</address>
						<p className="mt-2 text-[length:var(--text-sm)] text-lux-muted-soft">
							{formatGbpOfficeHoursShort()}
						</p>
						<p className="mt-3">
							<a className="lux-link font-semibold" href={getGbpPhoneTelHref()}>
								{getGbpPhoneDisplay()}
							</a>
						</p>
						<div className="mt-3">
							<GbpOfficeCtas utmContext="footer-gbp" variant="compact" />
						</div>
					</div>
					<div>
						<p className="m-0 text-[length:var(--text-sm)] font-semibold text-lux-text">
							{HOME_SALES_AREA_LABEL}
						</p>
						<address className="mt-3 not-italic">{formatCommunityAddress()}</address>
						<p className="mt-2">
							<a
								className="lux-link font-semibold"
								href={getCommunityDirectionsUrl()}
								rel="noopener noreferrer"
								target="_blank"
							>
								Directions to homes sales area
							</a>
						</p>
					</div>
					<div>
						<p className="m-0 text-[length:var(--text-sm)] font-semibold text-lux-text">
							Explore
						</p>
						<ul className="mt-3 list-none space-y-2 p-0">
							{PRIMARY_NAV.filter((p) => p.path !== "/").map((page) => (
								<li key={page.path}>
									<Link
										className="text-lux-muted no-underline hover:text-lux-text"
										href={page.path}
									>
										{page.navLabel}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="mt-8 flex flex-wrap gap-3">
					<ScheduleCta
						utmMedium="footer"
						buttonLabel="Schedule with Dr. Jan"
						variant="luxury-primary"
					/>
				</div>
				<p className="mt-6">
					<a className="lux-link font-semibold" href={`mailto:${getSiteEmail()}`}>
						{getSiteEmail()}
					</a>
				</p>
				<div className="mt-8 max-w-[var(--measure)] border-t border-[var(--border-subtle)] pt-8 text-[length:var(--text-sm)] text-lux-muted-soft">
					<p className="m-0 mb-2">
						{AGENT_NAME}, REALTOR® · Nevada license {AGENT_LICENSE} · Supervised by{" "}
						{BROKERAGE_NAME} (NV NAC 645.610).
					</p>
					<p className="m-0 mb-2">
						Dr. Jan Duffy is a buyer&apos;s agent for Sandstone at Tule Springs — not
						affiliated with KB Home. Equal Housing Opportunity. This site is
						informational and does not constitute legal or tax advice.
					</p>
					<p className="m-0">
						Homes sales area (89084) is distinct from the agent GBP office (89032).
					</p>
				</div>
			</div>
		</footer>
	);
}
