import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bot, ShieldCheck, Ban, Mail } from 'lucide-react'

export const metadata: Metadata = {
	title: 'sabakobot and sabako-user',
	description:
		'What SABAKO crawlers do, how we use what they collect, and how to control or block them.',
	alternates: { canonical: 'https://sabako.id/bot' },
	openGraph: {
		title: 'SABAKO Crawlers: sabakobot and sabako-user',
		description:
			'What SABAKO crawlers do, how we use what they collect, and how to control or block them.',
	},
}

const LAST_UPDATED = '2026-11-13'

const agents = [
	{
		token: 'sabakobot',
		does: 'Crawls public web pages to build and refresh our search, content and monitoring index.',
		robots: 'Yes, always',
	},
	{
		token: 'sabako-user',
		does: 'Fetches a page only when a person, or an AI agent acting for a person, asks for it in real time.',
		robots: 'No (user-directed, like a browser). It never crawls on its own or follows links beyond the request.',
	},
	{
		token: 'sabako-extended',
		does: 'Not a separate crawler. A robots.txt token that controls whether sabakobot content may be used to train our AI models.',
		robots: 'Yes',
	},
]

const userAgents = `Mozilla/5.0 (compatible; sabakobot/1.0; +https://sabako.id/bot)
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; sabakobot/1.0; +https://sabako.id/bot) Chrome/{version} Safari/537.36
Mozilla/5.0 (compatible; sabako-user/1.0; +https://sabako.id/bot)
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36 sabako-user/1.0 (+https://sabako.id/bot)`

const never = [
	'Log in, or bypass paywalls, logins or access controls',
	'Solve or bypass CAPTCHAs',
	'Access private networks or non-public systems',
	'Build profiles of individual people',
	'Sell personal data or raw copies of crawled pages',
]

const uses = [
	{ use: 'Delivering search results and extracted content to our customers', bot: 'Yes', user: 'Yes, for that request only' },
	{ use: 'Short-term caching (up to 7 days for articles, 24 hours for home and news pages)', bot: 'Yes', user: 'Yes, short-term, never linked to who asked' },
	{ use: 'Building our search index and retrieval systems (including embeddings)', bot: 'Yes', user: 'No' },
	{ use: 'Content and brand monitoring: alerts and reports for our customers (mentions, changes, impersonation)', bot: 'Yes', user: 'No' },
	{ use: 'Fraud and phishing detection (section 5)', bot: 'Yes', user: 'No' },
	{ use: 'Aggregate data analysis (link graph, freshness, language, site health, spam and quality signals)', bot: 'Yes', user: 'Aggregate operational metrics only' },
	{ use: 'Training our own AI models (ranking, extraction, classification, phishing detection)', bot: 'Yes, unless you opt out (section 4)', user: 'Never', strong: true },
	{ use: 'Selling or licensing raw crawled pages or datasets to third parties', bot: 'No', user: 'No', strong: true },
	{ use: 'Security, abuse prevention, legal compliance', bot: 'Yes', user: 'Yes' },
]

const blockAll = `User-agent: sabakobot
Disallow: /`

const blockTraining = `User-agent: sabako-extended
Disallow: /`

const keyPoints = [
	{ icon: Bot, title: 'Results, not data', description: 'We sell search results and insights. We never sell or license raw copies of your pages.' },
	{ icon: Ban, title: 'Easy to block', description: 'Block sabakobot, or only opt out of AI training with sabako-extended, in your robots.txt.' },
	{ icon: ShieldCheck, title: 'Public pages only', description: 'No logins, no paywalls, no CAPTCHA solving, no private systems.' },
	{ icon: Mail, title: 'Talk to a human', description: 'bot@sabako.id for crawl issues, abuse@sabako.id if you were flagged by mistake.' },
]

const th = 'py-2 px-3 border border-(--border) font-mono text-(--text-subtle) uppercase text-left'
const td = 'py-2 px-3 border border-(--border) text-(--text-muted) align-top'
const code = 'block whitespace-pre overflow-x-auto border border-(--border) bg-(--bg-subtle) p-4 text-xs font-mono text-(--text)'
const h3 = 'text-xl font-bold text-(--text) mb-2 pt-4'

export default function BotPage() {
	return (
		<article>
			{/* Page header */}
			<header className="border-b border-(--border) pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
						sabakobot and sabako-user
					</p>
					<h1 className="text-5xl font-bold text-(--text) max-w-2xl leading-tight">
						The crawlers behind SABAKO.
					</h1>
				</div>
			</header>

			<section className="py-20 border-b border-(--border)" aria-label="Crawler policy">
				<div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-4 text-(--text-muted) leading-relaxed">
					<p className="text-xs font-mono text-(--text-subtle)">Last Updated: {LAST_UPDATED}</p>
					<p>
						PT. SABAKO KREATIV DIGITAL (&ldquo;SABAKO&rdquo;, &ldquo;we&rdquo;) operates automated agents that power our
						search, content and brand-protection services. This page explains what they do, how we use what they
						collect, and how you can control or block them.
					</p>

					<h2 id="agents" className="text-2xl font-bold text-(--text) pt-8">1. Our agents</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-sm border-collapse border border-(--border)">
							<thead className="bg-(--bg-subtle)">
								<tr>
									<th className={th}>Token</th>
									<th className={th}>What it does</th>
									<th className={th}>Follows robots.txt</th>
								</tr>
							</thead>
							<tbody>
								{agents.map((a) => (
									<tr key={a.token}>
										<td className="py-2 px-3 border border-(--border) font-mono font-bold text-(--text) align-top">{a.token}</td>
										<td className={td}>{a.does}</td>
										<td className={td}>{a.robots}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p>User-Agent strings:</p>
					<code className={code}>{userAgents}</code>
					<p>Token matching is case-insensitive.</p>

					<h2 id="access" className="text-2xl font-bold text-(--text) pt-8">2. What we access, and what we never do</h2>
					<p>
						We access <strong className="text-(--text)">publicly available pages only</strong>. We never:
					</p>
					<ul className="list-disc list-outside pl-5">
						{never.map((n) => (
							<li key={n}>{n}</li>
						))}
					</ul>

					<h2 id="use" className="text-2xl font-bold text-(--text) pt-8">3. How we use the data</h2>
					<p>
						We sell <strong className="text-(--text)">results and insights</strong>, not your pages. Customers receive
						search results, extracted content for the pages they request, and monitoring alerts and reports.
					</p>
					<div className="overflow-x-auto">
						<table className="w-full text-sm border-collapse border border-(--border)">
							<thead className="bg-(--bg-subtle)">
								<tr>
									<th className={th}>Use</th>
									<th className={th}>sabakobot (our crawl)</th>
									<th className={th}>sabako-user (fetched for a customer)</th>
								</tr>
							</thead>
							<tbody>
								{uses.map((u) => (
									<tr key={u.use}>
										<td className={u.strong ? `${td} font-bold text-(--text)` : td}>{u.use}</td>
										<td className={u.strong ? `${td} font-bold text-(--text)` : td}>{u.bot}</td>
										<td className={u.strong ? `${td} font-bold text-(--text)` : td}>{u.user}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="border-l-2 border-(--brand) pl-4 text-(--text) font-medium">
						Content fetched by sabako-user belongs to our customer&apos;s request. It is not added to our index,
						monitoring or training data.
					</p>

					<h2 id="control" className="text-2xl font-bold text-(--text) pt-8">4. How to control us</h2>
					<h3 className={h3}>Block all crawling</h3>
					<code className={code}>{blockAll}</code>
					<h3 className={h3}>Allow search indexing, opt out of AI training</h3>
					<code className={code}>{blockTraining}</code>
					<p>We also honour these AI-training opt-outs:</p>
					<ul className="list-disc list-outside pl-5">
						<li>
							<code className="font-mono text-(--text)">{'<meta name="robots" content="noai, noimageai">'}</code>
						</li>
						<li>
							the <code className="font-mono text-(--text)">X-Robots-Tag: noai</code> header
						</li>
						<li>
							TDM reservation (<code className="font-mono text-(--text)">tdm-reservation: 1</code>, TDMRep)
						</li>
					</ul>
					<p>
						Opt-outs apply from our next crawl of your site, and your content is excluded from all future training runs.
					</p>

					<h2 id="brand-protection" className="text-2xl font-bold text-(--text) pt-8">5. Fraud, phishing and brand protection</h2>
					<p>
						We help organisations find and act on phishing pages, fake stores, lookalike domains and other impersonation
						of their brand.
					</p>
					<ul className="list-disc list-outside pl-5 space-y-2">
						<li>
							<strong className="text-(--text)">Discovery:</strong> we monitor public signals such as newly registered and
							lookalike domains, certificate transparency logs, search results and our own crawl.
						</li>
						<li>
							<strong className="text-(--text)">Verification fetches:</strong> phishing sites often hide from known
							crawlers. To check a suspected fraudulent URL, we may fetch it with a standard browser identity instead of
							the sabakobot token, and regardless of its robots.txt. We do this only for URLs already flagged as
							suspected fraud, never for general crawling, and the content is never used for our index or AI training
							beyond fraud detection.
						</li>
						<li>
							<strong className="text-(--text)">Evidence:</strong> for confirmed cases we keep screenshots, page source,
							DNS, WHOIS and certificate records as evidence for the duration of the case and up to 12 months.
						</li>
						<li>
							<strong className="text-(--text)">Action:</strong> on behalf of the brand owner, and with their
							authorisation, we may report confirmed cases to registrars, hosting providers, browser safe-browsing lists
							and the relevant Indonesian authorities.
						</li>
					</ul>
					<p>
						If you believe your site was flagged by mistake, contact{' '}
						<a href="mailto:abuse@sabako.id" className="text-(--text) underline">abuse@sabako.id</a> and we will review it.
					</p>

					<h2 id="personal-data" className="text-2xl font-bold text-(--text) pt-8">6. Personal data</h2>
					<p>
						Public pages sometimes contain personal data. We follow Indonesia&apos;s Personal Data Protection Law (UU No. 27
						Tahun 2022):
					</p>
					<ul className="list-disc list-outside pl-5">
						<li>
							We filter direct identifiers (such as email addresses, phone numbers and national ID numbers) from AI
							training data.
						</li>
						<li>
							We do not use crawled data to identify or profile individuals, except where needed to investigate
							confirmed fraud cases (section 5).
						</li>
						<li>
							You can ask us to remove content about you from our index at{' '}
							<a href="mailto:privacy@sabako.id" className="text-(--text) underline">privacy@sabako.id</a>. See our{' '}
							<Link href="/privacy" className="text-(--text) underline">Privacy Policy</Link>.
						</li>
					</ul>

					<h2 id="behaviour" className="text-2xl font-bold text-(--text) pt-8">7. Crawl behaviour</h2>
					<ul className="list-disc list-outside pl-5">
						<li>
							We limit concurrent requests per site and slow down automatically on 429/503 responses or slow responses.
						</li>
						<li>
							We honour <code className="font-mono text-(--text)">Crawl-delay</code> and use conditional requests
							(<code className="font-mono text-(--text)">If-Modified-Since</code> / ETag) to avoid refetching unchanged pages.
						</li>
						<li>sabakobot fetches from our own servers, not through residential proxies.</li>
					</ul>

					<h2 id="verify" className="text-2xl font-bold text-(--text) pt-8">8. Verify it&apos;s really us</h2>
					<p>
						We are preparing a published list of sabakobot IP ranges and reverse DNS under{' '}
						<code className="font-mono text-(--text)">*.crawl.sabako.id</code>. Until it is live, if you see traffic
						claiming to be sabakobot or sabako-user and want to confirm it, email{' '}
						<a href="mailto:bot@sabako.id" className="text-(--text) underline">bot@sabako.id</a> with the IP address and
						timestamp and we will check it for you.
					</p>

					<h2 id="contact" className="text-2xl font-bold text-(--text) pt-8">9. Contact</h2>
					<ul className="list-disc list-outside pl-5">
						<li>
							Crawling issues, rate complaints and block requests:{' '}
							<a href="mailto:bot@sabako.id" className="text-(--text) underline">bot@sabako.id</a> (we aim to respond
							within 2 business days)
						</li>
						<li>
							Wrongly flagged as fraud:{' '}
							<a href="mailto:abuse@sabako.id" className="text-(--text) underline">abuse@sabako.id</a>
						</li>
						<li>
							Personal data requests:{' '}
							<a href="mailto:privacy@sabako.id" className="text-(--text) underline">privacy@sabako.id</a>
						</li>
					</ul>
				</div>
			</section>

			{/* Key points */}
			<section className="py-20 border-b border-(--border) bg-(--bg-subtle)" aria-labelledby="key-points-heading">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<h2 id="key-points-heading" className="text-2xl font-bold text-(--text) mb-12">
						Key Points
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-(--border)">
						{keyPoints.map((point) => {
							const Icon = point.icon
							return (
								<div key={point.title} className="bg-(--bg-subtle) p-8">
									<div className="p-2 border border-(--border) text-(--brand) bg-(--bg) w-fit mb-5">
										<Icon size={18} />
									</div>
									<h3 className="text-base font-bold text-(--text) mb-2">{point.title}</h3>
									<p className="text-sm text-(--text-muted) leading-relaxed">{point.description}</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20" aria-label="Contact call to action">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<p className="text-2xl font-bold text-(--text) max-w-sm">
						Questions about our crawlers?
					</p>
					<a
						href="mailto:bot@sabako.id"
						className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Email bot@sabako.id
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</section>
		</article>
	)
}
