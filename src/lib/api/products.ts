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
	name: 'OtaByte Project',
	description: 'Independent virtual entertainment artist — peek the project.',
	href: 'https://project.otabyte.net/?utm_source=sabako.id&utm_medium=banner&utm_campaign=landing_page&utm_content=otabyte-project',
	active: true,
}

export async function getFeaturedProduct(): Promise<FeaturedProduct | null> {
	// --- Replace with CMS/WP fetch ---
	// const res = await fetch(...)
	// ---------------------------------
	if (!mockProduct.active) return null
	return mockProduct
}
