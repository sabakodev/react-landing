'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useConsent } from '@/lib/consent'
import type { MetaPixelFn } from '@/lib/analytics/trackEvent'

/** Standard fbevents.js bootstrap: queue calls until the library loads. */
function loadPixel(): MetaPixelFn {
	if (window.fbq) return window.fbq
	const fbq = function (...args: unknown[]) {
		if (fbq.callMethod) fbq.callMethod(...args)
		else fbq.queue.push(args)
	} as MetaPixelFn
	if (!window._fbq) window._fbq = fbq
	fbq.push = fbq
	fbq.loaded = true
	fbq.version = '2.0'
	fbq.queue = []
	window.fbq = fbq

	const script = document.createElement('script')
	script.async = true
	script.src = 'https://connect.facebook.net/en_US/fbevents.js'
	document.head.appendChild(script)
	return fbq
}

/**
 * Meta Pixel — loads only after marketing consent.
 * Set NEXT_PUBLIC_META_PIXEL_ID in your .env.local
 */
export function MetaPixel() {
	const { consent } = useConsent()
	const pathname = usePathname()
	const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
	const granted = Boolean(pixelId) && consent?.marketing === true
	const initialised = useRef(false)
	const active = useRef(false)
	const lastTrackedPath = useRef<string | null>(null)

	useEffect(() => {
		if (!pixelId) return
		if (!granted) {
			if (active.current) window.fbq?.('consent', 'revoke')
			active.current = false
			return
		}
		if (active.current) return
		const fbq = loadPixel()
		if (initialised.current) {
			fbq('consent', 'grant')
		} else {
			fbq.disablePushState = true
			fbq('init', pixelId)
			initialised.current = true
		}
		active.current = true
	}, [granted, pixelId])

	useEffect(() => {
		if (!granted || typeof window.fbq !== 'function') return
		if (lastTrackedPath.current === pathname) return
		lastTrackedPath.current = pathname
		window.fbq('track', 'PageView')
	}, [granted, pathname])

	return null
}
