'use client'

/**
 * trackEvent — unified analytics event dispatcher.
 *
 * - GA4 (gtag): only fires if the user has accepted analytics cookies.
 * - Cloudflare RUM: always fires via performance.mark (cookieless, no PII).
 *
 * Usage:
 *   trackEvent('jargon_click', { jargon_text: 'Imagine it.', page_section: 'hero-cta' }, analyticsEnabled)
 */

type EventParams = Record<string, string | number | boolean | null>

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void
	}
}

/**
 * Fire a named event to GA4 (consent-gated) and Cloudflare RUM (always).
 */
export function trackEvent(
	eventName: string,
	params: EventParams = {},
	analyticsEnabled = false,
) {
	// GA4 — only when consent given
	if (analyticsEnabled && typeof window !== 'undefined' && typeof window.gtag === 'function') {
		window.gtag('event', eventName, params)
	}

	// Cloudflare RUM — cookieless, always safe to fire
	if (typeof window !== 'undefined' && typeof window.performance?.mark === 'function') {
		try {
			window.performance.mark(`sabako:${eventName}`, {
				detail: params,
			})
		} catch {
			// performance.mark detail not supported in all browsers — silent fallback
		}
	}
}
