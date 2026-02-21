'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'

const footerLinks = {
	Company: [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Work', href: '/work' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/contact' },
	],
	Services: [
		{ label: 'Digital Experiences', href: '/services/web' },
		{ label: 'Mobile Products', href: '/services/mobile' },
		{ label: 'Connected Systems', href: '/services/iot' },
	],
	Legal: [
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms of Use', href: '/terms' },
	],
}

export function Footer() {
	const track = useButtonTracking()

	return (
		<footer className="border-t border-(--border) bg-(--bg-subtle)" aria-label="Site footer">
			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
					{/* Brand */}
					<div className="lg:col-span-2 space-y-6">
						<Link
							href="/"
							className="flex items-center gap-2.5 group w-fit"
							onClick={track('SABAKO Logo', 'footer')}
						>
							<Image
								src="/sabako-light.svg"
								alt="SABAKO logo"
								width={28}
								height={28}
								className="h-7 w-7 hidden dark:block"
							/>
							<Image
								src="/sabako-dark.svg"
								alt="SABAKO logo"
								width={28}
								height={28}
								className="h-7 w-7 dark:hidden"
							/>
							<span className="text-base font-bold font-mono text-(--text) group-hover:text-(--brand) transition-colors">
								SABAKO
							</span>
						</Link>
						<p className="text-sm text-(--text-muted) leading-relaxed max-w-xs">
							IT Agency & Consulting — building Digital Experiences, Mobile Products, and Connected Systems for businesses worldwide.
						</p>
						<p className="text-sm font-mono font-semibold text-(--brand)">
							&ldquo;Beyond the Horizon&rdquo;
						</p>
						<div className="space-y-2 text-sm text-(--text-muted)">
							<a
								href="mailto:sales@sabako.id"
								onClick={track('Email us', 'footer-contact', { external: true, href: 'mailto:sales@sabako.id' })}
								className="flex items-center gap-2 hover:text-(--text) transition-colors hover-underline w-fit"
							>
								<Mail size={14} />
								sales@sabako.id
							</a>
							<a
								href="https://wa.me/62859106681052"
								target="_blank"
								rel="noopener noreferrer"
								onClick={track('WhatsApp', 'footer-contact', { external: true, href: 'https://wa.me/62859106681052' })}
								className="flex items-center gap-2 hover:text-(--text) transition-colors hover-underline w-fit"
							>
								<Phone size={14} />
								+62 857-6061-6555
							</a>
							<span className="flex items-start gap-2">
								<MapPin size={14} className="mt-0.5 shrink-0" />
								<span>
									<span className="block">Jl. Bangka Raya No. 48, Mampang Prapatan 12720</span>
									<span className="block">Jakarta Selatan, Indonesia</span>
								</span>
							</span>
						</div>
					</div>

					{/* Links */}
					{Object.entries(footerLinks).map(([title, links]) => (
						<div key={title}>
							<h3 className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-4">
								{title}
							</h3>
							<ul className="space-y-2.5" role="list">
								{links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											onClick={track(link.label, `footer-${title.toLowerCase()}`)}
											className="text-sm text-(--text-muted) hover:text-(--text) transition-colors hover-underline"
										>
											{link.label}
										</Link>
									</li>
								))}
								{/* Cookie Settings — only in the Legal column */}
								{title === 'Legal' && (
									<li>
										<button
											onClick={() => {
												track('Cookie Settings', 'footer-legal')()
												window.dispatchEvent(new CustomEvent('cookie-settings-open'))
											}}
											className="text-sm text-(--text-muted) hover:text-(--text) transition-colors hover-underline text-left"
										>
											Cookie Settings
										</button>
									</li>
								)}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom bar */}
				<div className="mt-16 pt-6 border-t border-(--border) flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-xs text-(--text-subtle) font-mono">
						&copy; 2018 - {new Date().getFullYear()} All rights reserved.
					</p>
					<p className="text-xs text-(--text-subtle)">
						PT. SABAKO KREATIV DIGITAL is registered entity in Indonesia.
					</p>
				</div>
			</div>
		</footer>
	)
}