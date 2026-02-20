import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Digital Experiences — Web Development',
	description:
		'SABAKO builds high-performance websites, web applications, SaaS platforms, and e-commerce solutions. Corporate sites to complex enterprise systems.',
	alternates: { canonical: 'https://sabako.id/services/web' },
}

const capabilities = [
	'Corporate & Marketing Websites',
	'Web Application Development',
	'E-commerce & Marketplaces',
	'SaaS Platform Architecture',
	'API Design & Integration',
	'Performance Optimization',
	'Accessibility (WCAG 2.1)',
	'CMS Implementation',
	'SEO Friendly',
	'Cross-browser & Device Compatibility',
	'High-Load Traffic',
	'Customizable & Scalable',
]

const techStack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Vercel', 'Stripe', 'Prisma']

export default function WebServicePage() {
	return (
		<article>
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 border border-[var(--border)] text-[var(--brand)]">
							<Globe size={20} />
						</div>
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
							Digital Experiences
						</p>
					</div>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						Websites, Web Apps &amp; SaaS Platforms.
					</h1>
					<p className="mt-6 text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
						We design and engineer digital products that perform — from sleek corporate sites to complex multi-tenant SaaS platforms trusted by enterprise clients.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group">
							Start a Web Project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</Link>
						<Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:bg-[var(--bg-subtle)] transition-colors">
							See Our Web Work
						</Link>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					<section aria-labelledby="capabilities-heading">
						<h2 id="capabilities-heading" className="text-2xl font-bold text-[var(--text)] mb-8">What We Deliver</h2>
						<ul className="space-y-3" role="list">
							{capabilities.map((cap) => (
								<li key={cap} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
									<CheckCircle size={16} className="text-[var(--brand)] flex-shrink-0" />
									{cap}
								</li>
							))}
						</ul>
					</section>

					<section aria-labelledby="approach-heading">
						<h2 id="approach-heading" className="text-2xl font-bold text-[var(--text)] mb-6">Our Approach</h2>
						<div className="space-y-4 text-sm text-[var(--text-muted)] leading-relaxed">
							<p>We start every engagement with discovery — deeply understanding your users, business goals, and technical constraints before writing a single line of code.</p>
							<p>Architecture decisions are made with scale and maintainability in mind. Whether you need a static marketing site or a real-time collaborative platform, we choose the right tools for the job.</p>
							<p>Performance is a feature. We target Core Web Vitals from day one, ensuring your users get a fast, accessible experience on every device.</p>
						</div>

						<div className="mt-10">
							<h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-4">Technology Stack</h3>
							<div className="flex flex-wrap gap-2">
								{techStack.map((tech) => (
									<span key={tech} className="px-2.5 py-1 text-xs border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-subtle)] font-mono">
										{tech}
									</span>
								))}
							</div>
						</div>
					</section>
				</div>
			</div>
		</article>
	)
}
