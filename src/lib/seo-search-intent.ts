/**
 * Search-intent phrases from Google SERPs (query spelling may differ from GBP business name).
 * GBP legal name stays in site-contact.ts — use these for titles, AEO headings, and alternateName only.
 */

/** Primary query: "Sandstone Tule Springs Homes" (Tule — common search spelling). */
export const PRIMARY_HOME_SEARCH_QUERY = "Sandstone Tule Springs homes";

/** Master plan entity name (builder / county — correct "Tule" spelling). */
export const MASTER_PLAN_SEARCH_NAME = "Sandstone at Tule Springs";

/** GEO alternate names for Place / community entities — not the GBP Organization name. */
export const GEO_ALTERNATE_NAMES = [
	PRIMARY_HOME_SEARCH_QUERY,
	"Sandstone Tule Springs homes North Las Vegas",
	"Landings at Sandstone at Tule Springs homes",
	"89084 new homes Sandstone",
] as const;
