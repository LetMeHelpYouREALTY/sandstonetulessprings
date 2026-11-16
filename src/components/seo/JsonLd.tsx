type JsonLdProps = {
	data: Record<string, unknown> | Record<string, unknown>[];
};

function serializeJsonLd(graph: Record<string, unknown>): string {
	return JSON.stringify(graph).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
	const graphs = Array.isArray(data) ? data : [data];
	return (
		<>
			{graphs.map((graph) => (
				<script
					key={JSON.stringify(graph["@type"] ?? graph["@id"] ?? graph)}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
				/>
			))}
		</>
	);
}
