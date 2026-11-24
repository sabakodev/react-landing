import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Visitor country from Cloudflare's `cf-ipcountry` header (needs Cloudflare
 * "IP Geolocation" on). Outside production, `?geo=XX` overrides it for testing.
 */
export function GET(req: NextRequest) {
	const override = req.nextUrl.searchParams.get('geo')
	const header = req.headers.get('cf-ipcountry')
	const country =
		process.env.VERCEL_ENV !== 'production' && override && /^[A-Za-z]{2}$/.test(override)
			? override.toUpperCase()
			: header || null

	return NextResponse.json({ country }, { headers: { 'Cache-Control': 'no-store' } })
}
