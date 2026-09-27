import Link from "next/link";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";
import { GbpOfficeCtas } from "@/components/gbp/GbpOfficeCtas";
import { MASTER_PLAN_NAME } from "@/lib/community";
import {
	AGENT_LICENSE,
	AGENT_NAME,
	BROKERAGE_NAME,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { SITE_PAGES } from "@/lib/site-pages";

export function AmenityTrustCta() {
	return (
		<section
			className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-lux-surface p-6 sm:p-8"
			aria-labelledby="amenity-agent-cta"
		>
			<h2
				id="amenity-agent-cta"
				className="font-display text-[length:var(--text-xl)] text-lux-text"
			>
				Work with a hyperlocal buyer&apos;s agent
			</h2>
			<p className="mt-3 max-w-[var(--measure)] text-lux-muted">
				<strong className="text-lux-text">{AGENT_NAME}</strong> ({AGENT_LICENSE}) with{" "}
				{BROKERAGE_NAME} provides independent buyer representation for{" "}
				{MASTER_PLAN_NAME} — separate from KB Home sales. {SITE_BUSINESS_NAME} matches
				the Google Business Profile NAP on this site.
			</p>
			<div className="mt-6 flex flex-wrap gap-3">
				<ScheduleCta
					utmMedium="amenities-cta"
					buttonLabel="Schedule a consultation"
					variant="luxury-primary"
				/>
				<Link className="lux-btn-ghost" href={SITE_PAGES.contact.path}>
					Contact &amp; directions
				</Link>
			</div>
			<div className="mt-6">
				<GbpOfficeCtas utmContext="amenities" variant="pills" />
			</div>
		</section>
	);
}
