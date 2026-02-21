import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getWorks } from '@/lib/graphql/adapters/works'
import { WorksGrid } from '@/components/work/WorksGrid'
import { ClientLogoStrip } from '@/components/work/ClientLogoStrip'

export const metadata: Metadata = {
	title: 'Work',
	description:
		"Explore SABAKO's portfolio of enterprise web applications, mobile products, and IoT solutions delivered for clients across Indonesia.",
	alternates: { canonical: 'https://sabako.id/work' },
	openGraph: { title: 'Work & Portfolio — SABAKO', description: 'Selected projects from SABAKO.' },
}

const PAGE_SIZE = 9

export default async function WorkPage() {
	// First batch: server-rendered for SEO
	const all = await getWorks()
	const initialItems = all.slice(0, PAGE_SIZE)
	const initialCursor = initialItems.length ? initialItems[initialItems.length - 1].slug : null
	const initialHasMore = all.length > PAGE_SIZE

	return (
		<article>
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Portfolio
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						Partner with the experienced.
					</h1>
					<p className="mt-4 text-lg text-[var(--text-muted)] max-w-xl">
						A selection of projects across web, mobile, and connected systems.
					</p>
				</div>
			</header>

			<ClientLogoStrip />

			<section className="py-16" aria-label="Projects">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<WorksGrid
						initialItems={initialItems}
						initialCursor={initialCursor}
						initialHasMore={initialHasMore}
						pageSize={PAGE_SIZE}
					/>
				</div>
			</section>

			{/* CTA */}
			<section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-16" aria-label="Start a project">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<p className="text-2xl font-bold text-[var(--text)]">Have a project in mind?</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Let&apos;s Discuss
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}
