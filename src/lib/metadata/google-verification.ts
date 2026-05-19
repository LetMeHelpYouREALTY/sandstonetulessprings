/** Google Search Console HTML tag verification (NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION). */
export function getGoogleSiteVerification(): string | undefined {
	const value = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
	return value || undefined;
}
