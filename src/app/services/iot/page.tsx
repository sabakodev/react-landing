import type { Metadata } from 'next'
import Link from 'next/link'
import { Cpu, ArrowRight, CheckCircle } from 'lucide-react'
import { OtherServices } from '@/components/services/OtherServices'

export const metadata: Metadata = {
	title: 'Connected Systems — IoT Solutions',
	description:
		'SABAKO engineers smart connected platforms — embedded systems, IoT device integration, real-time dashboards, and industrial automation.',
	alternates: { canonical: 'https://sabako.id/services/iot' },
}

const capabilities = [
	'Embedded Firmware Development (C/C++)',
	'IoT Device Integration & Provisioning',
	'MQTT / CoAP Protocol Design',
	'Real-time Monitoring Dashboards',
	'Cloud Connectivity (AWS IoT, Azure)',
	'Industrial Automation & SCADA',
	'Edge Computing Solutions',
	'Compliance & Security Hardening',
]

const techStack = ['Embedded C', 'MQTT', 'Node.js', 'TimescaleDB', 'InfluxDB', 'AWS IoT', 'Grafana', 'React']

export default function IotServicePage() {
	return (
		<article>
			<header className="border-b border-(--border) pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 border border-(--border) text-(--brand)">
							<Cpu size={20} />
						</div>
						<p className="text-xs font-mono uppercase tracking-widest text-(--brand)">
							Connected Systems
						</p>
					</div>
					<h1 className="text-5xl font-bold text-(--text) max-w-2xl leading-tight">
						Smart Devices &amp; Embedded Platforms.
					</h1>
					<p className="mt-6 text-lg text-(--text-muted) max-w-xl leading-relaxed">
						From sensor firmware to cloud dashboards — we engineer the full IoT stack for industrial, commercial, and consumer applications.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<Link href="/contact?service=iot" className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group">
							Start an IoT Project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</Link>
						<Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 border border-(--border) text-(--text) text-sm font-medium hover:bg-(--bg-subtle) transition-colors">
							See Our IoT Work
						</Link>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					<section aria-labelledby="capabilities-heading">
						<h2 id="capabilities-heading" className="text-2xl font-bold text-(--text) mb-8">What We Deliver</h2>
						<ul className="space-y-3" role="list">
							{capabilities.map((cap) => (
								<li key={cap} className="flex items-center gap-3 text-sm text-(--text-muted)">
									<CheckCircle size={16} className="text-(--brand) shrink-0" />
									{cap}
								</li>
							))}
						</ul>
					</section>

					<section aria-labelledby="approach-heading">
						<h2 id="approach-heading" className="text-2xl font-bold text-(--text) mb-6">Our Approach</h2>
						<div className="space-y-4 text-sm text-(--text-muted) leading-relaxed">
							<p>IoT projects fail most often at the integration layer. We de-risk this from the start by designing the full system architecture — firmware, messaging protocol, cloud ingestion, and UI — before any hardware is ordered.</p>
							<p>We are fluent in the real-world constraints of embedded systems: memory-limited microcontrollers, intermittent connectivity, and long device lifespans that require secure OTA update strategies.</p>
							<p>Our data engineering expertise means the time-series data your devices produce becomes actionable insight — through real-time dashboards, anomaly detection, and compliance reporting.</p>
						</div>

						<div className="mt-10">
							<h3 className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-4">Technology Stack</h3>
							<div className="flex flex-wrap gap-2">
								{techStack.map((tech) => (
									<span key={tech} className="px-2.5 py-1 text-xs border border-(--border) text-(--text-muted) bg-(--bg-subtle) font-mono">
										{tech}
									</span>
								))}
							</div>
						</div>
					</section>
				</div>
			</div>
			<OtherServices current="iot" />
		</article>
	)
}
