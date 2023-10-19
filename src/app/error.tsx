'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

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
					Something went wrong, it&#39;s still probably okay.
				</h1>
				<p className="text-lg mt-2 text-gray-300">In most case, you might wanted to <span onClick={() => reset()} className="font-medium text-gray-400 hover:text-gray-300">try again</span>.</p>
			</div>
		</div>
	)
}
