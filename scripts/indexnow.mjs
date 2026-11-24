#!/usr/bin/env node
/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver …).
 * Run manually after a deploy.
 *
 * Usage: node scripts/indexnow.mjs [siteUrl] [--dry-run]
 *        (siteUrl defaults to https://sabako.id)
 *
 * The key is public by design: it is served at https://sabako.id/<key>.txt
 * from public/<key>.txt. Override with the INDEXNOW_KEY env var only if a
 * matching public/<key>.txt file exists.
 *
 * Node 20+, no dependencies.
 */

import { readFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'eecf41b1f914f5212dd6e17c0f3f8766'

const ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS_PER_REQUEST = 10_000

async function main() {
	const args = process.argv.slice(2)
	const dryRun = args.includes('--dry-run')
	const siteUrl = (args.find((a) => !a.startsWith('--')) ?? 'https://sabako.id').replace(/\/+$/, '')
	const host = new URL(siteUrl).host

	// The key file must exist locally (and therefore be deployed) with the key as its content.
	const keyFile = fileURLToPath(new URL(`../public/${INDEXNOW_KEY}.txt`, import.meta.url))
	const keyFileContent = (await readFile(keyFile, 'utf8').catch(() => '')).trim()
	if (keyFileContent !== INDEXNOW_KEY) {
		console.error(`Key file public/${INDEXNOW_KEY}.txt is missing or does not contain the key.`)
		process.exit(1)
	}

	const res = await fetch(`${siteUrl}/sitemap.xml`)
	if (!res.ok) {
		console.error(`Failed to fetch ${siteUrl}/sitemap.xml: status ${res.status}`)
		process.exit(1)
	}
	const xml = await res.text()
	const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'))
	if (urls.length === 0) {
		console.error('Sitemap has no <loc> entries.')
		process.exit(1)
	}

	console.log(`${urls.length} URLs for ${host}`)
	if (dryRun) {
		urls.forEach((u) => console.log(`  ${u}`))
		console.log('Dry run — nothing submitted.')
		return
	}

	for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
		const urlList = urls.slice(i, i + MAX_URLS_PER_REQUEST)
		const submit = await fetch(ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				host,
				key: INDEXNOW_KEY,
				keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
				urlList,
			}),
		})
		// 200 = submitted, 202 = accepted (key validation pending)
		if (submit.status !== 200 && submit.status !== 202) {
			console.error(`IndexNow rejected the submission: ${submit.status} ${await submit.text()}`)
			process.exit(1)
		}
		console.log(`Submitted ${urlList.length} URLs: ${submit.status}`)
	}
}

// Run only when executed directly, so INDEXNOW_KEY can be imported elsewhere.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main()
