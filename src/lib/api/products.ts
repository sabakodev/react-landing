/**
 * Product Spotlight API
 *
 * Mock data for the homepage product spotlight banner.
 * To connect to a CMS or WP, replace the mock and add your fetch logic.
 */

export type FeaturedProduct = {
	label: string          // e.g. "New Launch"
	name: string           // e.g. "SABAKO Monitor"
	description: string    // short one-liner
	href: string           // link destination
	active: boolean        // set false to hide both banners
}

const mockProduct: FeaturedProduct = {
	label: 'New',
	name: 'SABAKO Monitor',
	description: 'Real-time IoT dashboard for industrial deployments — now in early access.',
	href: '/work/smart-building',
	active: true,
}

export async function getFeaturedProduct(): Promise<FeaturedProduct | null> {
	// --- Replace with CMS/WP fetch ---
	// const res = await fetch(...)
	// ---------------------------------
	if (!mockProduct.active) return null
	return mockProduct
}
