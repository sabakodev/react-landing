import type { Metadata } from 'next'
import { MapPin, Clock, Shield, Users } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'About',
	description:
		'Learn about SABAKO — our story, mission, values, and the team behind our digital products. Established in 2018, based in Jakarta.',
	alternates: { canonical: 'https://sabako.id/about' },
	openGraph: {
		title: 'About SABAKO — IT Agency & Consulting',
		description: 'Our story, mission, and team. Based in Jakarta since 2018.',
	},
}

const values = [
	{
		icon: Users,
		title: 'People First',
		description: 'Every decision we make starts with the user. Great experiences are never an afterthought.',
	},
	{
		icon: Shield,
		title: 'Privacy & Security',
		description: 'Having worked with government agencies, we apply rigorous data protection standards across every project.',
	},
	{
		icon: Clock,
		title: 'Quality Over Speed',
		description: 'We invest in lean, maintainable architecture that compounds in value over time.',
	},
	{
		icon: MapPin,
		title: 'Rooted in Jakarta',
		description: 'Proudly built and operated from Jakarta — serving clients across Indonesia and beyond.',
	},
]

const team = [
	{ name: 'Reyhan Fabiano', role: 'Business Director', contact: 'https://wa.me/62859106681052' },
	{ name: 'Api Rahman', role: 'Technical Director', contact: 'https://wa.me/6283854752571' },
	{ name: 'Lian Roma', role: 'Marketing Director', contact: 'https://wa.me/6282112008949' },
]

export default function AboutPage() {
	return (
		<article>
			{/* Page header */}
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						About
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						We digitize. We empower. We deliver.
					</h1>
					<p className="mt-6 text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
						Passionate about helping traditional businesses step confidently into the digital era — building exactly what you envision.
					</p>
				</div>
			</header>

			{/* Story */}
			<section className="py-20 border-b border-[var(--border)]" aria-label="Our story">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					<div>
						<h2 className="text-2xl font-bold text-[var(--text)] mb-6">Our Story</h2>
						<div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
							<p>
								Founded in 2018, SABAKO was born from a conviction that technology should be a great equalizer — giving every business, regardless of size, access to world-class digital products. We started with a focus on quality over speed, building lean, maintainable systems that compound in value over time.
							</p>
							<p>
								Today we serve clients across government, logistics, commercial real estate, and technology sectors — transforming how they operate through web applications, mobile products, and IoT platforms.
							</p>
						</div>
					</div>
					<div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
						<div>
							<h2 className="text-2xl font-bold text-[var(--text)] mb-4">Our Vision</h2>
							<p>
								We are passionate about digitizing traditional businesses with better, modern solutions — helping them transition confidently into the digital era. We believe every organization deserves software that works as hard as the people who rely on it.
							</p>
						</div>
						<div>
							<h2 className="text-2xl font-bold text-[var(--text)] mb-4">Our Promise</h2>
							<p className="border-l-2 border-[var(--brand)] pl-4 text-[var(--text)] font-medium">
								&ldquo;Unleash ideas just as you imagined.&rdquo;
							</p>
							<p className="mt-4">
								We turn our clients&apos; visions into reality — exactly as they envision it. Not approximately, not &ldquo;good enough&rdquo;, but precisely the product they set out to build. That fidelity is what keeps our clients coming back.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]" aria-labelledby="values-heading">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<h2 id="values-heading" className="text-2xl font-bold text-[var(--text)] mb-12">
						What we stand for
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
						{values.map((value) => {
							const Icon = value.icon
							return (
								<div key={value.title} className="bg-[var(--bg-subtle)] p-8">
									<div className="p-2 border border-[var(--border)] text-[var(--brand)] bg-[var(--bg)] w-fit mb-5">
										<Icon size={18} />
									</div>
									<h3 className="text-base font-bold text-[var(--text)] mb-2">{value.title}</h3>
									<p className="text-sm text-[var(--text-muted)] leading-relaxed">{value.description}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* Team */}
			<section className="py-20 border-b border-[var(--border)]" aria-labelledby="team-heading">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<h2 id="team-heading" className="text-2xl font-bold text-[var(--text)] mb-12">
						The team
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)]">
						{team.map((member) => (
							<a
								key={member.name}
								href={member.contact}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-[var(--bg)] p-8 flex flex-col gap-3 group hover:bg-[var(--bg-subtle)] transition-colors"
							>
								{/* Avatar placeholder */}
								<div className="w-12 h-12 border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-center text-lg font-bold text-[var(--brand)] font-mono">
									{member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
								</div>
								<div>
									<p className="text-base font-medium text-[var(--text)] group-hover:text-[var(--brand)] transition-colors">
										{member.name}
									</p>
									<p className="text-sm text-[var(--text-muted)] mt-0.5">{member.role}</p>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20" aria-label="Contact call to action">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<p className="text-2xl font-bold text-[var(--text)] max-w-sm">
						Interested in working with us?
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Get in Touch
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}
