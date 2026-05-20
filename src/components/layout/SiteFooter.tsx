import { GbpOfficeCtas } from "@/components/gbp/GbpOfficeCtas";
import {
	formatGbpOfficeHoursShort,
	getGbpPhoneDisplay,
	getGbpPhoneTelHref,
} from "@/lib/google-business-profile";
import {
	AGENT_GBP_OFFICE_LABEL,
	AGENT_LICENSE,
	BROKERAGE_NAME,
	formatCommunityAddress,
	formatOfficeAddress,
	getCommunityDirectionsUrl,
	getSiteEmail,
	HOME_SALES_AREA_LABEL,
	OFFICE_DISPLAY_NAME,
	SITE_BUSINESS_NAME,
} from "@/lib/site-contact";
import { ScheduleCta } from "@/components/calendly/ScheduleCta";

/** Sitewide NAP — agent GBP office (89032) + homes sales area (89084) on every page. */
export function SiteFooter() {
	return (
		<footer className="mt-auto border-t border-black/10 px-6 py-8 text-center text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-400">
			<p className="font-medium text-neutral-900 dark:text-neutral-100">
				{SITE_BUSINESS_NAME}
			</p>
			<div className="mx-auto mt-4 grid max-w-lg gap-6 text-left sm:grid-cols-2">
				<div>
					<p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
						{AGENT_GBP_OFFICE_LABEL}
					</p>
					<p className="mt-1 text-xs text-neutral-500">{OFFICE_DISPLAY_NAME}</p>
					<address className="mt-2 not-italic">{formatOfficeAddress()}</address>
					<p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
						{formatGbpOfficeHoursShort()}
					</p>
					<p className="mt-2">
						<a className="hover:underline hover:underline-offset-4" href={getGbpPhoneTelHref()}>
							{getGbpPhoneDisplay()}
						</a>
					</p>
					<div className="mt-2">
						<GbpOfficeCtas utmContext="footer-gbp" variant="compact" />
					</div>
				</div>
				<div>
					<p className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
						{HOME_SALES_AREA_LABEL}
					</p>
					<address className="mt-2 not-italic">{formatCommunityAddress()}</address>
					<p className="mt-2">
						<a
							className="hover:underline hover:underline-offset-4"
							href={getCommunityDirectionsUrl()}
							rel="noopener noreferrer"
							target="_blank"
						>
							Directions
						</a>
					</p>
				</div>
			</div>
			<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
				<ScheduleCta utmMedium="footer" buttonLabel="Schedule with Dr. Jan" />
			</div>
			<p className="mt-4">
				<a
					className="hover:underline hover:underline-offset-4"
					href={`mailto:${getSiteEmail()}`}
				>
					{getSiteEmail()}
				</a>
			</p>
			<p className="mt-2 text-xs">
				{BROKERAGE_NAME} · Nevada license {AGENT_LICENSE}
			</p>
			<p className="mx-auto mt-3 max-w-xl text-xs text-neutral-500 dark:text-neutral-400">
				Dr. Jan Duffy is a buyer&apos;s agent for Sandstone at Tule Springs — not
				affiliated with KB Home. Supervising brokerage named above per Nevada
				real estate advertising requirements.
			</p>
		</footer>
	);
}
