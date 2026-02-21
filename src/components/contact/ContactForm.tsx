'use client'

import { useState, useRef } from 'react'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useJargon } from '@/lib/analytics/useJargon'
import { trackEvent } from '@/lib/analytics/trackEvent'
import { useConsent } from '@/lib/consent'
import { useSearchParams } from 'next/navigation'

const JARGON_SET = [
	"Let's talk about your next project.",
	"Let's talk about your idea.",
	"Ready to start your next project?",
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
	const [formState, setFormState] = useState<FormState>('idle')
	const [errorMsg, setErrorMsg] = useState('')
	const formRef = useRef<HTMLFormElement>(null)
	const searchParams = useSearchParams()

	const preferredService = searchParams.get('service') || ''
	const preferredPackage = searchParams.get('tier') || ''

	const { onCtaClick } = useJargon({
		set: JARGON_SET,
		setId: 'contact-form-submit',
		section: 'contact-page',
	})
	const { analyticsEnabled } = useConsent()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setFormState('loading')
		setErrorMsg('')

		const data = new FormData(e.currentTarget)
		const payload = {
			name: data.get('name') as string,
			email: data.get('email') as string,
			service: data.get('service') as string,
			companySize: data.get('companySize') as string,
			preference: data.get('preference') as string,
			message: data.get('message') as string,
		}

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			const json = await res.json() as { success?: boolean; error?: string }

			if (!res.ok) {
				setErrorMsg(json.error ?? 'Something went wrong. Please try again.')
				setFormState('error')
				return
			}

			// Track successful submission
			onCtaClick()
			trackEvent(
				'contact_form_submit',
				{
					service: payload.service || 'unspecified',
					tier: preferredPackage || 'unspecified',
					timestamp: new Date().toISOString(),
				},
				analyticsEnabled,
			)
			setFormState('success')
			formRef.current?.reset()
		} catch {
			setErrorMsg('Network error. Please check your connection and try again.')
			setFormState('error')
		}
	}

	if (formState === 'success') {
		return (
			<div className="flex flex-col items-start gap-4 py-8">
				<div className="p-3 bg-green-50 border border-green-200 text-green-700">
					<CheckCircle size={24} />
				</div>
				<div>
					<p className="text-base font-bold text-[var(--text)] mb-1">Message received!</p>
					<p className="text-sm text-[var(--text-muted)] leading-relaxed">
						We&apos;ll get back to you within one business day.
					</p>
				</div>
				<button
					onClick={() => setFormState('idle')}
					className="text-xs font-mono text-[var(--brand)] underline underline-offset-2 hover:no-underline transition-all"
				>
					Send another message
				</button>
			</div>
		)
	}

	const isLoading = formState === 'loading'

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className="space-y-4"
			aria-label="Contact inquiry form"
			noValidate
		>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="contact-name"
						className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1.5"
					>
						Full Name
					</label>
					<input
						id="contact-name"
						name="name"
						type="text"
						required
						disabled={isLoading}
						placeholder="Your name"
						className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors disabled:opacity-50"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-email"
						className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1.5"
					>
						Email
					</label>
					<input
						id="contact-email"
						name="email"
						type="email"
						required
						disabled={isLoading}
						placeholder="you@company.com"
						className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors disabled:opacity-50"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="contact-service"
					className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1.5"
				>
					Service
				</label>
				<select
					id="contact-service"
					name="service"
					disabled={isLoading}
					defaultValue={preferredService}
					className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors appearance-none cursor-pointer disabled:opacity-50"
				>
					<option value="">Select a service…</option>
					<option value="web">Digital Experiences (Web)</option>
					<option value="mobile">Mobile Products (App)</option>
					<option value="iot">Connected Systems (IoT)</option>
					<option value="consulting">Consulting</option>
					<option value="other">Other</option>
				</select>
			</div>

			<div>
				<label
					htmlFor="contact-size"
					className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1.5"
				>
					Company Size
				</label>
				<select
					id="contact-size"
					name="companySize"
					disabled={isLoading}
					className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors appearance-none cursor-pointer disabled:opacity-50"
				>
					<option value="">Select…</option>
					<option value="solo">Solo / Freelancer</option>
					<option value="small">Small Team (2–10)</option>
					<option value="startup">Startup (11–99)</option>
					<option value="mid">Mid-size (100–999)</option>
					<option value="enterprise">Enterprise (1,000+)</option>
				</select>
			</div>

			<div>
				<input type="hidden" name="package" value={preferredPackage ?? ''} />
			</div>

			<div>
				<label
					htmlFor="contact-message"
					className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1.5"
				>
					Message
				</label>
				<textarea
					id="contact-message"
					name="message"
					rows={4}
					required
					disabled={isLoading}
					placeholder="Tell us about your idea…"
					className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors resize-none disabled:opacity-50"
				/>
			</div>

			{formState === 'error' && (
				<div className="flex items-start gap-2 p-3 border border-red-200 bg-red-50 text-red-700 text-xs">
					<AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
					<span>{errorMsg}</span>
				</div>
			)}

			<button
				id="contact-submit-btn"
				type="submit"
				disabled={isLoading}
				className="w-full py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
			>
				{isLoading ? (
					<>
						<Loader2 size={15} className="animate-spin" />
						Sending…
					</>
				) : (
					<>
						Send Message
						<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
					</>
				)}
			</button>
		</form>
	)
}
