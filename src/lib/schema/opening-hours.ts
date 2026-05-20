import {
	GBP_SATURDAY_HOURS,
	GBP_WEEKDAY_HOURS,
	type GbpHoursBlock,
} from "@/lib/google-business-profile";

function blockToSpecification(block: GbpHoursBlock): Record<string, unknown> {
	return {
		"@type": "OpeningHoursSpecification",
		dayOfWeek: [...block.days],
		opens: block.opens,
		closes: block.closes,
	};
}

/** Opening hours for the staffed GBP office (89032). */
export function buildGbpOpeningHoursSpecification(): Record<string, unknown>[] {
	return [blockToSpecification(GBP_WEEKDAY_HOURS), blockToSpecification(GBP_SATURDAY_HOURS)];
}
