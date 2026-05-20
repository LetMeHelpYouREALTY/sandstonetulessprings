import Link from "next/link";
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
			className="rounded-lg border border-black/10 bg-neutral-50 p-5 text-sm dark:border-white/10 dark:bg-neutral-900/50"
			aria-labelledby="site-nap-heading"
		>
			<h2
				id="site-nap-heading"
				className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
			>
				Locations &amp; contact (NAP)
			</h2>
			<p className="mt-2 font-medium text-neutral-800 dark:text-neutral-200">
				{SITE_BUSINESS_NAME}
			</p>
			<dl className="mt-4 space-y-4">
				<div>
					<dt className="font-medium text-neutral-900 dark:text-neutral-100">
						{AGENT_GBP_OFFICE_LABEL}
					</dt>
					<dd className="mt-1">
						<address className="not-italic">{formatOfficeAddress()}</address>
					</dd>
				</div>
				<div>
					<dt className="font-medium text-neutral-900 dark:text-neutral-100">
						{HOME_SALES_AREA_LABEL}
					</dt>
					<dd className="mt-1">
						<address className="not-italic">{formatCommunityAddress()}</address>
					</dd>
				</div>
				<div>
					<dt className="font-medium text-neutral-900 dark:text-neutral-100">Email</dt>
					<dd className="mt-1">
						<a className="underline underline-offset-4" href={`mailto:${getSiteEmail()}`}>
							{getSiteEmail()}
						</a>
					</dd>
				</div>
			</dl>
			<p className="mt-4 text-neutral-600 dark:text-neutral-400">
				<Link className="underline underline-offset-4" href={SITE_PAGES.contact.path}>
					Full contact page with directions
				</Link>
			</p>
		</section>
	);
}
