#!/usr/bin/env node
/**
 * Crawl-health check: fetch the sitemap from <baseUrl>, then request every URL
 * as GPTBot and assert that each returns 200 with an <h1>, at least one
 * JSON-LD block that parses, and exactly one #org Organization node.
 *
 * Usage: node scripts/check-sitemap.mjs http://localhost:3000
 *        node scripts/check-sitemap.mjs https://sabako.id
 *
 * Node 20+, no dependencies. Exits 1 on any failure.
 */

const CANONICAL_ORIGIN = 'https://sabako.id'
const USER_AGENT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)'
const CONCURRENCY = 5
const TIMEOUT_MS = 30_000

const baseUrl = (process.argv[2] ?? '').replace(/\/+$/, '')
if (!baseUrl) {
	console.error('Usage: node scripts/check-sitemap.mjs <baseUrl>')
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

	if (!/<h1[\s>]/i.test(html)) errors.push('no <h1> in raw HTML')

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
