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
		<nav aria-label="Breadcrumb" className="text-[length:var(--text-sm)] text-lux-muted-soft">
			<ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li key={item.path} className="flex items-center gap-1">
							{index > 0 ? (
								<span aria-hidden className="text-lux-muted-soft">
									/
								</span>
							) : null}
							{isLast ? (
								<span aria-current="page" className="text-lux-text">
									{item.name}
								</span>
							) : (
								<Link className="lux-link no-underline hover:underline" href={item.path}>
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
