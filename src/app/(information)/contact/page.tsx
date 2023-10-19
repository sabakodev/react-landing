import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	const directories = [
		{
			label: 'WhatsApp',
			contacts: [
				{
					name: 'Reyhan Fabiano',
					value: '+62 859-1066-81052',
					href: 'https://wa.me/62859106681052',
				},
				{
					name: 'Armiko Sandi MD',
					value: '+62 838-5475-2571',
					href: 'https://wa.me/6283854752571',
				},
				{
					name: 'Lian Roma',
					value: '+62 821-1200-8949',
					href: 'https://wa.me/6282112008949',
				},
			]
		},
		{
			label: 'Email',
			contacts: [
				{
					name: 'Reyhan Fabiano',
					value: 'sales@sabako.id',
					href: 'mailto:sales@sabako.id',
				},
			]
		},
	]
	return (
		<main className="relative place-items-center lg:max-w-5xl w-full mb-16">
			<div className="relative place-items-center lg:max-w-5xl w-full mb-16">
				<Image
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
				</div>
				<div className="mt-16 text-gray-300 leading-6">
					<div className="grid lg:grid-cols-2 w-full mb-32">
						<div className="lg:w-1/2">Jl. Agung Indah 10, Tanjung Priok 14350, Jakarta, Indonesia</div>
						<div className="grid grid-cols-2 gap-y-2">
							<span className="text-gray-500">Monday - Friday&nbsp;</span>
							<span>08.30 - 18.00</span>
							<span className="text-gray-500">Saturday&nbsp;</span>
							<span>10.00 - 14.00</span>
						</div>
					</div>
					{
						directories.map((directory, index) => (
							<div key={index} className="grid lg:grid-cols-2 w-full mt-8">
								<div className="font-bold">{directory.label}</div>
								<div className="space-y-2">
									{
										directory.contacts.map((contact, index) => (
											<div key={index} className="grid grid-cols-2">
												<span className="text-gray-500">{contact.name}&nbsp;</span>
												<Link href={contact.href}>{contact.value}</Link>
											</div>
										))
									}
								</div>
							</div>
						))
					}
				</div>
			</div>
		</main>
	)
}
