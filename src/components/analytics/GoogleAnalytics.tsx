'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'
import { CONSENT_STORAGE_KEY, useConsent } from '@/lib/consent'

/**
 * Google Analytics 4 with Consent Mode v2.
 * Always loads; the stored choice (or 'denied') is set as the consent default
 * before `config`, and later choices are pushed as consent updates.
 * Set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX in your .env.local
 */
export function GoogleAnalytics() {
	const { consent } = useConsent()
	const gaId = process.env.NEXT_PUBLIC_GA_ID
	const lastPushed = useRef<string | null>(null)

	useEffect(() => {
		if (!consent || typeof window.gtag !== 'function') return
		const key = `${consent.analytics}:${consent.marketing}`
		if (lastPushed.current === key) return
		lastPushed.current = key
		const ads = consent.marketing ? 'granted' : 'denied'
		window.gtag('consent', 'update', {
			analytics_storage: consent.analytics ? 'granted' : 'denied',
			ad_storage: ads,
			ad_user_data: ads,
			ad_personalization: ads,
		})
	}, [consent])

	if (!gaId) return null

	const init = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var c = null;
try { c = JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}) || 'null'); } catch (e) {}
var a = c && c.analytics === true ? 'granted' : 'denied';
var m = c && c.marketing === true ? 'granted' : 'denied';
gtag('consent', 'default', { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m, wait_for_update: 500 });
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaId)});
`

	return (
		<>
			<script id="ga4-init" dangerouslySetInnerHTML={{ __html: init }} />
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
				strategy="afterInteractive"
			/>
		</>
	)
}
