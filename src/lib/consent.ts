'use client'

import { useState, useEffect } from 'react'

type ConsentState = {
	analytics: boolean
}

const STORAGE_KEY = 'sabako_consent'

function readConsent(): ConsentState | null {
	if (typeof window === 'undefined') return null
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return null
		return JSON.parse(raw) as ConsentState
	} catch {
		return null
	}
}

function writeConsent(state: ConsentState) {
	if (typeof window === 'undefined') return
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useConsent() {
	const [consent, setConsentState] = useState<ConsentState | null>(null)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const stored = readConsent()
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setConsentState(stored)
		setLoaded(true)
	}, [])

	const acceptAll = () => {
		const next: ConsentState = { analytics: true }
		writeConsent(next)
		setConsentState(next)
	}

	const setAnalytics = (value: boolean) => {
		const next: ConsentState = { analytics: value }
		writeConsent(next)
		setConsentState(next)
	}

	const hasChosen = consent !== null

	return {
		consent,
		loaded,
		hasChosen,
		analyticsEnabled: consent?.analytics ?? true,  // default ON — user can opt out
		acceptAll,
		setAnalytics,
	}
}
