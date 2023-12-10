import Link from "next/link"

export type Card = {
	href: string
	title: string
	description: string
}

export default function Card({ cards }: { cards: Card[] }) {
	return (
		<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-4 lg:text-left">
			{
				cards.map((card, index) => (
					<Link key={index}
						href={card.href}
						className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
					>
						<h2 className={`mb-3 text-2xl font-semibold`}>
							{card.title + ' '}
							<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
								-&gt;
							</span>
						</h2>
						<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
							{card.description}
						</p>
					</Link>
				))
			}
		</div>
	)
}