#!/usr/bin/env node
/**
 * Crawl-health check: fetch the sitemap from <baseUrl>, then request every URL
 * as GPTBot and assert that each returns 200 with:
 *   - exactly one <h1>
 *   - at least one JSON-LD block that parses, and exactly one #org Organization node
 *   - a <link rel="canonical">
 *   - exactly one og:image and at least one twitter:image
 *   - a twitter:title matching the <title> (TITLE_RULE below)
 *
 * Usage: node scripts/check-sitemap.mjs http://localhost:3000
 *        node scripts/check-sitemap.mjs https://sabako.id
 *        CHECK_BASE_URL=http://localhost:3111 node scripts/check-sitemap.mjs
 *
 * Node 20+, no dependencies. Exits 1 on any failure.
 */

const CANONICAL_ORIGIN = 'https://sabako.id'
const USER_AGENT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)'
const CONCURRENCY = 5
const TIMEOUT_MS = 30_000

const TITLE_SUFFIX = ' | SABAKO'
const TITLE_RULE = `twitter:title must equal <title>, or equal it once the "${TITLE_SUFFIX}" template suffix is removed`

const baseUrl = (process.argv[2] ?? process.env.CHECK_BASE_URL ?? '').replace(/\/+$/, '')
if (!baseUrl) {
	console.error('Usage: node scripts/check-sitemap.mjs <baseUrl>  (or set CHECK_BASE_URL)')
	process.exit(1)
}

async function get(url) {
	return fetch(url, {
		headers: { 'User-Agent': USER_AGENT },
		redirect: 'manual',
		signal: AbortSignal.timeout(TIMEOUT_MS),
	})
}

const ORG_ID = `${CANONICAL_ORIGIN}/#org`

/** Count Organization nodes that define the site's own entity (`@id` #org with a `@type`). */
function countOrganizations(node) {
	if (Array.isArray(node)) return node.reduce((n, item) => n + countOrganizations(item), 0)
	if (!node || typeof node !== 'object') return 0
	const types = [].concat(node['@type'] ?? [])
	let n = node['@id'] === ORG_ID && types.includes('Organization') ? 1 : 0
	for (const [key, value] of Object.entries(node)) {
		if (key !== '@type') n += countOrganizations(value)
	}
	return n
}

function decodeEntities(text) {
	return text
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
}

/** All <meta> tags in the HTML as attribute maps. */
function metaTags(html) {
	return [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) =>
		Object.fromEntries([...m[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((a) => [a[1].toLowerCase(), decodeEntities(a[2])])),
	)
}

function checkHead(html) {
	const errors = []
	const metas = metaTags(html)
	const byKey = (key) => metas.filter((m) => m.property === key || m.name === key).map((m) => m.content)

	if (!/<link[^>]+rel="canonical"[^>]*>/i.test(html)) errors.push('no <link rel="canonical">')

	const ogImages = byKey('og:image')
	if (ogImages.length !== 1) errors.push(`expected 1 og:image, found ${ogImages.length}`)
	if (byKey('twitter:image').length === 0) errors.push('no twitter:image')

	const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
	const title = titleMatch ? decodeEntities(titleMatch[1]).trim() : null
	const [twitterTitle] = byKey('twitter:title')
	if (title === null) errors.push('no <title>')
	else if (twitterTitle === undefined) errors.push('no twitter:title')
	else if (twitterTitle !== title && `${twitterTitle}${TITLE_SUFFIX}` !== title) {
		errors.push(`twitter:title "${twitterTitle}" does not match <title> "${title}"`)
	}
	return errors
}

async function checkPage(url) {
	const errors = []
	let res
	try {
		res = await get(url)
	} catch (error) {
		return [`request failed: ${error.message}`]
	}
	if (res.status !== 200) {
		const location = res.headers.get('location')
		return [`status ${res.status}${location ? ` -> ${location}` : ''}`]
	}
	const html = await res.text()

	const h1s = (html.match(/<h1[\s>]/gi) ?? []).length
	if (h1s !== 1) errors.push(`expected exactly 1 <h1> in raw HTML, found ${h1s}`)

	errors.push(...checkHead(html))

	const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])
	if (blocks.length === 0) errors.push('no JSON-LD block')
	let organizations = 0
	blocks.forEach((block, i) => {
		try {
			const data = JSON.parse(block)
			organizations += countOrganizations(data)
		} catch (error) {
			errors.push(`JSON-LD block ${i + 1} does not parse: ${error.message}`)
		}
	})
	if (blocks.length && organizations !== 1) errors.push(`expected 1 #org Organization node, found ${organizations}`)

	return errors
}

async function main() {
	const sitemapUrl = `${baseUrl}/sitemap.xml`
	let res
	try {
		res = await get(sitemapUrl)
	} catch (error) {
		console.error(`FAIL ${sitemapUrl}: ${error.message}`)
		process.exit(1)
	}
	if (res.status !== 200) {
		console.error(`FAIL ${sitemapUrl}: status ${res.status}`)
		process.exit(1)
	}
	const xml = await res.text()
	const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) =>
		m[1].replace(/&amp;/g, '&').replace(CANONICAL_ORIGIN, baseUrl),
	)
	if (urls.length === 0) {
		console.error(`FAIL ${sitemapUrl}: no <loc> entries`)
		process.exit(1)
	}

	console.log(`Checking ${urls.length} URLs from ${sitemapUrl} as GPTBot…`)
	console.log(`Title rule: ${TITLE_RULE}.`)

	const failures = []
	let next = 0
	async function worker() {
		while (next < urls.length) {
			const url = urls[next++]
			const errors = await checkPage(url)
			if (errors.length) {
				failures.push({ url, errors })
				console.log(`FAIL ${url}\n  - ${errors.join('\n  - ')}`)
			} else {
				console.log(`ok   ${url}`)
			}
		}
	}
	await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker))

	console.log(`\n${urls.length - failures.length}/${urls.length} passed, ${failures.length} failed.`)
	process.exit(failures.length ? 1 : 0)
}

main()
