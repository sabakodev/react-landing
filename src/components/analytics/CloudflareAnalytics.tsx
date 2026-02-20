/**
 * Cloudflare Web Analytics — privacy-first, no cookies, no consent required.
 * Set NEXT_PUBLIC_CF_BEACON_TOKEN=your_token in your .env.local
 * Find your token at: cloudflare.com → Web Analytics → your site → JS Snippet
 */
export function CloudflareAnalytics() {
	const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN
	if (!token) return null

	return (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
			defer
			src="https://static.cloudflareinsights.com/beacon.min.js"
			data-cf-beacon={`{"token": "${token}"}`}
		/>
    );
}
