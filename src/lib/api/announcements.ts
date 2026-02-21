/**
 * Announcement Spotlight API
 *
 * Mock data for the homepage announcement spotlight banner.
 * To connect to a CMS or WP, replace the mock and add your fetch logic.
 */

export type FeaturedAnnouncement = {
	label: string          // e.g. "New Launch"
	name: string           // e.g. "SABAKO Monitor"
	description: string    // short one-liner
	href: string           // link destination
	startDate: Date        // set false to hide both banners
	endDate: Date        // set false to hide both banners
}

const mockAnnouncement: FeaturedAnnouncement = {
	label: 'New',
	name: 'OtaByte Project',
	description: 'Independent virtual entertainment artist — peek the project.',
	href: 'https://project.otabyte.net/?utm_source=sabako.id&utm_medium=banner&utm_campaign=landing_page&utm_content=otabyte-project',
	startDate: new Date(2026, 1, 21),
	endDate: new Date(2026, 3, 28),
}

export async function getFeaturedAnnouncement(): Promise<FeaturedAnnouncement | null> {
	// --- Replace with CMS/WP fetch ---
	// const res = await fetch(...)
	// ---------------------------------
	if (mockAnnouncement.startDate > new Date() || mockAnnouncement.endDate < new Date()) return null
	return mockAnnouncement
}
