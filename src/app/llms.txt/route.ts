import { getPosts } from '@/lib/graphql/adapters/posts'
import { getWorks } from '@/lib/graphql/adapters/works'
import type { Work } from '@/lib/graphql/adapters/works'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/seo/jsonld'
import { publishedServices, publishedServicesId, serviceHref } from '@/lib/services'

export const revalidate = 3600

const LATEST_LIMIT = 20

/** One-line markdown: newlines collapsed so CMS text cannot break the list. */
function oneLine(text: string): string {
	return text.replace(/\s+/g, ' ').trim()
}

export async function GET() {
	let works: Work[] = []
	try {
		works = (await getWorks()).slice(0, LATEST_LIMIT)
	} catch (error) {
		console.error('Failed to fetch works for llms.txt:', error)
	}
	const posts = (await getPosts()).slice(0, LATEST_LIMIT)

	const lines: string[] = [
		'# SABAKO',
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		'PT. SABAKO KREATIV DIGITAL, Jl. Bangka Raya No. 48, Mampang Prapatan, Jakarta Selatan 12720, Indonesia. Email: sales@sabako.id. Phone/WhatsApp: +62 857-6061-6555.',
		'',
		'## Services',
		'',
		...publishedServices().map((s) => `- [${s.name}](${SITE_URL}${serviceHref(s)}): ${oneLine(s.summary)}`),
	]

	if (works.length) {
		lines.push(
			'',
			'## Case studies',
			'',
			...works.map((w) => {
				const label = w.engagementLabel ? ` (${w.engagementLabel})` : ''
				return `- [${oneLine(w.title)}](${SITE_URL}/work/${w.slug})${label}: ${oneLine(w.description)}`
			}),
		)
	}

	if (posts.length) {
		lines.push(
			'',
			'## Blog',
			'',
			...posts.map((p) => `- [${oneLine(p.title)}](${SITE_URL}/blog/${p.slug}): ${oneLine(p.excerpt)}`),
		)
	}

	lines.push(
		'',
		'## Company',
		'',
		`- [About](${SITE_URL}/about): Company background and team`,
		`- [Contact](${SITE_URL}/contact): Project inquiries and consultations`,
		`- [Bot policy](${SITE_URL}/bot): SABAKO's own crawlers`,
		'',
		'## Bahasa Indonesia',
		'',
		`- [Beranda](${SITE_URL}/id): Software house di Jakarta`,
		...publishedServicesId().map((s) => {
			const id = { ...s, ...s.id }
			return `- [${id.name}](${SITE_URL}${serviceHref(s, 'id')}): ${oneLine(id.summary)}`
		}),
		'',
	)

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	})
}
