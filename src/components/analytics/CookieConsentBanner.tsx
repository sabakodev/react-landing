'use client'

import { useState, useEffect } from 'react'
import { useConsent } from '@/lib/consent'
import { X, ChevronRight } from 'lucide-react'

/**
 * Cookie consent banner — shown until user makes a choice.
 * Also listens for a global 'cookie-settings-open' event so
 * the Footer's "Cookie Settings" button can open the modal at any time.
 */
export function CookieConsentBanner() {
	const { loaded, hasChosen, acceptAll } = useConsent()
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
					aria-label="Cookie preferences"
					aria-modal="false"
					className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-subtle)] backdrop-blur-sm"
				>
					<div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div className="flex-1 min-w-0 pr-4">
							<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1">
								Cookie Notice
							</p>
							<p className="text-sm text-[var(--text-muted)] leading-relaxed">
								We use essential analytics (Cloudflare) and optional Google Analytics to improve your experience. You can manage or opt out at any time.
							</p>
						</div>
						<div className="flex items-center gap-3 flex-shrink-0">
							<button
								onClick={() => setShowPrefs(true)}
								className="text-xs font-mono text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors underline underline-offset-2"
							>
								Manage Preferences
							</button>
							<button
								id="cookie-accept-all"
								onClick={acceptAll}
								className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[var(--text)] text-[var(--bg)] text-xs font-medium hover:opacity-80 transition-opacity"
							>
								Accept All <ChevronRight size={12} />
							</button>
							<button
								onClick={() => setDismissed(true)}
								aria-label="Dismiss cookie notice"
								className="p-1.5 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
							>
								<X size={16} />
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

function CookiePreferencesModal({ onClose }: { onClose: () => void }) {
	const { analyticsEnabled, setAnalytics } = useConsent()
	const [localAnalytics, setLocalAnalytics] = useState(analyticsEnabled)

	const handleSave = () => {
		setAnalytics(localAnalytics)
		onClose()
	}

	return (
		<div
			role="dialog"
			aria-label="Cookie Preferences"
			aria-modal="true"
			className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 sm:p-6"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Panel */}
			<div className="relative w-full max-w-lg bg-[var(--bg)] border border-[var(--border)] shadow-2xl">
				<div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
					<div>
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1">
							Privacy
						</p>
						<h2 className="text-lg font-bold text-[var(--text)]">Cookie Preferences</h2>
					</div>
					<button
						onClick={onClose}
						aria-label="Close"
						className="p-1.5 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				<div className="p-6 space-y-5">
					{/* Essential */}
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<p className="text-sm font-bold text-[var(--text)] mb-1">Essential</p>
							<p className="text-xs text-[var(--text-muted)] leading-relaxed">
								Cloudflare Web Analytics — no cookies, no personal data. Always active for site performance.
							</p>
						</div>
						<div className="flex-shrink-0">
							<span className="inline-block px-2 py-1 text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-subtle)]">
								Always on
							</span>
						</div>
					</div>

					<div className="border-t border-[var(--border)]" />

					{/* Analytics */}
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<p className="text-sm font-bold text-[var(--text)] mb-1">Analytics</p>
							<p className="text-xs text-[var(--text-muted)] leading-relaxed">
								Google Analytics 4 — tracks page views and interactions using cookies (<code className="font-mono">_ga</code>, <code className="font-mono">_ga_*</code>). No personal data is shared.
							</p>
						</div>
						<div className="flex-shrink-0">
							<button
								role="switch"
								aria-checked={localAnalytics}
								id="analytics-toggle"
								onClick={() => setLocalAnalytics(!localAnalytics)}
								className={`relative w-10 h-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)] ${localAnalytics ? 'bg-[var(--brand)]' : 'bg-[var(--border)]'
									}`}
							>
								<span
									className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white transition-transform ${localAnalytics ? 'translate-x-5' : 'translate-x-0'
										}`}
								/>
							</button>
						</div>
					</div>
				</div>

				<div className="p-6 border-t border-[var(--border)] flex items-center justify-end gap-3">
					<button
						onClick={onClose}
						className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
					>
						Cancel
					</button>
					<button
						id="cookie-save-prefs"
						onClick={handleSave}
						className="px-6 py-2.5 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity"
					>
						Save Preferences
					</button>
				</div>
			</div>
		</div>
	)
}
