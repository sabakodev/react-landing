import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import OfficeMap from '@/components/contact/OfficeMap'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Contact',
	description:
		'Get in touch with SABAKO for business inquiries, project consultations, or partnerships. Reach us via WhatsApp, email, or visit our Jakarta office.',
	alternates: { canonical: 'https://sabako.id/contact' },
	openGraph: {
		title: 'Contact SABAKO',
		description: 'Start a project or inquiry — reach our team directly.',
	},
}

const contacts = [
	{ label: 'WhatsApp', value: '+62 857-6061-6555', href: 'https://wa.me/6285760616555', icon: Phone },
	// { label: 'Armiko Sandi', value: '+62 838-5475-2571', href: 'https://wa.me/6283854752571', icon: Phone },
	// { label: 'Lian Roma', value: '+62 821-1200-8949', href: 'https://wa.me/6282112008949', icon: Phone },
	{ label: 'Email', value: 'sales@sabako.id', href: 'mailto:sales@sabako.id', icon: Mail },
]

export default function ContactPage() {
	return (
		<main className="min-h-screen">
			{/* Full-viewport two-column layout */}
			<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

				{/* RIGHT — Form (DOM first so it tab-focuses before details on mobile) */}
				<section
					className="order-first lg:order-last flex items-start lg:items-center justify-center px-8 lg:px-16 pt-32 pb-12 lg:py-24 bg-[var(--bg)]"
					aria-labelledby="inquiry-form-heading"
				>
					<div className="w-full max-w-md">
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-2">
							Start a Project
						</p>
						<h1 id="inquiry-form-heading" className="text-3xl font-bold text-[var(--text)] mb-8 leading-snug">
							Let&apos;s build something.
						</h1>

						<form
							action="mailto:sales@sabako.id"
							method="get"
							encType="text/plain"
							className="space-y-4"
							aria-label="Contact inquiry form"
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
										placeholder="Your name"
										className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
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
										placeholder="you@company.com"
										className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
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
									className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors appearance-none cursor-pointer"
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
									name="company-size"
									className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors appearance-none cursor-pointer"
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
								<label
									htmlFor="contact-message"
									className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-1.5"
								>
									Message
								</label>
								<textarea
									id="contact-message"
									name="body"
									rows={4}
									required
									placeholder="Tell us about your idea…"
									className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-3 py-2.5 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors resize-none"
								/>
							</div>

							<button
								id="contact-submit-btn"
								type="submit"
								className="w-full py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity flex items-center justify-center gap-2 group"
							>
								Send Message
								<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
							</button>
						</form>
					</div>
				</section>

				{/* LEFT — Contact info + embedded map */}
				<section
					className="order-last lg:order-first flex flex-col border-t lg:border-t-0 lg:border-r border-[var(--border)] bg-[var(--bg-subtle)]"
					aria-label="Contact information"
				>
					{/* Info panel */}
					<div className="px-8 lg:px-12 pt-10 lg:pt-32 pb-8 space-y-6">
						{/* Contacts */}
						<div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
							{contacts.map((c) => {
								const Icon = c.icon
								return (
									<a
										key={c.href}
										href={c.href}
										target={c.icon === Phone ? '_blank' : undefined}
										rel={c.icon === Phone ? 'noopener noreferrer' : undefined}
										className="flex items-center justify-between py-3 group hover:bg-[var(--bg)] transition-colors px-3 -mx-3"
									>
										<span className="flex items-center gap-2.5">
											<Icon size={13} className="text-[var(--brand)] flex-shrink-0" />
											<span>
												<span className="block text-[10px] font-mono text-[var(--text-subtle)]">{c.label}</span>
												<span className="block text-sm text-[var(--text)] group-hover:text-[var(--brand)] transition-colors">
													{c.value}
												</span>
											</span>
										</span>
										<ArrowRight size={12} className="text-[var(--text-subtle)] group-hover:translate-x-1 group-hover:text-[var(--brand)] transition-all" />
									</a>
								)
							})}
						</div>

						{/* Address + hours */}
						<div className="space-y-3 text-sm text-[var(--text-muted)]">
							<div className="flex items-start gap-2.5">
								<MapPin size={13} className="mt-0.5 text-[var(--brand)] flex-shrink-0" />
								<div className="space-y-0.5 text-xs leading-relaxed">
									<p>Unit 1C, Jl. Bangka Raya No. 48</p>
									<p>Mampang Prapatan 12720</p>
									<p>Jakarta Selatan, Indonesia</p>
								</div>
							</div>
							<div className="flex items-start gap-2.5">
								<Clock size={13} className="mt-0.5 text-[var(--brand)] flex-shrink-0" />
								<div className="text-xs space-y-0.5">
									<p><span className="text-[var(--text-subtle)] mr-0.5">Mon – Fri</span>  08:30 – 19:00 WIB</p>
									<p><span className="text-[var(--text-subtle)] mr-0.5">Saturday</span>  10:00 – 14:00 WIB</p>
								</div>
							</div>
						</div>
					</div>

					{/* Map — fills remaining height */}
					<div className="flex-1 min-h-[240px] relative border-t border-[var(--border)]">
						<OfficeMap />
						<p className="absolute bottom-2 right-3 text-[10px] font-mono text-[var(--text-subtle)] bg-[var(--bg)]/80 px-1.5 py-0.5 z-[1000]">
							© OpenStreetMap contributors
						</p>
					</div>
				</section>

			</div>
		</main>
	)
}
