type JsonLdProps = {
	data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
	const graphs = Array.isArray(data) ? data : [data];
	return (
		<>
			{graphs.map((graph) => (
				<script
					key={JSON.stringify(graph["@type"] ?? graph["@id"] ?? graph)}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
				/>
			))}
		</>
	);
}
