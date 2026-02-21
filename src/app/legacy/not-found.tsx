import Image from 'next/image'
import Link from 'next/link'

export default function Error404() {
	return (
		<div className="relative lg:max-w-5xl w-full mb-16">
			<Image
				src="/sky.jpg"
				alt="SABAKO"
				className="w-full h-72 object-cover"
				width={500}
				height={200}
				priority
			/>
			<div className="mt-2 text-sm text-gray-500">
				Photos by&nbsp;
				<a className="text-gray-300 hover:text-gray-400" href="https://unsplash.com/photos/3YrppYQPoCI">Guillaume Galtier via Unsplash</a>
			</div>
			<div className="mt-16">
				<h1 className="font-bold text-2xl">
					This page is not exists, it might long lost in memories.
				</h1>
				<p className="text-lg mt-2 text-gray-300">In most case, you might wanted to go <Link href="/" className="font-medium text-gray-400 hover:text-gray-300">home</Link> again.</p>
			</div>
		</div>
	)
}
