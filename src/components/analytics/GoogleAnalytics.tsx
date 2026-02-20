'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useConsent } from '@/lib/consent'

/**
 * Google Analytics 4 — only loads after user consent.
 * Set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX in your .env.local
 */
export function GoogleAnalytics() {
	const { analyticsEnabled, loaded } = useConsent()
	const gaId = process.env.NEXT_PUBLIC_GA_ID

	if (!loaded || !analyticsEnabled || !gaId) return null

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
				strategy="afterInteractive"
			/>
			<Script id="ga4-init" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${gaId}', { anonymize_ip: true });
				`}
			</Script>
		</>
	)
}
