import Script from "next/script";

const REALSCOUT_SCRIPT_SRC =
	"https://em.realscout.com/widgets/realscout-web-components.umd.js";

/** Load once per page — required for all RealScout web components on the site. */
export function RealScoutScript() {
	return (
		<Script
			id="realscout-web-components"
			src={REALSCOUT_SCRIPT_SRC}
			strategy="afterInteractive"
			type="module"
		/>
	);
}
