import Image from 'next/image'

export default function Home() {
	const callouts = [


		{
			name: 'Enterprise Software',
			description: 'Upgrade your business',
			imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
			imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
			href: '#/works/enterprise',
		},
		{
			name: 'Mobile Application',
			description: 'Commercial grade system',
			imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
			imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
			href: '#/works/mobile',
		},
		{
			name: 'Web Application',
			description: 'Work from everywhere',
			imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
			imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
			href: '#/works/website',
		},
	]

	return (
		<main className="relative place-items-center lg:max-w-5xl w-full mb-16">
			<div className="relative place-items-center lg:max-w-5xl w-full mb-16">
				{/* <Image
					src="/sky.jpg"
					alt="SABAKO"
					className="w-full h-72 object-cover object-bottom"
					width={1000}
					height={1000}
					priority
				/>
				<div className="mt-2 text-sm text-gray-500">
					Photos by&nbsp;
					<a className="text-gray-300 hover:text-gray-400" href="https://unsplash.com/photos/3YrppYQPoCI">Guillaume Galtier via Unsplash</a>
				</div> */}
				<div className="mt-16 text-gray-300 text-4xl font-bold">
					Partner with the <span className="bg-gray-300 text-neutral-900">experienced</span>.<br />
					Unleash the digital to expand your business.
				</div>
				<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
					<div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-3 lg:space-y-0">
						{callouts.map((callout) => (
							<div key={callout.name} className="group relative">
								<div className="relative h-80 w-full overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 z-0">
									<div className="absolute top z-10 h-full w-full bg-neutral-900/50"></div>
									<Image
										src={callout.imageSrc}
										alt={callout.imageAlt}
										width={400}
										height={200}
										className="z-0 h-full w-full object-cover object-center"
									/>
								</div>
								<div className="absolute z-10 bottom-0 p-4">
									<h3 className="mt-6 text-sm text-neutral-200">
										<a href={callout.href}>
											<span className="absolute inset-0" />
											{callout.name}
										</a>
									</h3>
									<p className="text-base font-semibold text-neutral-100">{callout.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	)
}
