import Link from "next/link";
import { PRIMARY_NAV, SITE_PAGES } from "@/lib/site-pages";
import { SITE_BUSINESS_NAME, SITE_HEADER_LABEL } from "@/lib/site-contact";

export function SiteHeader() {
	return (
		<header className="border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
			<div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
				<Link
					className="font-semibold tracking-tight text-neutral-900 hover:underline dark:text-neutral-100"
					href={SITE_PAGES.home.path}
				>
					<span className="sr-only">{SITE_BUSINESS_NAME} — </span>
					{SITE_HEADER_LABEL}
				</Link>
				<nav aria-label="Primary">
					<ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-700 dark:text-neutral-300">
						{PRIMARY_NAV.map((page) => (
							<li key={page.path}>
								<Link
									className="hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:hover:text-white"
									href={page.path}
								>
									{page.navLabel}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
