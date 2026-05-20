type FaqItem = {
	question: string;
	answer: string;
};

type FaqListProps = {
	items: readonly FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
	return (
		<ul className="m-0 max-w-[var(--measure)] list-none space-y-0 border-t border-[var(--border-subtle)] p-0">
			{items.map((item) => (
				<li key={item.question} className="border-b border-[var(--border-subtle)]">
					<details className="lux-faq">
						<summary>{item.question}</summary>
						<p className="lux-faq-answer">{item.answer}</p>
					</details>
				</li>
			))}
		</ul>
	);
}
