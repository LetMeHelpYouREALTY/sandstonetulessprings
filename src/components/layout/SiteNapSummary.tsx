import Link from "next/link";
import { GbpOfficeCtas } from "@/components/gbp/GbpOfficeCtas";
import {
	formatGbpOfficeHoursPlain,
	getGbpPhoneDisplay,
	getGbpPhoneTelHref,
} from "@/lib/google-business-profile";
import {
	AGENT_GBP_OFFICE_LABEL,
	formatCommunityAddress,
	formatOfficeAddress,
	getSiteEmail,
	HOME_SALES_AREA_LABEL,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

/** Compact in-page NAP for info routes — mirrors footer constants. */
export function SiteNapSummary() {
	return (
		<section
			className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-lux-surface p-6 text-[length:var(--text-base)]"
			aria-labelledby="site-nap-heading"
		>
			<h2
				id="site-nap-heading"
				className="m-0 font-display text-[length:var(--text-lg)] text-lux-text"
			>
				Locations &amp; contact (NAP)
			</h2>
			<p className="mt-2 font-semibold text-lux-text">{SITE_BUSINESS_NAME}</p>
			<dl className="mt-4 space-y-4">
				<div>
					<dt className="font-semibold text-lux-text">{AGENT_GBP_OFFICE_LABEL}</dt>
					<dd className="mt-1 space-y-2 text-lux-muted">
						<address className="not-italic">{formatOfficeAddress()}</address>
						<p>{formatGbpOfficeHoursPlain()}</p>
						<GbpOfficeCtas utmContext="nap-summary" variant="compact" />
					</dd>
				</div>
				<div>
					<dt className="font-semibold text-lux-text">{HOME_SALES_AREA_LABEL}</dt>
					<dd className="mt-1">
						<address className="not-italic text-lux-muted">
							{formatCommunityAddress()}
						</address>
					</dd>
				</div>
				<div>
					<dt className="font-semibold text-lux-text">Phone</dt>
					<dd className="mt-1">
						<a className="lux-link font-semibold" href={getGbpPhoneTelHref()}>
							{getGbpPhoneDisplay()}
						</a>
					</dd>
				</div>
				<div>
					<dt className="font-semibold text-lux-text">Email</dt>
					<dd className="mt-1">
						<a className="lux-link font-semibold" href={`mailto:${getSiteEmail()}`}>
							{getSiteEmail()}
						</a>
					</dd>
				</div>
			</dl>
			<p className="mt-4 text-lux-muted">
				<Link className="lux-link font-semibold" href={SITE_PAGES.contact.path}>
					Full contact page with directions
				</Link>
			</p>
		</section>
	);
}
