/**
 * Legacy layout — preserved as reference only.
 * Original layout before the 2026 redesign.
 * This route group (/legacy/*) is not linked from the new site.
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'SABAKO (Legacy)',
	description: 'Creative Digital Agency — legacy pages.',
}

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
