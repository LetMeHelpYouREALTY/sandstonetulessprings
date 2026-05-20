import Link from "next/link";
import type { SitePageConfig } from "@/lib/site-pages";

type PageLinksProps = {
	title?: string;
	pages: readonly SitePageConfig[];
};

export function PageLinks({ title = "Explore this site", pages }: PageLinksProps) {
	return (
		<section className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-lux-surface p-6">
			<h2 className="m-0 font-display text-[length:var(--text-lg)] text-lux-text">
				{title}
			</h2>
			<ul className="mt-4 list-none space-y-3 p-0">
				{pages.map((page) => (
					<li key={page.path}>
						<Link className="lux-link font-semibold" href={page.path}>
							{page.navLabel}
						</Link>
						<span className="text-lux-muted"> — {page.description}</span>
					</li>
				))}
			</ul>
		</section>
	);
}
