import { ArrowUpRight } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { Reveal } from '@/components/ui/Reveal'

type Leader = {
	name: string
	title: string
	/** Optional handle set in the mono font next to the title. */
	handle?: string
	description: string
	linkedin: string
}

const leaders: Leader[] = [
	{
		name: 'Reyhan Fabiano',
		title: 'The Innovator',
		description: 'Product and product-flow design, technology, and the economics behind each decision.',
		linkedin: 'https://www.linkedin.com/in/reyhanfabiano/',
	},
	{
		name: 'Api Rahman',
		title: 'The Engineer',
		handle: 'rnd.sh',
		description: 'Engineering and R&D. Turns product decisions into systems that hold up in production.',
		linkedin: 'https://www.linkedin.com/in/api-al-rahman/',
	},
	{
		name: 'Armiko Dahono',
		title: 'The Counsel',
		description: 'Legal and the non-technical view. Keeps what we build sound, and understandable to people who are not engineers.',
		linkedin: 'https://www.linkedin.com/in/armikosmd/',
	},
]

function initials(name: string) {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase()
}

export function Leadership() {
	return (
		<section className="py-24 lg:py-32 border-b border-(--border)" aria-labelledby="leadership-heading">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">Leadership</p>
				<h2 id="leadership-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-14">
					The people you work with
				</h2>

				<ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)">
					{leaders.map((leader, i) => (
						<li key={leader.name} className="bg-(--bg)">
							<Reveal delay={i * 0.1} className="h-full flex flex-col p-8">
								<div
									className="aspect-square w-24 flex items-center justify-center bg-(--bg-subtle) border border-(--border) font-mono text-2xl font-bold text-(--text) mb-8"
									aria-hidden="true"
								>
									{initials(leader.name)}
								</div>
								<h3 className="text-lg font-bold text-(--text)">{leader.name}</h3>
								<p className="mt-1 flex items-center gap-2 text-sm text-(--brand)">
									{leader.title}
									{leader.handle && (
										<code className="font-mono text-[11px] text-(--text-muted) border border-(--border) bg-(--bg-subtle) px-1.5 py-0.5">
											{leader.handle}
										</code>
									)}
								</p>
								<p className="mt-4 text-sm text-(--text-muted) leading-relaxed flex-1">{leader.description}</p>
								<TrackedLink
									href={leader.linkedin}
									label={`${leader.name} LinkedIn`}
									section="about-leadership"
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${leader.name} on LinkedIn`}
									className="mt-6 inline-flex items-center gap-1.5 w-fit text-xs font-mono uppercase tracking-widest text-(--text-muted) hover:text-(--brand) transition-colors group"
								>
									LinkedIn
									<ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
								</TrackedLink>
							</Reveal>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
