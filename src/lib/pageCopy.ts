/**
 * Locale helpers and shared page copy (home, /services, service template).
 * Contains only published copy, so it is safe to import from client components.
 */

export type Locale = 'en' | 'id'

/** Path prefix for a locale: '' for English, '/id' for Bahasa Indonesia. */
export function localePrefix(locale: Locale): string {
	return locale === 'id' ? '/id' : ''
}

/** Shared page copy (home, /services, service template) per locale. The `home*` keys exist only for the /id landing. */
export const pageCopy = {
	en: {
		servicesSectionEyebrow: 'What We Do',
		servicesSectionHeading: 'Services built for impact.',
		learnMore: 'Learn More',
		learnMoreAbout: 'Learn more about',
		servicesEyebrow: 'Services',
		servicesH1: 'End-to-end technology, delivered.',
		servicesIntro:
			'From early-stage consulting to production-ready products — we cover the full spectrum of digital development.',
		servicesMetaTitle: 'Services',
		servicesMetaDescription:
			"Explore SABAKO's services — Digital Experiences (Web), Mobile Products (App), Connected Systems (IoT), and Applied AI (AI/ML). End-to-end technology consulting.",
		explore: 'Explore',
		consultHeading: 'Not sure which service you need?',
		consultBody:
			'We offer free initial consultations to help scope your project and recommend the right approach.',
		consultButton: 'Schedule a Consultation',
		home: 'Home',
		services: 'Services',
		whatWeDeliver: 'What We Deliver',
		ourApproach: 'Our Approach',
		techStack: 'Technology Stack',
		faqHeading: 'Frequently Asked Questions',
		relatedWork: 'Related Work',
		clientEngagements: 'Client Engagements',
		otherServices: 'Explore Other Services',
		showcaseHeading: 'Selected Work',
		partnersHeading: 'Partners',
		externalLinkLabel: 'opens in a new tab',
		ideaEyebrow: '// Something unusual?',
		ideaHeading: 'Any wild idea?',
		ideaVerbs: 'Name it.|Dream it.|Sketch it.',
		ideaPromise: "We'll build it.",
		ideaCta: 'Free consultation',
		ideaMicrocopy: 'Free initial consultation · no brief needed',
	},
	// DRAFT — owner review required (Bahasa Indonesia copy)
	id: {
		homeEyebrow: 'Software House & Konsultan IT — Jakarta, Indonesia',
		homeH1: 'Software house di Jakarta untuk jasa pembuatan website, aplikasi mobile, riset IoT, dan solusi AI.',
		homeIntro:
			'SABAKO membantu bisnis di Indonesia membangun website, aplikasi web, aplikasi Android/iOS, dan fitur AI, serta menyediakan riset, prototipe, dan konsultasi IoT.',
		homeMetaTitle: 'SABAKO — Software House & Jasa Pembuatan Aplikasi di Jakarta',
		startProject: 'Mulai Proyek',
		viewWork: 'Lihat Portofolio',
		servicesSectionEyebrow: 'Layanan Kami',
		servicesSectionHeading: 'Layanan yang berdampak nyata.',
		learnMore: 'Selengkapnya',
		learnMoreAbout: 'Selengkapnya tentang',
		servicesEyebrow: 'Layanan',
		servicesH1: 'Teknologi dari hulu ke hilir.',
		servicesIntro:
			'Dari konsultasi awal hingga produk yang siap produksi — kami menangani seluruh proses pengembangan digital.',
		servicesMetaTitle: 'Layanan — Jasa Pembuatan Website, Aplikasi, IoT & AI',
		servicesMetaDescription:
			'Layanan SABAKO, software house di Jakarta: jasa pembuatan website dan aplikasi web, jasa pembuatan aplikasi Android dan iOS, riset dan prototipe IoT, serta pengembangan AI dan machine learning.',
		explore: 'Lihat Detail',
		consultHeading: 'Belum yakin layanan mana yang Anda butuhkan?',
		consultBody:
			'Kami menyediakan konsultasi awal gratis untuk membantu menentukan ruang lingkup proyek dan pendekatan yang tepat.',
		consultButton: 'Jadwalkan Konsultasi',
		home: 'Beranda',
		services: 'Layanan',
		whatWeDeliver: 'Yang Kami Kerjakan',
		ourApproach: 'Pendekatan Kami',
		techStack: 'Teknologi',
		faqHeading: 'Pertanyaan yang Sering Diajukan',
		relatedWork: 'Portofolio Terkait',
		clientEngagements: 'Proyek Klien',
		otherServices: 'Layanan Lainnya',
		showcaseHeading: 'Karya Pilihan',
		partnersHeading: 'Mitra',
		externalLinkLabel: 'terbuka di tab baru',
		ideaEyebrow: '// Sesuatu yang tidak biasa?',
		ideaHeading: 'Punya ide gila?',
		ideaVerbs: 'Sebutkan.|Impikan.|Coret-coret.',
		ideaPromise: 'Kami yang bangun.',
		ideaCta: 'Konsultasi gratis',
		ideaMicrocopy: 'Konsultasi awal gratis · tanpa perlu brief',
	},
} satisfies Record<Locale, Record<string, string>>
