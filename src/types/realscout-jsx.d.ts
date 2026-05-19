import type { HTMLAttributes } from "react";

type RealScoutOfficeListingsProps = HTMLAttributes<HTMLElement> & {
	"agent-encoded-id"?: string;
	"sort-order"?: string;
	"listing-status"?: string;
	"property-types"?: string;
	"price-min"?: string;
	"price-max"?: string;
};

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"realscout-office-listings": RealScoutOfficeListingsProps;
		}
	}
}

export {};
