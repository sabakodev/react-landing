'use client'

/**
 * trackEvent — unified analytics event dispatcher.
 *
 * - GA4 (gtag): always called; Consent Mode decides whether cookies are used.
 * - Meta Pixel: a few conversion events, only with marketing consent.
 * - Cloudflare RUM: always fires via performance.mark (cookieless, no PII).
 *
 * Usage:
 *   trackEvent('jargon_click', { jargon_text: 'Imagine it.', page_section: 'hero-cta' })
 */

import { hasMarketingConsent } from '@/lib/consent'

type EventParams = Record<string, string | number | boolean | null | undefined>

export type MetaPixelFn = {
	(...args: unknown[]): void
	callMethod?: (...args: unknown[]) => void
	queue: unknown[][]
	push: MetaPixelFn
	loaded: boolean
	version: string
	disablePushState?: boolean
}

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void
		dataLayer?: unknown[]
		fbq?: MetaPixelFn
		_fbq?: MetaPixelFn
	}
}

const LEAD_PARAMS = ['service', 'tier', 'model', 'product'] as const

function isContactHref(href: unknown): boolean {
	return typeof href === 'string' && (href.startsWith('mailto:') || /^https?:\/\/wa\.me\//.test(href))
}

/** Meta Pixel standard event — no-op without the pixel or marketing consent. */
function trackPixel(eventName: string) {
	if (typeof window.fbq !== 'function' || !hasMarketingConsent()) return
	window.fbq('track', eventName)
}

/**
 * Fire a named event to GA4 and Cloudflare RUM, plus mapped conversion events.
 */
export function trackEvent(eventName: string, params: EventParams = {}) {
	if (typeof window === 'undefined') return

	if (typeof window.gtag === 'function') {
		window.gtag('event', eventName, params)

		if (eventName === 'contact_form_submit') {
			const leadParams: EventParams = {}
			for (const key of LEAD_PARAMS) {
				if (params[key] != null) leadParams[key] = params[key]
			}
			window.gtag('event', 'generate_lead', leadParams)
		}
	}

	if (eventName === 'contact_form_submit') trackPixel('Lead')
	if (eventName === 'button_click' && isContactHref(params.href)) trackPixel('Contact')

	// Cloudflare RUM — cookieless, always safe to fire
	if (typeof window.performance?.mark === 'function') {
		try {
			window.performance.mark(`sabako:${eventName}`, {
				detail: params,
			})
		} catch {
			// performance.mark detail not supported in all browsers — silent fallback
		}
	}
}
