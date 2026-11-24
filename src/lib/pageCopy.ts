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
	},
	// DRAFT — owner review required (Bahasa Indonesia copy)
	id: {
		homeEyebrow: 'Software House & Konsultan IT — Jakarta, Indonesia',
		homeH1: 'Software house di Jakarta untuk jasa pembuatan website, aplikasi mobile, dan riset IoT.',
		homeIntro:
			'SABAKO membantu bisnis di Indonesia membangun website, aplikasi web, dan aplikasi Android/iOS, serta menyediakan riset, prototipe, dan konsultasi IoT.',
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
		servicesMetaTitle: 'Layanan — Jasa Pembuatan Website, Aplikasi & IoT',
		servicesMetaDescription:
			'Layanan SABAKO, software house di Jakarta: jasa pembuatan website dan aplikasi web, jasa pembuatan aplikasi Android dan iOS, serta riset dan prototipe IoT.',
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
	},
} satisfies Record<Locale, Record<string, string>>
