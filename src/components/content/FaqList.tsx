type FaqItem = {
	question: string;
	answer: string;
};

type FaqListProps = {
	items: readonly FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
	return (
		<dl className="space-y-8">
			{items.map((item) => (
				<div key={item.question}>
					<dt className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
						{item.question}
					</dt>
					<dd className="mt-2 leading-relaxed">{item.answer}</dd>
				</div>
			))}
		</dl>
	);
}
