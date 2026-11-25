'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { LocaleSwitcher } from '@/components/global/LocaleSwitcher'
import type { ServiceSummary } from '@/lib/services'

const buildFooterLinks = (services: ServiceSummary[]) => ({
	Company: [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Work', href: '/work' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/contact' },
	],
	Services: services.map((service) => ({ label: service.navLabel, href: service.href })),
	Legal: [
		{ label: 'Bot Policy', href: '/bot' },
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms of Use', href: '/terms' },
	],
})

// Same profiles as `sameAs` in src/lib/seo/jsonld.ts. Lucide's brand icons are deprecated, so the
// glyphs are inlined here (paths copied from lucide's linkedin/instagram/facebook icons).
const socialLinks = [
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/company/sabako',
		icon: (
			<>
				<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
				<rect width="4" height="12" x="2" y="9" />
				<circle cx="4" cy="4" r="2" />
			</>
		),
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/sabako_digital/',
		icon: (
			<>
				<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
				<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
				<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
			</>
		),
	},
	{
		label: 'Facebook',
		href: 'https://www.facebook.com/sabako.dev',
		icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
	},
]

/** `serviceSummaries` comes from the server so the catalog never ships in client JS. */
export function Footer({ serviceSummaries }: { serviceSummaries: ServiceSummary[] }) {
	const track = useButtonTracking()
	const footerLinks = buildFooterLinks(serviceSummaries)

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
							IT Agency & Consulting — building Digital Experiences, Mobile Products, Connected Systems and Applied AI for businesses worldwide.
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
								href="https://wa.me/6285760616555"
								target="_blank"
								rel="noopener noreferrer"
								onClick={track('WhatsApp', 'footer-contact', { external: true, href: 'https://wa.me/6285760616555' })}
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
						<ul className="flex items-center gap-2" role="list">
							{socialLinks.map((social) => (
								<li key={social.label}>
									<TrackedLink
										href={social.href}
										label={social.label}
										section="footer-social"
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`SABAKO on ${social.label} (opens in a new tab)`}
										className="flex h-9 w-9 items-center justify-center border border-(--border) text-(--text-muted) hover:text-(--text) hover:border-(--border-strong) transition-colors"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											{social.icon}
										</svg>
									</TrackedLink>
								</li>
							))}
						</ul>
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
					<LocaleSwitcher section="footer-language" />
					<p className="text-xs text-(--text-subtle)">
						PT. SABAKO KREATIV DIGITAL is registered entity in Indonesia.
					</p>
				</div>
			</div>
		</footer>
	)
}
