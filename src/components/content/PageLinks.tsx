import Link from "next/link";
import type { SitePageConfig } from "@/lib/site-pages";

type PageLinksProps = {
	title?: string;
	pages: readonly SitePageConfig[];
};

export function PageLinks({ title = "Explore this site", pages }: PageLinksProps) {
	return (
		<section className="rounded-xl border border-black/10 bg-black/[.02] p-6 dark:border-white/10 dark:bg-white/[.03]">
			<h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
				{title}
			</h2>
			<ul className="mt-4 space-y-2">
				{pages.map((page) => (
					<li key={page.path}>
						<Link
							className="font-medium underline underline-offset-4"
							href={page.path}
						>
							{page.navLabel}
						</Link>
						<span className="text-neutral-600 dark:text-neutral-400">
							{" "}
							— {page.description}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
