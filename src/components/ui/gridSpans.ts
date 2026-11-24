/**
 * Column spans for a `lg:grid-cols-12` card grid, chosen from the item count
 * so the last row is always full (no empty hairline cell).
 *
 * Class names are static strings in SPAN so Tailwind can see them; never build
 * them with template literals.
 */

const SPAN = {
	4: 'lg:col-span-4',
	5: 'lg:col-span-5',
	6: 'lg:col-span-6',
	7: 'lg:col-span-7',
	12: 'lg:col-span-12',
} as const

type BentoOptions = {
	/** Reserve a trailing call-to-action cell that fills the last row. */
	withCta?: boolean
	/** With an even count, lay items out two per row (6/6). */
	preferPairs?: boolean
}

export function bentoSpans(count: number, { withCta = false, preferPairs = false }: BentoOptions = {}): {
	items: string[]
	cta?: string
} {
	if (count <= 0) return { items: [], cta: withCta ? SPAN[12] : undefined }

	if (preferPairs && !withCta && count % 2 === 0) {
		return { items: Array(count).fill(SPAN[6]) }
	}

	const items: string[] = Array(count).fill(SPAN[4])
	const remainder = count % 3

	if (withCta) {
		if (remainder === 0) return { items, cta: SPAN[12] }
		if (remainder === 1) {
			items[count - 1] = SPAN[5]
			return { items, cta: SPAN[7] }
		}
		return { items, cta: SPAN[4] }
	}

	if (remainder === 1) items[count - 1] = SPAN[12]
	if (remainder === 2) {
		items[count - 1] = SPAN[6]
		items[count - 2] = SPAN[6]
	}
	return { items }
}
