import type { Metadata } from "next";
import Link from "next/link";
import { SITE_PAGES } from "@/lib/site-pages";

export const metadata: Metadata = {
	title: "Page not found",
	robots: {
		index: false,
		follow: true,
	},
};

export default function NotFound() {
	return (
		<main
			id="main"
			className="lux-container flex max-w-lg flex-1 flex-col gap-6 py-16 text-center"
		>
			<h1 className="font-display text-[length:var(--text-2xl)] text-lux-text">
				Page not found
			</h1>
			<p className="text-lux-muted">
				That URL is not on this site. Try the homepage or a topic below.
			</p>
			<Link className="lux-link font-semibold" href={SITE_PAGES.home.path}>
				Back to home
			</Link>
		</main>
	);
}
