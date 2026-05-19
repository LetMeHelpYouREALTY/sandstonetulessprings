/** Frozen at build for sitemap lastmod — avoids hydration drift (portfolio pattern). */
export function getSitemapLastModified(): Date {
	const frozen = process.env.NEXT_PUBLIC_BUILD_DATE?.trim();
	if (frozen) {
		const parsed = new Date(frozen);
		if (!Number.isNaN(parsed.getTime())) {
			return parsed;
		}
	}
	return new Date();
}
