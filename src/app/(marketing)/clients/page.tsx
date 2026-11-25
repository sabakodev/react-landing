import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'
import Image from 'next/image'
import { clients } from './_data'
import Link from 'next/link'

export const metadata: Metadata = pageMetadata({
	title: 'Clients',
	description:
		'Companies and organisations SABAKO has worked with, from consumer brands and banks to public institutions.',
	path: '/clients',
})

export default function Home() {
	return (
		// The root layout already renders <main>
		<div className="relative place-items-center lg:max-w-5xl w-full mb-16">
			<div className="relative place-items-center lg:max-w-5xl w-full mb-16">
				<h1 className="sr-only">SABAKO clients</h1>
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
				<div className="mt-16 text-gray-300 leading-6 grid grid-cols-5 gap-8 justify-items-center place-items-center">
					{
						clients.map((data, index) => (
							<Link href={`#/clients/${data.label}`} key={index}>
								<Image src={data.image} alt={data.label} height={100} />
							</Link>
						))
					}
				</div>
			</div>
		</div>
	)
}
