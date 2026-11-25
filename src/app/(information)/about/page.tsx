import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import Image from 'next/image'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { ClientLogoStrip } from '@/components/work/ClientLogoStrip'
import { Leadership } from '@/components/about/Leadership'
import { Reveal } from '@/components/ui/Reveal'
import { serviceSummaries } from '@/lib/services'
import { ArrowRight, MapPin, Clock, Shield, Users } from 'lucide-react'

export const metadata: Metadata = pageMetadata({
	// absolute: the title already names the brand, so the "| SABAKO" template is skipped
	title: { absolute: 'About SABAKO — Software Engineering Partner in Jakarta, Serving SEA' },
	description:
		'SABAKO is a software engineering partner based in Jakarta since 2018, building web platforms, mobile apps, IoT and AI for businesses across Southeast Asia.',
	path: '/about',
})

const FOUNDED = 2018

const values = [
	{
		icon: Users,
		title: 'People First',
		description: 'Every decision starts with the people who will use what we build. Their experience is never an afterthought.',
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
		description: 'Registered in North Jakarta. Working from Ruang48, South Jakarta. Serving clients across Southeast Asia.',
	},
]

const timeline = [
	{
		year: '2018',
		title: 'The Beginning.',
		body: 'SABAKO was founded to meet a clear need: businesses were starting their digital transformation and looking for a partner to build their first websites and company profiles.',
		image: { src: '/images/about/DSCF9436.jpg', alt: 'Web application development at SABAKO' },
	},
	{
		year: '2020',
		title: 'Pandemic Effect.',
		body: 'When physical operations stopped, going digital stopped being optional. Demand moved from websites to mobile apps, and so did we.',
		image: { src: '/images/about/IMG-20200718-WA0017.jpg', alt: 'Filming a person' },
	},
	{
		year: '2023',
		title: 'Built for Government.',
		body: 'We formed a legal entity so we could contract with large corporations and public institutions. The same year we took on our first AI product and built our crawler, both for government clients.',
		image: { src: '/images/about/IMG_20240104_131752.jpg', alt: 'Meeting area' },
	},
	{
		year: '2026',
		title: 'Products and Applied AI.',
		body: "Applied AI is now a published service line, and the search and crawling infrastructure we built runs as SABAKO's own products.",
		image: { src: '/images/about/workspace.jpg', alt: 'Aerial view of a highway interchange beside a reservoir' },
	},
]

export default function AboutPage() {
	const stats = [
		{ value: `${new Date().getFullYear() - FOUNDED}+`, label: 'Years' },
		{ value: String(serviceSummaries().length), label: 'Disciplines' },
		{ value: '100+', label: 'Projects delivered' },
		{ value: '20+', label: 'Enterprise clients' },
	]

	return (
		<article>

			{/* ── HERO — full-bleed image with overlay headline ────────────────── */}
			<section className="relative h-[90svh] min-h-[560px] flex items-end overflow-hidden" aria-label="About hero">
				<Image
					src="/images/about/hero.jpg"
					alt="Pebble beach and calm sea stretching to a distant mountain horizon"
					fill
					priority
					sizes="100vw"
					className="object-cover object-center"
				/>
				{/* Dark gradient overlay for legibility */}
				<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

				<div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 w-full">
					<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
						Beyond the Horizon
					</p>
					<h1 className="text-[clamp(2rem,4.5vw,3.75rem)] font-bold text-white leading-[1.08] max-w-4xl">
						We close the gap between how your business runs and what your systems can do.
					</h1>
					<p className="mt-6 text-base lg:text-lg text-white/70 max-w-2xl leading-relaxed">
						For enterprises still running on analog processes, and for those that digitized early and can&apos;t keep up.
						You focus on operations. We handle the digital side, in a way your people already understand.
					</p>
				</div>
			</section>

			{/* ── PROOF BAR — client logos + stats ─────────────────────────────── */}
			<ClientLogoStrip />
			<section className="border-y border-(--border) bg-(--bg-subtle)" aria-label="SABAKO in numbers">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-(--border)">
						{stats.map((stat, i) => (
							<div key={stat.label} className="bg-(--bg-subtle) px-6 py-10 flex flex-col-reverse">
								<dt className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mt-1">
									{stat.label}
								</dt>
								<dd className="text-4xl font-bold text-(--text) tabular-nums">
									<Reveal delay={i * 0.1}>{stat.value}</Reveal>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			{/* ── ORIGIN STORY — text with pull quote ──────────────────────────── */}
			<section className="py-24 lg:py-32 border-b border-(--border)" aria-labelledby="story-heading">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
					<div>
						<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">Our Story</p>
						<h2 id="story-heading" className="text-3xl lg:text-4xl font-bold text-(--text) mb-6 leading-tight">
							Technology should fit the business, not the other way round.
						</h2>
						<div className="space-y-4 text-(--text-muted) leading-relaxed">
							<p>
								SABAKO started in 2018 with a simple observation: most companies do not fail at technology because of the technology. They fail because the systems they are given do not match how their people actually work.
							</p>
							<p>
								We work with two kinds of enterprise. Some still run on paper, spreadsheets and phone calls, and need to move without breaking what works. Others digitized early, and now carry systems they can no longer maintain or extend. In both cases we close the gap, so the business keeps its attention on operations while we build and run the digital side.
							</p>
						</div>
					</div>
					<Reveal>
						<blockquote className="border-l-4 border-(--brand) pl-6">
							<p className="text-xl lg:text-2xl font-medium text-(--text) leading-snug">
								&ldquo;Unleash ideas just as you imagined.&rdquo;
							</p>
						</blockquote>
					</Reveal>
				</div>
			</section>

			{/* ── LEADERSHIP ───────────────────────────────────────────────────── */}
			<Leadership />

			{/* ── FULL-BLEED IMAGE DIVIDER ─────────────────────────────────────── */}
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
					<p className="text-xs font-mono text-white/60 uppercase tracking-widest">Where we started — North Jakarta</p>
				</div>
			</div>

			{/* ── TIMELINE — alternating text + image ──────────────────────────── */}
			<section className="py-24 lg:py-32 border-b border-(--border)" aria-label="Our timeline">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
					{timeline.map((entry, i) => {
						const imageFirst = i % 2 === 1
						return (
							<div key={entry.year} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
								<Reveal className={imageFirst ? 'lg:order-last' : undefined}>
									<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">{entry.year}</p>
									<h2 className="text-2xl lg:text-3xl font-bold text-(--text) mb-5 leading-tight">
										{entry.title}
									</h2>
									<p className="text-(--text-muted) leading-relaxed">{entry.body}</p>
								</Reveal>
								<div className="relative aspect-4/3 overflow-hidden">
									<Image
										src={entry.image.src}
										alt={entry.image.alt}
										fill
										sizes="(max-width: 1024px) 100vw, 50vw"
										className="object-cover object-center"
									/>
								</div>
							</div>
						)
					})}
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

			{/* ── FULL-BLEED IMAGE DIVIDER — culture ───────────────────────────── */}
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
					<div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
						<p className="text-xs font-mono uppercase tracking-widest text-white/60 mb-4">Our culture</p>
						<h2 className="text-2xl lg:text-4xl font-bold text-white max-w-lg leading-tight">
							Small team, big builds.
						</h2>
						<p className="mt-4 text-base lg:text-lg text-white/70 max-w-md leading-relaxed">
							You work directly with the people doing the work, so decisions take days and paperwork stays light.
						</p>
					</div>
				</div>
			</div>

			{/* ── CTA ──────────────────────────────────────────────────────────── */}
			<section className="py-24" aria-label="Contact call to action">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<p className="text-2xl font-bold text-(--text) max-w-sm">
						Interested in working with us?
					</p>
					<div className="flex flex-col sm:flex-row gap-3">
						<TrackedLink
							href="/contact"
							label="Start a Project"
							section="about-cta"
							className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
						>
							Start a Project
							<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</TrackedLink>
						<TrackedLink
							href="/contact?intent=meeting"
							label="Request a Meeting"
							section="about-cta"
							className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-(--border) text-(--text) text-sm font-medium hover:border-(--brand) hover:text-(--brand) transition-colors"
						>
							Request a Meeting
						</TrackedLink>
					</div>
				</div>
			</section>

		</article>
	)
}
