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
		<main className="mx-auto flex max-w-lg flex-1 flex-col gap-6 px-6 py-16 text-center">
			<h1 className="text-2xl font-semibold">Page not found</h1>
			<p className="text-neutral-600 dark:text-neutral-400">
				That URL is not on this site. Try the homepage or a topic below.
			</p>
			<Link
				className="font-medium underline underline-offset-4"
				href={SITE_PAGES.home.path}
			>
				Back to home
			</Link>
		</main>
	);
}
