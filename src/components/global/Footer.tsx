import Link from "next/link"

export default function Footer() {
	return (
		<div className="z-10 max-w-5xl w-full font-mono text-sm">
			<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black">
				<Link
					className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto"
					href="/"
					target="_blank"
					rel="noopener noreferrer"
				>
					&copy; 2023 SABAKO
				</Link>
			</div>
		</div>
	)
}