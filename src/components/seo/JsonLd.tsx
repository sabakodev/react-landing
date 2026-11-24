/**
 * Renders one JSON-LD script. Several nodes are emitted as a single `@graph`.
 * `<` is escaped so CMS-sourced strings cannot close the script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
	const payload = Array.isArray(data)
		? { '@context': 'https://schema.org', '@graph': data }
		: { '@context': 'https://schema.org', ...data }
	const json = JSON.stringify(payload).replace(/</g, '\\u003c')

	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
