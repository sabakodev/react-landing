import Link from "next/link"

export type Link = {
	href: string
	label: string
}

export default function Navbar({ links }: { links: Link[] }) {
	return (
		<div className="relative lg:max-w-5xl w-full mb-8">
			<div className="flex w-full justify-around border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 font-mono">
				{
					links.map((link, index) => (
						<Link key={index} href={link.href} className="hover:text-gray-300 hover:underline underline-offset-8">{link.label}</Link>
					))
				}
			</div>
		</div>
	)
}