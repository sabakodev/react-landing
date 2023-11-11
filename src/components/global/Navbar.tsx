"use client"

import Link from "next/link"
import Image from "next/image"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

export type Link = {
	href: string
	label: string
}

export default function Navbar({ links }: { links: Link[] }) {
	return (
		<Disclosure as="nav" className="relative lg:max-w-5xl w-full mb-8">
			{({ open }) => (
				<>
					<div className="flex items-center justify-between sm:hidden">
						<Link href="/" className="flex justify-center items-center space-x-2">
							<Image src="/sabako-light.svg" alt="" height={256} width={256} className="h-8 w-8" />
							<h1 className="text-2xl font-bold font-mono">SABAKO</h1>
						</Link>
						<Disclosure.Button className="border border-neutral-800 rounded-md bg-zinc-800/30 hover:bg-zinc-800 p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							{open ? (
								<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
							)}
						</Disclosure.Button>
					</div>
					<Link href="/" className="hidden sm:flex justify-center items-center space-x-2 mb-4">
						<Image src="/sabako-light.svg" alt="" height={256} width={256} className="h-14 w-14" />
						<h1 className="text-3xl font-bold font-mono">SABAKO</h1>
					</Link>
					<div className="hidden sm:flex w-full justify-around border-b pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 font-mono">
						{
							links.map((link, index) => (
								<Link key={index} href={link.href} className="hover:text-gray-300 hover:underline underline-offset-8">{link.label}</Link>
							))
						}
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2 mt-4 h-full w-full bg-neutral-900 font-mono">
							{links.map((link) => (
								<Disclosure.Button
									key={link.label}
									as="a"
									href={link.href}
									className="text-neutral-300 hover:bg-neutral-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
								>
									{link.label}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}