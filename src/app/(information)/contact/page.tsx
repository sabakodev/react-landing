import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
// import dynamic from 'next/dynamic'
import OfficeMap from '@/components/contact/OfficeMap'
import { Suspense } from 'react'

// Dynamically import the map to avoid SSR
// const OfficeMap = dynamic(
// 	() => import('@/components/contact/OfficeMap').then((m) => m.OfficeMap),
// 	{
// 		ssr: false,
// 		loading: () => (
// 			<div className="w-full h-[400px] border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-center">
// 				<p className="text-xs font-mono text-[var(--text-subtle)]">Loading map…</p>
// 			</div>
// 		),
// 	},
// )

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
	{
		label: 'WhatsApp',
		items: [
			{ name: 'Reyhan Fabiano', value: '+62 857-6061-6555', href: 'https://wa.me/6285760616555' },
			{ name: 'Armiko Sandi MD', value: '+62 838-5475-2571', href: 'https://wa.me/6283854752571' },
			{ name: 'Lian Roma', value: '+62 821-1200-8949', href: 'https://wa.me/6282112008949' },
		],
		icon: Phone,
	},
	{
		label: 'Email',
		items: [
			{ name: 'Sales & Inquiries', value: 'sales@sabako.id', href: 'mailto:sales@sabako.id' },
		],
		icon: Mail,
	},
]

export default function ContactPage() {
	const jargonSet = [
		"Let's talk about your next project.",
		"Let's talk about your idea.",
		"Ready to start your next project?",
	]

	const jargon = jargonSet[Math.floor(Math.random() * jargonSet.length)]

	return (
		<article>
			{/* Page header */}
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Contact
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						{jargon}
					</h1>
				</div>
			</header>

			{/* Form + Contact details */}
			<div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

					{/* Contact details */}
					<section aria-labelledby="contact-details-heading">
						<h2 id="contact-details-heading" className="text-xl font-bold text-[var(--text)] mb-8">
							Reach Us Directly
						</h2>

						<div className="space-y-10">
							{contacts.map((group) => {
								const Icon = group.icon
								return (
									<div key={group.label}>
										<div className="flex items-center gap-2 mb-4">
											<div className="p-1.5 border border-[var(--border)] text-[var(--brand)]">
												<Icon size={14} />
											</div>
											<h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
												{group.label}
											</h3>
										</div>
										<div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
											{group.items.map((item) => (
												<a
													key={item.href}
													href={item.href}
													target={group.label === 'WhatsApp' ? '_blank' : undefined}
													rel={group.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
													className="flex items-center justify-between py-4 group hover:bg-[var(--bg-subtle)] px-2 -mx-2 transition-colors"
												>
													<span>
														<span className="block text-xs text-[var(--text-subtle)]">{item.name}</span>
														<span className="block text-sm font-medium text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mt-0.5">
															{item.value}
														</span>
													</span>
													<ArrowRight
														size={14}
														className="text-[var(--text-subtle)] group-hover:text-[var(--brand)] group-hover:translate-x-1 transition-all"
													/>
												</a>
											))}
										</div>
									</div>
								)
							})}
						</div>

						{/* Office info */}
						<div className="mt-10 pt-10 border-t border-[var(--border)]">
							<div className="space-y-4">
								<div className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
									<MapPin size={16} className="mt-0.5 text-[var(--brand)] flex-shrink-0" />
									<div className="space-y-1">
										<p>Unit 1C, Jl. Bangka Raya No. 48</p>
										<p>Mampang Prapatan 12720</p>
										<p>Jakarta Selatan, Indonesia</p>
									</div>
								</div>
								<div className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
									<Clock size={16} className="mt-0.5 text-[var(--brand)] flex-shrink-0" />
									<div className="space-y-1">
										<p><span className="text-[var(--text-subtle)]">Mon – Fri&nbsp;&nbsp;</span>08:30 – 19:00 WIB</p>
										<p><span className="text-[var(--text-subtle)]">Saturday&nbsp;&nbsp;&nbsp;</span>10:00 – 14:00 WIB</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Inquiry form */}
					<section aria-labelledby="inquiry-form-heading">
						<h2 id="inquiry-form-heading" className="text-xl font-bold text-[var(--text)] mb-8">
							Send an Inquiry
						</h2>
						<form
							action="mailto:sales@sabako.id"
							method="get"
							encType="text/plain"
							className="space-y-5"
							aria-label="Contact inquiry form"
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<label
										htmlFor="contact-name"
										className="block text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2"
									>
										Full Name
									</label>
									<input
										id="contact-name"
										name="name"
										type="text"
										required
										placeholder="Your name"
										className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-4 py-3 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
									/>
								</div>
								<div>
									<label
										htmlFor="contact-email"
										className="block text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2"
									>
										Email
									</label>
									<input
										id="contact-email"
										name="email"
										type="email"
										required
										placeholder="you@company.com"
										className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-4 py-3 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="contact-service"
									className="block text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2"
								>
									Service Interested In
								</label>
								<select
									id="contact-service"
									name="service"
									className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--brand)] transition-colors appearance-none cursor-pointer"
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
									htmlFor="contact-message"
									className="block text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2"
								>
									Message
								</label>
								<textarea
									id="contact-message"
									name="body"
									rows={5}
									required
									placeholder="Tell us about your project…"
									className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-4 py-3 text-sm placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--brand)] transition-colors resize-none"
								/>
							</div>

							<button
								id="contact-submit-btn"
								type="submit"
								className="w-full py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity flex items-center justify-center gap-2 group"
							>
								Send Message
								<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
							</button>
						</form>
					</section>
				</div>
			</div>

			{/* Office map — full width */}
			<section aria-label="Office location map" className="border-t border-[var(--border)]">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12 pb-4">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-2">Find Us</p>
					<h2 className="text-xl font-bold text-[var(--text)] mb-4">Our Office</h2>
					<p className="text-xs text-[var(--text-subtle)] font-mono">
						Map data &copy; OpenStreetMap contributors
					</p>
				</div>
				<Suspense fallback={
					<div className="w-full h-[400px] border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-center">
						<p className="text-xs font-mono text-[var(--text-subtle)]">Loading map…</p>
					</div>
				}>
					<OfficeMap />
				</Suspense>
			</section>
		</article>
	)
}
