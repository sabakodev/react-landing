'use client'

/**
 * useButtonTracking — tracks every intentional button/CTA click.
 *
 * Fire `button_click` event to GA4 (consent-gated) and Cloudflare RUM (always).
 *
 * Usage:
 *   const track = useButtonTracking()
 *   <button onClick={track('Get Started', 'pricing', { tier: 'growth' })}>Get Started</button>
 */

import { useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useConsent } from '@/lib/consent'
import { trackEvent } from '@/lib/analytics/trackEvent'

type ExtraParams = Record<string, string | number | boolean | null | undefined>

type ClickHandler = (e?: React.MouseEvent) => void

export function useButtonTracking() {
	const pathname = usePathname()
	const { analyticsEnabled } = useConsent()
	// Debounce: ignore repeat clicks within 500ms
	const lastFiredRef = useRef<Record<string, number>>({})

	const track = useCallback(
		(
			label: string,
			section: string,
			extra: ExtraParams = {},
		): ClickHandler =>
			(_e?: React.MouseEvent) => {
				const key = `${label}::${section}`
				const now = Date.now()
				if ((lastFiredRef.current[key] ?? 0) > now - 500) return
				lastFiredRef.current[key] = now

				trackEvent(
					'button_click',
					{
						label,
						page: pathname,
						section,
						timestamp: new Date().toISOString(),
						...extra,
					},
					analyticsEnabled,
				)
			},
		[pathname, analyticsEnabled],
	)

	return track
}
