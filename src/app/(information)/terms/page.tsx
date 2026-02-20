import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Terms of Use',
	description:
		'Terms and conditions for using the SABAKO website and services.',
	alternates: { canonical: 'https://sabako.id/terms' },
	openGraph: {
		title: 'Terms of Use — SABAKO',
		description: 'Terms and conditions for using the SABAKO website and services.',
	},
}

export default function TermsPage() {
	return (
		<article>
			{/* Page header */}
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Terms of Use
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						Terms &amp; Conditions.
					</h1>
				</div>
			</header>

			<section className="py-20 border-b border-[var(--border)]">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					<div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
						<p className="text-xs font-mono text-[var(--text-subtle)]">Last Updated: 2026-02-20</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">1. Acceptance of Terms</h2>
						<p>
							By accessing or using the website sabako.id (the &quot;Site&quot;), you agree to be bound by these Terms of Use (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site. These Terms constitute a legally binding agreement between you and PT. SABAKO KREATIV DIGITAL (&quot;SABAKO,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">2. Use of the Site</h2>
						<p>
							You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:
						</p>
						<ul className="list-disc list-outside space-y-1 ml-4">
							<li>Use the Site in any way that violates any applicable law or regulation</li>
							<li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
							<li>Use the Site to transmit any harmful, threatening, or offensive content</li>
							<li>Interfere with or disrupt the operation of the Site</li>
							<li>Engage in any data mining, scraping, or similar data gathering activities without our express written consent</li>
						</ul>

						<h2 className="text-2xl font-bold text-[var(--text)]">3. Intellectual Property</h2>
						<p>
							All content on the Site — including text, graphics, logos, icons, images, code, and software — is the property of SABAKO or its licensors and is protected by Indonesian and international intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our prior written permission.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">4. Services</h2>
						<p>
							Information about our services on the Site is for general informational purposes only. Any engagement for services will be governed by a separate agreement between SABAKO and the client. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">5. User Submissions</h2>
						<p>
							Any information you submit through the Site (including contact forms, inquiries, or feedback) is subject to our <Link href="/privacy" className="text-[var(--brand)] hover-underline">Privacy Policy</Link>. By submitting information, you grant us the right to use it for the purposes described in our Privacy Policy and to respond to your inquiries.
						</p>
					</div>

					<div className="space-y-6 text-[var(--text-muted)] leading-relaxed">
						<h2 className="text-2xl font-bold text-[var(--text)]">6. Disclaimer of Warranties</h2>
						<p>
							The Site is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the Site is at your own risk.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">7. Limitation of Liability</h2>
						<p>
							To the fullest extent permitted by applicable law, SABAKO shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site, whether based on warranty, contract, tort, or any other legal theory.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">8. Third-Party Links</h2>
						<p>
							The Site may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of use of any third-party sites. Accessing third-party sites is at your own risk.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">9. Indemnification</h2>
						<p>
							You agree to indemnify, defend, and hold harmless SABAKO, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the Site or violation of these Terms.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">10. Governing Law</h2>
						<p>
							These Terms are governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Jakarta, Indonesia.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">11. Changes to These Terms</h2>
						<p>
							We reserve the right to update or modify these Terms at any time. The updated version will be posted on this page with a revised &quot;Last Updated&quot; date. Your continued use of the Site after any changes constitutes your acceptance of the new Terms.
						</p>

						<h2 className="text-2xl font-bold text-[var(--text)]">12. Contact</h2>
						<p>
							If you have any questions about these Terms, please contact us at{' '}
							<a href="mailto:legal@sabako.id" className="text-[var(--brand)] hover-underline">legal@sabako.id</a>.
						</p>
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
