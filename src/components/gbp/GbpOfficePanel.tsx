import { GBPMapCard } from "@/components/gbp/GBPMapCard";
import { GbpOfficeCtas } from "@/components/gbp/GbpOfficeCtas";
import {
	formatGbpOfficeHoursPlain,
	GBP_SUNDAY_NOTE,
	getGbpPhoneDisplay,
	getGbpPhoneTelHref,
} from "@/lib/google-business-profile";
import { AGENT_GBP_OFFICE_LABEL, formatOfficeAddress, SITE_BUSINESS_NAME } from "@/lib/site-contact";

type GbpOfficePanelProps = {
	/** Show embedded map (contact page). */
	showMap?: boolean;
	ctaVariant?: "compact" | "pills";
	utmContext?: string;
};

/**
 * In-page GBP office block — hours, map, and standard Google actions in plain language.
 */
export function GbpOfficePanel({
	showMap = false,
	ctaVariant = "compact",
	utmContext = "gbp-panel",
}: GbpOfficePanelProps) {
	return (
		<section className="space-y-4" aria-labelledby="gbp-office-panel-heading">
			<h2
				id="gbp-office-panel-heading"
				className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
			>
				{AGENT_GBP_OFFICE_LABEL}
			</h2>
			<p>
				<strong>{SITE_BUSINESS_NAME}</strong> lists a staffed office at{" "}
				<address className="mt-1 inline not-italic">{formatOfficeAddress()}</address>.
				That is where you reach Dr. Jan Duffy for buyer representation on Sandstone at Tule
				Springs — separate from the KB Home model-home intersection in 89084.
			</p>
			<div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
				<p>
					<strong>Office hours:</strong> {formatGbpOfficeHoursPlain()}
				</p>
				<p className="text-neutral-600 dark:text-neutral-400">
					{GBP_SUNDAY_NOTE} — call{" "}
					<a className="underline underline-offset-4" href={getGbpPhoneTelHref()}>
						{getGbpPhoneDisplay()}
					</a>{" "}
					or schedule through Calendly below.
				</p>
			</div>
			<GbpOfficeCtas utmContext={utmContext} variant={ctaVariant} />
			{showMap ? <GBPMapCard className="mt-2" /> : null}
		</section>
	);
}
