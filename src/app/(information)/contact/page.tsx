import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import OfficeMap from '@/components/contact/OfficeMap'
import { Suspense } from 'react'
import ContactForm from '@/components/contact/ContactForm'

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
			<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

				{/* RIGHT — Form (DOM first for mobile tab order) */}
				<section
					className="order-first lg:order-last flex items-start lg:items-center justify-center px-8 lg:px-16 pt-32 pb-12 lg:py-24 bg-(--bg)"
					aria-labelledby="inquiry-form-heading"
				>
					<div className="w-full max-w-md">
						<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-2">
							Start a Project
						</p>
						<h1 id="inquiry-form-heading" className="text-3xl font-bold text-(--text) mb-8 leading-snug">
							Let&apos;s build something.
						</h1>
						<ContactForm />
					</div>
				</section>

				{/* LEFT — Contact info + embedded map */}
				<section
					className="order-last lg:order-first flex flex-col border-t lg:border-t-0 lg:border-r border-(--border) bg-(--bg-subtle)"
					aria-label="Contact information"
				>
					<div className="px-8 lg:px-12 pt-10 lg:pt-32 pb-8 space-y-6">
						<div>
							<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-1">SABAKO</p>
							<p className="text-sm text-(--text-muted) leading-relaxed">
								Jakarta-based IT agency specialising in web, mobile, and IoT solutions.
							</p>
						</div>

						<div className="divide-y divide-(--border) border-y border-(--border)">
							{contacts.map((c) => {
								const Icon = c.icon
								return (
									<a
										key={c.href}
										href={c.href}
										target={c.icon === Phone ? '_blank' : undefined}
										rel={c.icon === Phone ? 'noopener noreferrer' : undefined}
										className="flex items-center justify-between py-3 group hover:bg-(--bg) transition-colors px-3 -mx-3"
									>
										<span className="flex items-center gap-2.5">
											<Icon size={13} className="text-(--brand) shrink-0" />
											<span>
												<span className="block text-[10px] font-mono text-(--text-subtle)">{c.label}</span>
												<span className="block text-sm text-(--text) group-hover:text-(--brand) transition-colors">
													{c.value}
												</span>
											</span>
										</span>
										<ArrowRight size={12} className="text-(--text-subtle) group-hover:translate-x-1 group-hover:text-(--brand) transition-all" />
									</a>
								)
							})}
						</div>

						<div className="space-y-3 text-sm text-(--text-muted)">
							<div className="flex items-start gap-2.5">
								<MapPin size={13} className="mt-0.5 text-(--brand) shrink-0" />
								<div className="space-y-0.5 text-xs leading-relaxed">
									<p>Unit 1C, Jl. Bangka Raya No. 48</p>
									<p>Mampang Prapatan 12720</p>
									<p>Jakarta Selatan, Indonesia</p>
								</div>
							</div>
							<div className="flex items-start gap-2.5">
								<Clock size={13} className="mt-0.5 text-(--brand) shrink-0" />
								<div className="text-xs space-y-0.5">
									<p><span className="text-(--text-subtle) mr-0.5">Mon – Fri</span>  08:30 – 19:00 WIB</p>
									<p><span className="text-(--text-subtle) mr-0.5">Saturday</span>  10:00 – 14:00 WIB</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1 min-h-[240px] relative border-t border-(--border)">
						<OfficeMap />
						<p className="absolute bottom-2 right-3 text-[10px] font-mono text-(--text-subtle) bg-(--bg)/80 px-1.5 py-0.5 z-1000">
							© OpenStreetMap contributors
						</p>
					</div>
				</section>

			</div>
		</main>
	)
}
