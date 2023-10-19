import Image from 'next/image'

export default function Home() {
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
					Our team&#39;s vision prioritizes user experience, enabling limitless creativity to come to fruition and expand horizons, opening the business limitless.
				</div>
				<div className="mt-4 text-gray-300 leading-6">
					While established in early 2018, we already had many professionals with more than a decade of experience. Our focus is on software design rather than frontend design, which pushes us to invest our time to make quality setup and lean development.
				</div>
				<div className="mt-4 text-gray-300 leading-6">
					We have extensive experience working with government agencies, and as a result, we prioritize user privacy. We take great care to ensure all user data remains confidential. We kept our security in best practice and prepared the document to mitigate disclosed information that harms one business or another. Our team&#39;s expertise in data engineering is also another merit.
				</div>
			</div>
		</main>
	)
}
