/** dns-prefetch for third parties on convert routes only (not preconnect — saves LCP bandwidth). */
export function ConvertResourceHints() {
	return (
		<>
			<link rel="dns-prefetch" href="https://em.realscout.com" />
			<link rel="dns-prefetch" href="https://www.realscout.com" />
			<link rel="dns-prefetch" href="https://assets.calendly.com" />
		</>
	);
}
