import type { Metadata } from 'next'
import Link from 'next/link'
import { Smartphone, ArrowRight, CheckCircle } from 'lucide-react'
import { OtherServices } from '@/components/services/OtherServices'

export const metadata: Metadata = {
	title: 'Mobile Products — App Development',
	description:
		'SABAKO builds native and cross-platform mobile apps for iOS and Android. From consumer apps to enterprise mobile solutions.',
	alternates: { canonical: 'https://sabako.id/services/mobile' },
}

const capabilities = [
	'iOS App Development (Swift)',
	'Android App Development (Kotlin)',
	'React Native (Cross-platform)',
	'Flutter (Cross-platform)',
	'App Store & Play Store Submission',
	'Push Notifications & Offline Mode',
	'Mobile UI/UX Design',
	'App Maintenance & Updates',
]

const techStack = ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo', 'Redux', 'GraphQL']

export default function MobileServicePage() {
	return (
		<article>
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 border border-[var(--border)] text-[var(--brand)]">
							<Smartphone size={20} />
						</div>
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
							Mobile Products
						</p>
					</div>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						iOS, Android &amp; Cross-platform Apps.
					</h1>
					<p className="mt-6 text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
						We craft intuitive, high-performance mobile experiences that users love to return to — built natively or cross-platform depending on your needs.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group">
							Start a Mobile Project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</Link>
						<Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:bg-[var(--bg-subtle)] transition-colors">
							See Our App Work
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
							<p>We evaluate native vs cross-platform on a per-project basis — there is no one-size-fits-all answer. For maximum device integration and performance, we go native. For faster delivery across both platforms, React Native or Flutter.</p>
							<p>Mobile UX is a discipline of its own. Our designers follow platform-specific guidelines (HIG and Material Design) while maintaining your brand identity throughout the product.</p>
							<p>We handle the full release cycle — from App Store Connect setup to review submission and post-launch monitoring.</p>
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
			<OtherServices current="mobile" />
		</article>
	)
}
