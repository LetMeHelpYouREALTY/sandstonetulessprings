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
				className="font-display text-[length:var(--text-xl)] text-lux-text"
			>
				{AGENT_GBP_OFFICE_LABEL}
			</h2>
			<p>
				<strong>{SITE_BUSINESS_NAME}</strong> lists a staffed office at{" "}
				<address className="mt-1 inline not-italic">{formatOfficeAddress()}</address>.
				That is where you reach Dr. Jan Duffy for buyer representation on Sandstone at Tule
				Springs — separate from the KB Home model-home intersection in 89084.
			</p>
			<div className="space-y-2 text-[length:var(--text-base)] text-lux-muted">
				<p>
					<strong>Office hours:</strong> {formatGbpOfficeHoursPlain()}
				</p>
				<p className="text-lux-muted-soft">
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
