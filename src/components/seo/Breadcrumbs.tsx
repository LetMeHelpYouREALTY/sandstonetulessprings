import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/site-pages";

type BreadcrumbsProps = {
	items: readonly BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	if (items.length <= 1) {
		return null;
	}

	return (
		<nav aria-label="Breadcrumb" className="text-sm text-neutral-600 dark:text-neutral-400">
			<ol className="flex flex-wrap items-center gap-1">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li key={item.path} className="flex items-center gap-1">
							{index > 0 ? (
								<span aria-hidden className="text-neutral-400">
									/
								</span>
							) : null}
							{isLast ? (
								<span aria-current="page" className="text-neutral-900 dark:text-neutral-100">
									{item.name}
								</span>
							) : (
								<Link className="hover:underline hover:underline-offset-4" href={item.path}>
									{item.name}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
