'use client'

/**
 * useJargon — A/B jargon engagement tracking hook.
 *
 * Picks one string randomly from the set, fires a jargon_impression event
 * on mount, and returns a click handler that fires jargon_click.
 *
 * Usage:
 *   const { text, onCtaClick } = useJargon({
 *     set: ["Let's build.", "Time to ship."],
 *     setId: 'cta-section',
 *     section: 'homepage-cta',
 *   })
 */

import { useEffect, useMemo, useState } from 'react'
import { useConsent } from '@/lib/consent'
import { trackEvent } from '@/lib/analytics/trackEvent'

type UseJargonOptions = {
	/** The pool of jargon strings to pick from. */
	set: string[]
	/** Stable identifier for this jargon group (used in analytics). */
	setId: string
	/** Human-readable page section label (used in analytics). */
	section: string
}

type UseJargonReturn = {
	/** The randomly picked jargon text to display. */
	text: string
	/** Call this on the CTA button's onClick to track a click event. */
	onCtaClick: () => void
	/** Whether a click was registered (optional UI feedback). */
	clicked: boolean
}

export function useJargon({ set, setId, section }: UseJargonOptions): UseJargonReturn {
	const { analyticsEnabled } = useConsent()
	const [clicked, setClicked] = useState(false)

	const [text, setText] = useState<string>('')

	// Randomize only after hydration on the client
	useEffect(() => {
		if (set.length === 0) return
		setText(set[Math.floor(Math.random() * set.length)])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setId])

	// Fire impression on mount
	useEffect(() => {
		if (!text) return
		trackEvent(
			'jargon_impression',
			{
				jargon_text: text,
				jargon_set_id: setId,
				page_section: section,
			},
			analyticsEnabled,
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text])

	const onCtaClick = () => {
		setClicked(true)
		trackEvent(
			'jargon_click',
			{
				jargon_text: text,
				jargon_set_id: setId,
				page_section: section,
				converted: true,
			},
			analyticsEnabled,
		)
	}

	return { text, onCtaClick, clicked }
}
