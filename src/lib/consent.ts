'use client'

import { useSyncExternalStore } from 'react'

export type ConsentState = {
	analytics: boolean
	marketing: boolean
}

export const CONSENT_STORAGE_KEY = 'sabako_consent'

const listeners = new Set<() => void>()
let memoryRaw: string | null = null
let cachedRaw: string | null = null
let cachedConsent: ConsentState | null = null

function readRaw(): string | null {
	try {
		return localStorage.getItem(CONSENT_STORAGE_KEY)
	} catch {
		return memoryRaw
	}
}

function parse(raw: string | null): ConsentState | null {
	if (!raw) return null
	try {
		const value = JSON.parse(raw) as Partial<ConsentState> | null
		if (!value || typeof value !== 'object') return null
		return { analytics: value.analytics === true, marketing: value.marketing === true }
	} catch {
		return null
	}
}

/** Current stored choice, or null when nothing has been chosen (or on the server). */
export function getConsent(): ConsentState | null {
	if (typeof window === 'undefined') return null
	const raw = readRaw()
	if (raw !== cachedRaw) {
		cachedRaw = raw
		cachedConsent = parse(raw)
	}
	return cachedConsent
}

export function hasMarketingConsent(): boolean {
	return getConsent()?.marketing === true
}

function getServerSnapshot(): ConsentState | null {
	return null
}

function notify() {
	listeners.forEach((listener) => listener())
}

function onStorage(e: StorageEvent) {
	if (e.key === CONSENT_STORAGE_KEY || e.key === null) notify()
}

function subscribe(listener: () => void) {
	listeners.add(listener)
	if (listeners.size === 1) window.addEventListener('storage', onStorage)
	return () => {
		listeners.delete(listener)
		if (listeners.size === 0) window.removeEventListener('storage', onStorage)
	}
}

/** Expire cookies whose name matches, on the host and on parent-domain scopes. */
function deleteCookies(match: (name: string) => boolean) {
	const names = document.cookie
		.split(';')
		.map((part) => part.split('=')[0].trim())
		.filter((name) => name && match(name))
	if (names.length === 0) return

	const host = window.location.hostname
	const domains = ['', `; domain=${host}`, `; domain=.${host}`, '; domain=.sabako.id']
	for (const name of names) {
		for (const domain of domains) {
			document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
		}
	}
}

function writeConsent(state: ConsentState) {
	if (typeof window === 'undefined') return
	const raw = JSON.stringify(state)
	memoryRaw = raw
	try {
		localStorage.setItem(CONSENT_STORAGE_KEY, raw)
	} catch {
		// Storage unavailable (private mode): the in-memory copy covers this session.
	}
	if (!state.analytics) deleteCookies((name) => name.startsWith('_ga'))
	if (!state.marketing) deleteCookies((name) => name === '_fbp')
	notify()
}

function subscribeNoop() {
	return () => {}
}

export function useConsent() {
	const consent = useSyncExternalStore(subscribe, getConsent, getServerSnapshot)
	const loaded = useSyncExternalStore(subscribeNoop, () => true, () => false)

	const save = (next: ConsentState) => writeConsent(next)
	const acceptAll = () => writeConsent({ analytics: true, marketing: true })
	const rejectAll = () => writeConsent({ analytics: false, marketing: false })
	const setAnalytics = (value: boolean) =>
		writeConsent({ analytics: value, marketing: getConsent()?.marketing ?? false })
	const setMarketing = (value: boolean) =>
		writeConsent({ analytics: getConsent()?.analytics ?? false, marketing: value })

	return {
		consent,
		loaded,
		hasChosen: consent !== null,
		analyticsEnabled: consent?.analytics ?? false,
		marketingEnabled: consent?.marketing ?? false,
		save,
		acceptAll,
		rejectAll,
		setAnalytics,
		setMarketing,
	}
}
