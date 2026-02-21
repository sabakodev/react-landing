import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Shield, Users } from 'lucide-react'

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

			{/* ── HERO — full-bleed image with overlay headline ────────────────── */}
			<section className="relative h-[90svh] min-h-[560px] flex items-end overflow-hidden" aria-label="About hero">
				{/* Hero image */}
				<Image
					src="/images/about/hero.jpg"
					alt="SABAKO team at work in our Jakarta office"
					fill
					priority
					sizes="100vw"
					className="object-cover object-center"
				/>
				{/* Dark gradient overlay for legibility */}
				<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

				{/* Overlay text */}
				<div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 w-full">
					<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
						About SABAKO
					</p>
					<h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1.08] max-w-3xl">
						We digitize.<br />
						We empower.<br />
						<span className="text-(--brand)">We deliver.</span>
					</h1>
					<p className="mt-6 text-base lg:text-lg text-white/70 max-w-xl leading-relaxed">
						Helping traditional businesses step confidently into the digital era since 2018.
					</p>
				</div>
			</section>

			{/* ── ORIGIN STORY — text with pull quote ──────────────────────────── */}
			<section className="py-24 lg:py-32" aria-label="Our story">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
					<div>
						<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">Our Story</p>
						<h2 className="text-3xl lg:text-4xl font-bold text-(--text) mb-6 leading-tight">
							Born out of a conviction that technology should be a great equalizer.
						</h2>
						<div className="space-y-4 text-(--text-muted) leading-relaxed">
							<p>
								Founded in early 2018, SABAKO began with a simple conviction: that truly great software requires more than technical ability — it demands deep empathy for the people who use it and the businesses that depend on it.
							</p>
							<p>
								Even as a young company, our team brought more than a decade of collective experience from day one. Our focus has always been on software design and architecture rather than surface aesthetics — investing time in quality setup, lean development practices, and maintainable codebases.
							</p>
							<p>
								Today we serve clients across government, logistics, commercial real estate, and technology sectors — building web applications, mobile products, and IoT-connected systems that scale.
							</p>
						</div>
					</div>
					<div className="space-y-6">
						<blockquote className="border-l-4 border-(--brand) pl-6">
							<p className="text-xl lg:text-2xl font-medium text-(--text) leading-snug">
								&ldquo;Unleash ideas just as you imagined.&rdquo;
							</p>
						</blockquote>
						<p className="text-(--text-muted) leading-relaxed">
							We turn our clients&apos; visions into reality — not approximately, not &ldquo;good enough&rdquo;,
							but precisely the product they set out to build. That fidelity is what keeps our clients
							coming back.
						</p>
						<div className="grid grid-cols-3 gap-4 pt-4">
							{[['2018', 'Founded'], ['7+', 'Years active'], ['3', 'Disciplines']].map(([num, label]) => (
								<div key={label} className="border-t-2 border-(--brand) pt-4">
									<p className="text-2xl font-bold text-(--text)">{num}</p>
									<p className="text-xs font-mono text-(--text-subtle) mt-0.5">{label}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── FULL-BLEED IMAGE DIVIDER 1 ───────────────────────────────────── */}
			<div className="relative h-[50vh] min-h-[320px] overflow-hidden">
				<Image
					src="/images/about/IMG_0009.JPEG"
					alt="SABAKO birthplace — North Jakarta"
					fill
					sizes="100vw"
					className="object-cover object-center"
				/>
				<div className="absolute inset-0 bg-black/30" />
				<div className="absolute bottom-6 left-8 lg:left-16">
					<p className="text-xs font-mono text-white/60 uppercase tracking-widest">North Jakarta, Indonesia</p>
				</div>
			</div>

			{/* ── WHAT WE DO — alternating text + image ────────────────────────── */}
			<section className="py-24 lg:py-32 border-b border-(--border)" aria-label="What we do">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">

					{/* Row 1: text left, image right */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
						<div>
							<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">2018</p>
							<h2 className="text-2xl lg:text-3xl font-bold text-(--text) mb-5 leading-tight">
								The Beginning.
							</h2>
							<p className="text-(--text-muted) leading-relaxed">
								SABAKO was founded on the principle of fulfilling market needs. The era of digital transformation, and many businesses were beginning to look for partners to help them build websites and company profiles.
							</p>
						</div>
						<div className="relative aspect-4/3 overflow-hidden">
							<Image
								src="/images/about/DSCF9436.jpg"
								alt="Web application development at SABAKO"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover object-center"
							/>
						</div>
					</div>

					{/* Row 2: image left, text right */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
						<div className="relative aspect-4/3 overflow-hidden lg:order-first order-last">
							<Image
								src="/images/about/IMG-20200718-WA0017.jpg"
								alt="Filming a person"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover object-center"
							/>
						</div>
						<div>
							<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">2020</p>
							<h2 className="text-2xl lg:text-3xl font-bold text-(--text) mb-5 leading-tight">
								Pandemic Effect.
							</h2>
							<p className="text-(--text-muted) leading-relaxed">
								The economic bubble burst, and physical businesses could not operate; as a result, the digital transformation grew even more massive, and we began shifting the focus not only to websites but also to mobile apps, which were in greater demand than ever before.
							</p>
						</div>
					</div>

					{/* Row 3: text left, image right */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
						<div>
							<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">2023</p>
							<h2 className="text-2xl lg:text-3xl font-bold text-(--text) mb-5 leading-tight">
								And Beyond.
							</h2>
							<p className="text-(--text-muted) leading-relaxed">
								We slowly organise our business by forming a legal entity, which lets us work with big corporations and governments. Iterating on our process, we are now able to deliver products that are not only functional but also scalable and maintainable.
							</p>
						</div>
						<div className="relative aspect-4/3 overflow-hidden">
							<Image
								src="/images/about/IMG_20240104_131752.jpg"
								alt="Meeting area"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover object-center"
							/>
						</div>
					</div>

				</div>
			</section>

			{/* ── VALUES GRID ───────────────────────────────────────────────────── */}
			<section className="py-24 bg-(--bg-subtle) border-b border-(--border)" aria-labelledby="values-heading">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">Our principles</p>
					<h2 id="values-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-14">
						What we stand for
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-(--border)">
						{values.map((value) => {
							const Icon = value.icon
							return (
								<div key={value.title} className="bg-(--bg-subtle) p-8">
									<div className="p-2 border border-(--border) text-(--brand) bg-(--bg) w-fit mb-5">
										<Icon size={18} />
									</div>
									<h3 className="text-base font-bold text-(--text) mb-2">{value.title}</h3>
									<p className="text-sm text-(--text-muted) leading-relaxed">{value.description}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* ── FULL-BLEED IMAGE DIVIDER 2 — culture ─────────────────────────── */}
			<div className="relative h-[60vh] min-h-[360px] overflow-hidden">
				<Image
					src="/images/about/team-culture.jpg"
					alt="SABAKO team — culture and collaboration"
					fill
					sizes="100vw"
					className="object-cover object-top"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/20" />
				<div className="absolute inset-0 flex items-center">
					<div className="max-w-7xl mx-auto px-6 lg:px-8">
						<p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-4">Our culture</p>
						<p className="text-2xl lg:text-4xl font-bold text-white max-w-lg leading-tight">
							Small team.<br />Big ambitions.<br />Zero bureaucracy.
						</p>
					</div>
				</div>
			</div>

			{/* ── TEAM ─────────────────────────────────────────────────────────── */}
			{/* <TeamSection /> */}

			{/* ── CTA ──────────────────────────────────────────────────────────── */}
			<section className="py-24" aria-label="Contact call to action">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<p className="text-2xl font-bold text-(--text) max-w-sm">
						Interested in working with us?
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Get in Touch
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>

		</article>
	)
}

export function TeamSection() {
	return (
		<section className="py-24 border-b border-(--border)" aria-labelledby="team-heading">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">People</p>
				<h2 id="team-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-14">
					The team
				</h2>

				{/* Photo grid */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-(--border) mb-px">
					{team.map((member, i) => (
						<div key={member.name} className="relative bg-(--bg) overflow-hidden group">
							<div className="relative aspect-3/4 overflow-hidden bg-(--bg-subtle)">
								<Image
									src={`/images/about/team-${i + 1}.jpg`}
									alt={member.name}
									fill
									sizes="(max-width: 640px) 100vw, 33vw"
									className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
								/>
							</div>
							<a
								href={member.contact}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between p-5 hover:bg-(--bg-subtle) transition-colors group/link"
							>
								<div>
									<p className="text-sm font-medium text-(--text)">{member.name}</p>
									<p className="text-xs text-(--text-muted) mt-0.5">{member.role}</p>
								</div>
								<ArrowRight size={14} className="text-(--text-subtle) group-hover/link:translate-x-1 group-hover/link:text-(--brand) transition-all" />
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}