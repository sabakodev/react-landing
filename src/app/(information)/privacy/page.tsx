import type { Metadata } from 'next'
import { MapPin, Users, BriefcaseBusiness, Timer } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'Learn how we handle your data and protect your privacy.',
	alternates: { canonical: 'https://sabako.id/privacy' },
	openGraph: {
		title: 'Privacy Policy SABAKO — IT Agency & Consulting',
		description: 'Learn how we handle your data and protect your privacy.',
	},
}

const values = [
	{
		icon: Users,
		title: 'Data Collected',
		description: 'We collect Full Name, Email Address, Phone Number, and other information you provide to us.',
	},
	{
		icon: BriefcaseBusiness,
		title: 'Data Usage',
		description: 'We use the data collected for the purpose of providing our services.',
	},
	{
		icon: Timer,
		title: 'Data Retention',
		description: 'Your data retained for the duration of our relationship or as long as required by law.',
	},
	{
		icon: MapPin,
		title: 'Data Storage',
		description: 'We store your sensitive data on our server, other data may be stored on third-party services.',
	},
]

export default function AboutPage() {
	return (
		<article>
			{/* Page header */}
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Privacy Policy
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						What we care about you.
					</h1>
				</div>
			</header>

			{/* Story */}
			<section className="py-20 border-b border-[var(--border)]" aria-label="Our story">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					<div>
						<h2 className="text-2xl font-bold text-[var(--text)] mb-6">Who we are</h2>
						<div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
							<p className="text-xs font-mono text-[var(--text-subtle)]">Last Updated: 2026-02-20</p>
							<p>
								This Privacy Policy explains how PT. SABAKO KREATIV DIGITAL (“we,” “us,” “our”) collects, uses, discloses, and protects personal information when you visit or use sabako.id (the “Site”).
							</p>
							<p>
								Our Address: Jl. Bangka Raya No. 48, Mampang Prapatan 12720, Jakarta Selatan, Indonesia
							</p>
							<p>
								If you are in the EEA/UK, we process personal data under the following legal bases as applicable:
							</p>
							<ul className="list-disc list-outside">
								<li>Consent (e.g., where required for non-essential cookies/analytics)</li>
								<li>Legitimate interests (e.g., maintaining and improving our Site, preventing fraud, understanding usage trends) — balanced against your rights</li>
								<li>Contract (e.g., to respond to a request or provide a service you asked for)</li>
								<li>Legal obligation (e.g., compliance and recordkeeping)</li>
							</ul>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">International Data Transfers</h3>
							<p>
								If personal information is transferred outside your country (including outside the EEA/UK), we take steps designed to ensure adequate protection, such as:
							</p>
							<ul className="list-disc list-outside">
								<li>Using Standard Contractual Clauses (SCCs) where applicable</li>
								<li>Working with providers that offer recognized transfer safeguards</li>
								<li>Other measures as required by law</li>
							</ul>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">Business Transfers</h3>
							<p>If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets, information may be transferred as part of that transaction.</p>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">GDPR/EEA/UK rights</h3>
							<p>Depending on your location, you may have the right to:</p>
							<ul className="list-disc list-outside">
								<li>Access your personal data</li>
								<li>Rectify inaccurate data</li>
								<li>Delete your data (“right to be forgotten”)</li>
								<li>Restrict processing</li>
								<li>Object to processing (including certain processing based on legitimate interests)</li>
								<li>Data portability</li>
								<li>Withdraw consent at any time (where processing is based on consent)</li>
							</ul>
							<p>You also have the right to lodge a complaint with your local data protection authority.</p>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">California privacy rights (CCPA/CPRA)</h3>
							<p>If you are a California resident, you may have the right to:</p>
							<ul className="list-disc list-outside">
								<li>Know what personal information we collected, used, disclosed, and shared</li>
								<li>Access specific pieces of personal information</li>
								<li>Delete personal information (with certain exceptions)</li>
								<li>Correct inaccurate personal information</li>
								<li>Opt out of “sale” or “sharing” of personal information (as defined by CPRA)</li>
								<li>Limit use and disclosure of sensitive personal information (if applicable)</li>
								<li>Non-discrimination for exercising your rights</li>
							</ul>
							<p>We do not sell personal information for money. However, California law defines “sharing” broadly and may include disclosure of identifiers (like IP address or cookie IDs) to third-party analytics/advertising partners for cross-context behavioral advertising.</p>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">How to excercise your rights</h3>
							<p>You can contact us at <a href="mailto:privacy@sabako.id">privacy@sabako.id</a> to exercise your rights. We may need to verify your identity before completing certain requests. Authorized agents may submit requests where permitted by law.</p>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">Children&apos;s Privacy</h3>
							<p>The Site is not intended for children under 13 (and under 16 for certain California provisions). We do not knowingly collect personal information from children. If you believe a child provided us personal information, contact us to request deletion.</p>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">Data retention</h3>
							<p>We retain personal information only as long as reasonably necessary for the purposes described in this Policy, including to:</p>
							<ul className="list-disc list-outside">
								<li>Provide the Site and respond to you</li>
								<li>Maintain records and comply with legal obligations</li>
								<li>Retention periods depend on the type of data, purpose, and legal requirements.</li>
							</ul>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">Changes to this Privacy Policy</h3>
							<p>We may update this Policy from time to time. We will post the updated version on this page and update the “Last Updated” date.</p>
							<h3 className="text-xl font-bold text-[var(--text)] mb-2">Contact Us</h3>
							<p>If you have questions about this Privacy Policy or our practices, you can contact by email at: <a href="mailto:privacy@sabako.id">privacy@sabako.id</a></p>
						</div>
					</div>
					<div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
						<h2 className="text-2xl font-bold text-[var(--text)] mb-6">How we collect and use your information</h2>
						<p>
							We may collect:
						</p>
						<ul className="list-disc list-outside text-[var(--text)]">
							<li>Full Name</li>
							<li>Email Address</li>
							<li>Phone Number</li>
							<li>Any information you submit via forms or communications (e.g., messages, inquiries)</li>
						</ul>
						<p className="border-l-2 border-[var(--brand)] pl-4 text-[var(--text)] font-medium">
							Those data are provided by you. You can control the data you provide by not submitting it. This data would not be shared with third party.
						</p>
						<p>When you use the Site, we may automatically collect:</p>
						<ul className="list-disc list-outside text-[var(--text)]">
							<li>Device information (e.g., IP address, browser type, operating system)</li>
							<li>Usage information (e.g., pages visited, time spent on pages)</li>
							<li>Interaction information (e.g., clicks, form submissions)</li>
							<li>Device identifiers (may include cookie IDs or similar identifiers)</li>
							<li>Browser type and settings</li>
							<li>Device information (e.g., operating system)</li>
							<li>Usage data (pages viewed, time on site, links clicked, referring URLs)</li>
							<li>Approximate location (derived from IP)</li>
						</ul>
						<p>Those data are collected automatically when you visit our website which you could not opt-out of those data. </p>
						<p className="border-l-2 border-[var(--brand)] pl-4 text-[var(--text)] font-medium">
							We tried our best to remove any information that could be used to identify you before shared with third party.
						</p>
						<p>
							We and our third-party partners may use cookies, pixels, SDKs, and similar technologies for:
						</p>
						<ul className="list-disc list-outside">
							<li>Analytics and performance measurement</li>
							<li>Site functionality and security</li>
							<li>Improving user experience</li>
						</ul>
						<h3 id="cookies" className="text-xl font-bold text-[var(--text)] mb-2">Analytics &amp; Cookies</h3>
						<p>We use two analytics systems with different consent requirements:</p>
						<div className="space-y-3 my-2">
							<div className="border border-[var(--border)] p-4">
								<p className="text-sm font-bold text-[var(--text)] mb-1">Cloudflare Web Analytics — Essential</p>
								<p className="text-xs text-[var(--text-muted)] leading-relaxed">Cookieless, privacy-first RUM. No personal data or cross-site tracking. Legitimate interest basis. <strong>Always active.</strong></p>
							</div>
							<div className="border border-[var(--border)] p-4">
								<p className="text-sm font-bold text-[var(--text)] mb-1">Google Analytics 4 — Analytics (Consent Required)</p>
								<p className="text-xs text-[var(--text-muted)] leading-relaxed">Tracks page views and events using cookies. Only loaded after consent. Legal basis: consent.</p>
							</div>
						</div>
						<p className="font-bold text-[var(--text)] text-sm mt-4">Cookie Table</p>
						<div className="overflow-x-auto">
							<table className="w-full text-xs border-collapse border border-[var(--border)]">
								<thead className="bg-[var(--bg-subtle)]">
									<tr className="text-left">
										<th className="py-2 px-3 border border-[var(--border)] font-mono text-[var(--text-subtle)] uppercase">Name</th>
										<th className="py-2 px-3 border border-[var(--border)] font-mono text-[var(--text-subtle)] uppercase">Provider</th>
										<th className="py-2 px-3 border border-[var(--border)] font-mono text-[var(--text-subtle)] uppercase">Purpose</th>
										<th className="py-2 px-3 border border-[var(--border)] font-mono text-[var(--text-subtle)] uppercase">Expiry</th>
									</tr>
								</thead>
								<tbody>
									<tr><td className="py-2 px-3 border border-[var(--border)] font-mono text-[var(--text)]">_ga</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">Google Analytics 4</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">Distinguishes users</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">2 years</td></tr>
									<tr><td className="py-2 px-3 border border-[var(--border)] font-mono text-[var(--text)]">_ga_*</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">Google Analytics 4</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">Persists GA4 session state</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">2 years</td></tr>
									<tr><td className="py-2 px-3 border border-[var(--border)] font-mono text-[var(--text)]">sabako_consent</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">SABAKO</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">Stores analytics consent preference</td><td className="py-2 px-3 border border-[var(--border)] text-[var(--text-muted)]">localStorage</td></tr>
								</tbody>
							</table>
						</div>
						<p className="border-l-2 border-[var(--brand)] pl-4 text-[var(--text)] font-medium">Change your cookie preferences at any time using <strong>Cookie Settings</strong> in the footer.</p>
						<h3 className="text-xl font-bold text-[var(--text)] mb-2">How your data would be processed</h3>
						<p>We may use personal information to:</p>
						<ul className="list-disc list-outside">
							<li>Provide, operate, and maintain the Site</li>
							<li>Respond to inquiries and communicate with you</li>
							<li>Improve, monitor, and analyze Site usage and performance</li>
							<li>Detect, prevent, and address fraud, abuse, or security issues</li>
							<li>Comply with legal obligations and enforce our terms</li>
						</ul>
						<p>We may share automatically collected information (including IP address and browser/device/usage data) with third-party analytics providers to help us understand traffic and usage.</p>
						<p>Examples of analytics providers may include:</p>
						<ul className="list-disc list-outside">
							<li>Cloudflare RUM</li>
							<li>Google Analytics</li>
						</ul>
						<p>These providers may process data on our behalf or as independent controllers, depending on the service and configuration.</p>
						<p>We may share personal information with vendors that help us operate the Site (e.g., hosting, email delivery, security). They are permitted to use personal information only to provide services to us.</p>
						<h3 className="text-xl font-bold text-[var(--text)] mb-2">Legal & Safety</h3>
						<p>We may disclose information if required to do so by law, or if we believe disclosure is necessary to:</p>
						<ul className="list-disc list-outside">
							<li>Comply with legal process</li>
							<li>Protect our rights, users, or the public</li>
							<li>Investigate or prevent illegal activity or policy violations</li>
						</ul>
						<h3 className="text-xl font-bold text-[var(--text)] mb-2">Security</h3>
						<p>We use reasonable administrative, technical, and organizational measures designed to protect personal information. However, no method of transmission or storage is 100% secure.</p>
						<h3 className="text-xl font-bold text-[var(--text)] mb-2">Third-party sites</h3>
						<p>The Site may contain links to third-party sites. Their privacy practices are governed by their own policies, not this one.</p>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]" aria-labelledby="values-heading">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<h2 id="values-heading" className="text-2xl font-bold text-[var(--text)] mb-12">
						Key Points
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
						{values.map((value) => {
							const Icon = value.icon
							return (
								<div key={value.title} className="bg-[var(--bg-subtle)] p-8">
									<div className="p-2 border border-[var(--border)] text-[var(--brand)] bg-[var(--bg)] w-fit mb-5">
										<Icon size={18} />
									</div>
									<h3 className="text-base font-bold text-[var(--text)] mb-2">{value.title}</h3>
									<p className="text-sm text-[var(--text-muted)] leading-relaxed">{value.description}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20" aria-label="Contact call to action">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<p className="text-2xl font-bold text-[var(--text)] max-w-sm">
						Interested in working with us?
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Get in Touch
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}
