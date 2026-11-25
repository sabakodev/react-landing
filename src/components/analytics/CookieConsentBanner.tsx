'use client'

import { useState, useEffect } from 'react'
import { useConsent } from '@/lib/consent'
import { X } from 'lucide-react'

const choiceButton =
	'inline-flex items-center justify-center px-4 py-2 bg-(--text) text-(--bg) text-xs font-medium hover:opacity-80 transition-opacity'

/**
 * Cookie consent banner — shown until user makes a choice.
 * Also listens for a global 'cookie-settings-open' event so
 * the Footer's "Cookie Settings" button can open the modal at any time.
 */
export function CookieConsentBanner() {
	const { loaded, hasChosen, acceptAll, rejectAll } = useConsent()
	const [dismissed, setDismissed] = useState(false)
	const [showPrefs, setShowPrefs] = useState(false)

	// Listen for the global event dispatched by the Footer "Cookie Settings" button
	useEffect(() => {
		const handler = () => setShowPrefs(true)
		window.addEventListener('cookie-settings-open', handler)
		return () => window.removeEventListener('cookie-settings-open', handler)
	}, [])

	// Only hide the persistent banner if choice has been made or dismissed.
	// The modal can still be opened independently via the event.
	const showBanner = loaded && !hasChosen && !dismissed

	return (
		<>
			{showBanner && (
				<div
					role="dialog"
					aria-labelledby="cookie-notice-title"
					aria-describedby="cookie-notice-body"
					aria-modal="false"
					className="fixed z-50 inset-x-0 bottom-0 border-t border-(--border) bg-(--bg) shadow-2xl px-4 py-3 md:inset-x-auto md:right-4 md:bottom-4 md:max-w-[26rem] md:border md:p-5"
				>
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<p
								id="cookie-notice-title"
								className="hidden md:block text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-1"
							>
								Cookie Notice
							</p>
							<p id="cookie-notice-body" className="text-xs md:text-sm text-(--text-muted) leading-snug md:leading-relaxed">
								<span className="md:hidden">
									Google Analytics and Meta Pixel run only if you accept.
								</span>
								<span className="hidden md:inline">
									Cloudflare Web Analytics (cookieless) is always on. With your consent we also use Google Analytics for usage statistics and Meta Pixel for ad measurement.
								</span>
							</p>
						</div>
						<button
							onClick={() => setDismissed(true)}
							aria-label="Dismiss cookie notice"
							className="shrink-0 p-1 -m-1 text-(--text-subtle) hover:text-(--text) transition-colors"
						>
							<X size={16} />
						</button>
					</div>
					<div className="mt-3 flex items-center justify-between gap-3">
						<button
							onClick={() => setShowPrefs(true)}
							className="text-xs font-mono text-(--text-subtle) hover:text-(--text) transition-colors underline underline-offset-2"
						>
							Preferences
						</button>
						<div className="flex items-center gap-2">
							<button id="cookie-reject-all" onClick={rejectAll} className={choiceButton}>
								Reject
							</button>
							<button id="cookie-accept-all" onClick={acceptAll} className={choiceButton}>
								Accept All
							</button>
						</div>
					</div>
				</div>
			)}

			{showPrefs && (
				<CookiePreferencesModal onClose={() => setShowPrefs(false)} />
			)}
		</>
	)
}

function Switch({ id, labelledBy, checked, onChange }: {
	id: string
	labelledBy: string
	checked: boolean
	onChange: (value: boolean) => void
}) {
	return (
		<button
			role="switch"
			aria-checked={checked}
			aria-labelledby={labelledBy}
			id={id}
			onClick={() => onChange(!checked)}
			className={`relative w-10 h-5 transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-(--brand) ${checked ? 'bg-(--brand)' : 'bg-(--border)'
				}`}
		>
			<span
				className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'
					}`}
			/>
		</button>
	)
}

function CookiePreferencesModal({ onClose }: { onClose: () => void }) {
	const { analyticsEnabled, marketingEnabled, save } = useConsent()
	const [localAnalytics, setLocalAnalytics] = useState(analyticsEnabled)
	const [localMarketing, setLocalMarketing] = useState(marketingEnabled)

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [onClose])

	const handleSave = () => {
		save({ analytics: localAnalytics, marketing: localMarketing })
		onClose()
	}

	return (
		<div
			role="dialog"
			aria-label="Cookie Preferences"
			aria-modal="true"
			className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-4 sm:p-6"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Panel */}
			<div className="relative w-full max-w-lg bg-(--bg) border border-(--border) shadow-2xl">
				<div className="flex items-center justify-between p-6 border-b border-(--border)">
					<div>
						<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-1">
							Privacy
						</p>
						<h2 className="text-lg font-bold text-(--text)">Cookie Preferences</h2>
					</div>
					<button
						onClick={onClose}
						aria-label="Close"
						className="p-1.5 text-(--text-subtle) hover:text-(--text) transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				<div className="p-6 space-y-5">
					{/* Essential */}
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<p className="text-sm font-bold text-(--text) mb-1">Essential</p>
							<p className="text-xs text-(--text-muted) leading-relaxed">
								Cloudflare Web Analytics — no cookies, no personal data. Always active for site performance.
							</p>
						</div>
						<div className="shrink-0">
							<span className="inline-block px-2 py-1 text-xs font-mono bg-(--bg-subtle) border border-(--border) text-(--text-subtle)">
								Always on
							</span>
						</div>
					</div>

					<div className="border-t border-(--border)" />

					{/* Analytics */}
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<p id="analytics-toggle-label" className="text-sm font-bold text-(--text) mb-1">Analytics</p>
							<p className="text-xs text-(--text-muted) leading-relaxed">
								Google Analytics 4 — page views and interactions, stored in cookies (<code className="font-mono">_ga</code>, <code className="font-mono">_ga_*</code>). Without consent, Google receives only cookieless, anonymous pings.
							</p>
						</div>
						<div className="shrink-0">
							<Switch
								id="analytics-toggle"
								labelledBy="analytics-toggle-label"
								checked={localAnalytics}
								onChange={setLocalAnalytics}
							/>
						</div>
					</div>

					<div className="border-t border-(--border)" />

					{/* Marketing */}
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<p id="marketing-toggle-label" className="text-sm font-bold text-(--text) mb-1">Marketing</p>
							<p className="text-xs text-(--text-muted) leading-relaxed">
								Meta Pixel — measures our ads on Facebook and Instagram using a cookie (<code className="font-mono">_fbp</code>). Not loaded at all without consent.
							</p>
						</div>
						<div className="shrink-0">
							<Switch
								id="marketing-toggle"
								labelledBy="marketing-toggle-label"
								checked={localMarketing}
								onChange={setLocalMarketing}
							/>
						</div>
					</div>
				</div>

				<div className="p-6 border-t border-(--border) flex items-center justify-end gap-3">
					<button
						onClick={onClose}
						className="text-sm text-(--text-muted) hover:text-(--text) transition-colors"
					>
						Cancel
					</button>
					<button
						id="cookie-save-prefs"
						onClick={handleSave}
						className="px-6 py-2.5 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity"
					>
						Save Preferences
					</button>
				</div>
			</div>
		</div>
	)
}
