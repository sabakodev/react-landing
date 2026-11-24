/**
 * Service catalog — single source of truth for every service list, the
 * JSON-LD graph and llms.txt.
 *
 * Server-only: unpublished draft copy must never reach client bundles.
 * Client components receive `ServiceSummary` props built by serviceSummaries().
 *
 * A service is shown anywhere only when `published` is true: it has a live
 * page, owner-approved copy and at least one tagged case study.
 */

import 'server-only'
import { localePrefix } from '@/lib/pageCopy'
import type { Locale } from '@/lib/pageCopy'
import type { ServiceIconKey } from '@/components/services/serviceIcons'

export type ServiceFaq = {
	question: string
	answer: string
}

/** Publicly nameable work shown on a service page (own products, joint projects, collaborations). */
export type ServiceShowcaseItem = {
	name: string
	/** Relationship to SABAKO, e.g. "Our product", "Research collaboration" */
	role: string
	blurb: string
	href?: string
}

export type ServicePartner = {
	name: string
	blurb: string
	href?: string
}

/** Localized copy (Phase 3). Every field is optional so English-only entries compile. */
export type ServiceLocaleCopy = Partial<{
	engagementNote: string
	name: string
	navLabel: string
	tagline: string
	summary: string
	description: string
	shortDescription: string
	highlights: string[]
	h1: string
	intro: string
	capabilities: string[]
	process: string[]
	faqs: ServiceFaq[]
	showcase: ServiceShowcaseItem[]
	partners: ServicePartner[]
	ctaLabel: string
	workLinkLabel: string
	metaTitle: string
	metaDescription: string
}>


export type Service = {
	slug: string
	/** Generic service name, used in schema `knowsAbout` / `Service.name` */
	name: string
	/** Brand label used in nav, footer and cards */
	navLabel: string
	tagline: string
	published: boolean
	/** Icon key, mapped to a component by serviceIcons (keeps catalog data serializable) */
	icon: ServiceIconKey
	/** One answer-first sentence */
	summary: string
	/** Card description (home + /services) */
	description: string
	/** One-line description (OtherServices) */
	shortDescription: string
	/** Short bullet list on the home services card */
	highlights: string[]
	h1: string
	intro: string
	capabilities: string[]
	techStack: string[]
	/** "Our Approach" paragraphs */
	process: string[]
	faqs: ServiceFaq[]
	/** WordPress category slug for this service's case studies */
	wpCategory: string
	/** `?service=` value understood by the contact form */
	contactValue: string
	contactLabel: string
	ctaLabel: string
	workLinkLabel: string
	metaTitle: string
	metaDescription: string
	/** Show the web pricing tiers (English pages only) */
	showPricing?: boolean
	/** Shown in place of related work when no case study can be published (e.g. NDA engagements) */
	engagementNote?: string
	/** Named work shown on the service page, independent of CMS case studies */
	showcase?: ServiceShowcaseItem[]
	partners?: ServicePartner[]
	/** Bahasa Indonesia copy (Phase 3) */
	id?: ServiceLocaleCopy
}

export const services: Service[] = [
	{
		slug: 'web',
		name: 'Web Development',
		navLabel: 'Digital Experiences',
		tagline: 'Websites, Web Apps & SaaS Platforms',
		published: true,
		icon: 'globe',
		summary:
			'SABAKO designs and builds websites, web applications, e-commerce and SaaS platforms for businesses in Indonesia and abroad.',
		description:
			'We design and build high-performance digital products — from corporate websites to complex SaaS platforms and e-commerce solutions that convert.',
		shortDescription: 'Websites, web apps, SaaS platforms, and e-commerce.',
		highlights: [
			'Corporate Websites',
			'Web Applications',
			'E-commerce & Marketplaces',
			'SaaS Platforms',
		],
		h1: 'Websites, Web Apps & SaaS Platforms.',
		intro:
			'We design and engineer digital products that perform — from sleek corporate sites to complex multi-tenant SaaS platforms trusted by enterprise clients.',
		capabilities: [
			'Company & marketing sites that pass Core Web Vitals',
			'Web apps, portals & internal dashboards',
			'E-commerce with local payment gateways',
			'Multi-tenant SaaS architecture',
			'API design & third-party integrations',
			'Headless CMS your team can edit',
			'Accessibility to WCAG 2.1 AA',
			'Built for traffic spikes (campaigns, launches)',
		],
		techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Vercel', 'Stripe', 'Prisma'],
		process: [
			'Week one is a short discovery: who visits, what they should do, and what the site must connect to. You get a written scope and a fixed quote from it.',
			'We design the key pages first and agree on them with you, then build on a stack chosen for the job — a static site for a company profile, a full application stack for a platform.',
			'Before launch we test speed on mobile data, accessibility and search basics. After launch you own the code, the domain and the accounts, with documentation your team or another vendor can pick up.',
		],
		faqs: [
			{
				question: 'Why not just use Wix or an AI site builder?',
				answer:
					'For a simple page, you can — our Starter tier competes on price with them. Choose us when the site has to be fast on mobile, rank on search, connect to your systems, or be maintained by someone accountable for it.',
			},
			{
				question: 'Who owns the website afterwards?',
				answer:
					'You do. The domain, the code and the hosting accounts are registered to your company, and we hand over access and documentation at launch.',
			},
		],
		wpCategory: 'web',
		contactValue: 'web',
		contactLabel: 'Digital Experiences (Web)',
		ctaLabel: 'Start a Web Project',
		workLinkLabel: 'See Our Web Work',
		metaTitle: 'Digital Experiences — Web Development',
		metaDescription:
			'SABAKO builds high-performance websites, web applications, SaaS platforms, and e-commerce solutions. Corporate sites to complex enterprise systems.',
		showPricing: true,
		// DRAFT — owner review required (Bahasa Indonesia copy)
		id: {
			name: 'Jasa Pembuatan Website',
			navLabel: 'Website & Aplikasi Web',
			tagline: 'Website, Aplikasi Web & Platform SaaS',
			summary:
				'SABAKO adalah software house di Jakarta yang menyediakan jasa pembuatan website, aplikasi web, e-commerce, dan platform SaaS untuk bisnis di Indonesia.',
			description:
				'Kami merancang dan membangun produk digital berperforma tinggi — mulai dari website perusahaan hingga platform SaaS dan e-commerce yang mendorong konversi.',
			shortDescription: 'Website, aplikasi web, platform SaaS, dan e-commerce.',
			highlights: ['Website Perusahaan', 'Aplikasi Web', 'E-commerce & Marketplace', 'Platform SaaS'],
			h1: 'Jasa Pembuatan Website, Aplikasi Web & Platform SaaS.',
			intro:
				'Kami merancang dan mengembangkan produk digital yang cepat dan andal — dari website company profile hingga platform SaaS multi-tenant untuk klien korporat.',
			capabilities: [
				'Website company profile & pemasaran yang lolos Core Web Vitals',
				'Aplikasi web, portal & dashboard internal',
				'E-commerce dengan payment gateway lokal',
				'Arsitektur SaaS multi-tenant',
				'Desain API & integrasi pihak ketiga',
				'Headless CMS yang bisa diedit tim Anda',
				'Aksesibilitas sesuai WCAG 2.1 AA',
				'Siap menghadapi lonjakan trafik (kampanye, peluncuran)',
			],
			process: [
				'Minggu pertama adalah discovery singkat: siapa pengunjungnya, apa yang harus mereka lakukan, dan sistem apa yang perlu terhubung. Dari situ Anda mendapat ruang lingkup tertulis dan penawaran harga tetap.',
				'Kami mendesain halaman-halaman utama lebih dulu dan menyepakatinya bersama Anda, lalu membangunnya dengan teknologi yang sesuai — situs statis untuk company profile, stack aplikasi lengkap untuk platform.',
				'Sebelum rilis kami menguji kecepatan di jaringan seluler, aksesibilitas, dan dasar-dasar SEO. Setelah rilis, kode, domain, dan akun menjadi milik Anda, lengkap dengan dokumentasi yang bisa dilanjutkan tim Anda atau vendor lain.',
			],
			faqs: [
				{
					question: 'Kenapa tidak pakai Wix atau AI website builder saja?',
					answer:
						'Untuk satu halaman sederhana, bisa saja — paket Starter kami bersaing harga dengan mereka. Pilih kami ketika situs harus cepat di ponsel, muncul di pencarian, terhubung ke sistem Anda, atau dirawat oleh pihak yang bertanggung jawab.',
				},
				{
					question: 'Siapa pemilik website setelah selesai?',
					answer:
						'Anda. Domain, kode, dan akun hosting terdaftar atas nama perusahaan Anda, dan kami menyerahkan akses serta dokumentasi saat rilis.',
				},
			],
			ctaLabel: 'Mulai Proyek Website',
			workLinkLabel: 'Lihat Portofolio Web',
			metaTitle: 'Jasa Pembuatan Website & Aplikasi Web di Jakarta',
			metaDescription:
				'Jasa pembuatan website, aplikasi web, e-commerce, dan platform SaaS oleh SABAKO, software house di Jakarta. Dari company profile hingga sistem enterprise.',
		},
	},
	{
		slug: 'mobile',
		name: 'Mobile App Development',
		navLabel: 'Mobile Products',
		tagline: 'iOS, Android & Cross-platform Apps',
		published: true,
		icon: 'smartphone',
		summary:
			'SABAKO builds native and cross-platform mobile apps for iOS and Android, from design through App Store and Play Store release.',
		description:
			'We craft intuitive, performant mobile experiences for iOS and Android. Whether native or cross-platform, we build apps that users love.',
		shortDescription: 'iOS, Android, and cross-platform apps.',
		highlights: [
			'iOS Applications',
			'Android Applications',
			'React Native & Flutter',
			'App Store Optimization',
		],
		h1: 'iOS, Android & Cross-platform Apps.',
		intro:
			'We craft intuitive, high-performance mobile experiences that users love to return to — built natively or cross-platform depending on your needs.',
		capabilities: [
			'iOS App Development (Swift)',
			'Android App Development (Kotlin)',
			'React Native (Cross-platform)',
			'Flutter (Cross-platform)',
			'App Store & Play Store Submission',
			'Push Notifications & Offline Mode',
			'Mobile UI/UX Design',
			'App Maintenance & Updates',
		],
		techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo', 'Redux', 'GraphQL'],
		process: [
			'We evaluate native vs cross-platform on a per-project basis — there is no one-size-fits-all answer. For maximum device integration and performance, we go native. For faster delivery across both platforms, React Native or Flutter.',
			'Mobile UX is a discipline of its own. Our designers follow platform-specific guidelines (HIG and Material Design) while maintaining your brand identity throughout the product.',
			'We handle the full release cycle — from App Store Connect setup to review submission and post-launch monitoring.',
		],
		faqs: [],
		wpCategory: 'mobile',
		contactValue: 'mobile',
		contactLabel: 'Mobile Products (App)',
		ctaLabel: 'Start a Mobile Project',
		workLinkLabel: 'See Our App Work',
		metaTitle: 'Mobile Products — App Development',
		metaDescription:
			'SABAKO builds native and cross-platform mobile apps for iOS and Android. From consumer apps to enterprise mobile solutions.',
		// DRAFT — owner review required (Bahasa Indonesia copy)
		id: {
			name: 'Jasa Pembuatan Aplikasi Mobile',
			navLabel: 'Aplikasi Mobile',
			tagline: 'Aplikasi iOS, Android & Cross-platform',
			summary:
				'SABAKO menyediakan jasa pembuatan aplikasi Android dan iOS, native maupun cross-platform, mulai dari desain hingga rilis di App Store dan Play Store.',
			description:
				'Kami membuat aplikasi mobile yang intuitif dan responsif untuk iOS dan Android. Native atau cross-platform, kami membangun aplikasi yang disukai pengguna.',
			shortDescription: 'Aplikasi iOS, Android, dan cross-platform.',
			highlights: ['Aplikasi iOS', 'Aplikasi Android', 'React Native & Flutter', 'Optimasi App Store'],
			h1: 'Jasa Pembuatan Aplikasi iOS, Android & Cross-platform.',
			intro:
				'Kami membuat aplikasi mobile yang intuitif dan berperforma tinggi sehingga pengguna senang kembali — dibangun secara native atau cross-platform sesuai kebutuhan Anda.',
			capabilities: [
				'Pengembangan Aplikasi iOS (Swift)',
				'Pengembangan Aplikasi Android (Kotlin)',
				'React Native (Cross-platform)',
				'Flutter (Cross-platform)',
				'Publikasi ke App Store & Play Store',
				'Push Notification & Mode Offline',
				'Desain UI/UX Mobile',
				'Pemeliharaan & Pembaruan Aplikasi',
			],
			process: [
				'Kami menilai pilihan native atau cross-platform untuk setiap proyek — tidak ada satu jawaban untuk semua. Untuk integrasi perangkat dan performa maksimal, kami memilih native. Untuk rilis lebih cepat di kedua platform, kami memakai React Native atau Flutter.',
				'UX mobile adalah disiplin tersendiri. Desainer kami mengikuti panduan masing-masing platform (HIG dan Material Design) sambil tetap menjaga identitas brand Anda.',
				'Kami menangani seluruh siklus rilis — dari penyiapan App Store Connect, pengajuan review, hingga pemantauan setelah aplikasi diluncurkan.',
			],
			ctaLabel: 'Mulai Proyek Aplikasi',
			workLinkLabel: 'Lihat Portofolio Aplikasi',
			metaTitle: 'Jasa Pembuatan Aplikasi Android & iOS di Jakarta',
			metaDescription:
				'Jasa pembuatan aplikasi Android dan iOS, native maupun cross-platform, oleh SABAKO, software house di Jakarta. Dari aplikasi konsumen hingga solusi enterprise.',
		},
	},
	// DRAFT — owner review required (IoT honesty pass: research, prototyping and advisory framing)
	{
		slug: 'iot',
		name: 'IoT Research & Prototyping',
		navLabel: 'Connected Systems',
		tagline: 'IoT Research, Prototyping & Architecture',
		published: true,
		icon: 'cpu',
		summary:
			'SABAKO runs IoT research and prototyping and gives architecture advice on connected systems — firmware, messaging and cloud ingestion — before teams commit to production hardware.',
		description:
			'We research, prototype, and advise on connected systems — from embedded firmware proofs-of-concept to IoT architecture reviews that de-risk your hardware roadmap.',
		shortDescription: 'IoT research, prototypes, and architecture advisory.',
		highlights: [
			'IoT Architecture Consulting',
			'Research Prototypes',
			'Embedded Firmware PoCs',
			'Dashboard Prototypes',
		],
		h1: 'IoT Research, Prototyping & Architecture Consulting.',
		intro:
			'We help teams test connected-device ideas before they scale — through research prototypes, proof-of-concept builds, and architecture advice spanning firmware, messaging, and cloud.',
		capabilities: [
			'IoT Architecture Consulting',
			'Proof-of-Concept & Prototype Builds',
			'Embedded Firmware Prototyping (C/C++)',
			'MQTT / CoAP Protocol Design',
			'Monitoring Dashboard Prototypes',
			'Cloud Connectivity Assessment (AWS IoT, Azure)',
			'Edge Computing Feasibility Studies',
			'Security & OTA Update Strategy Review',
		],
		techStack: ['Embedded C', 'MQTT', 'Node.js', 'TimescaleDB', 'InfluxDB', 'AWS IoT', 'Grafana', 'React'],
		process: [
			'IoT projects fail most often at the integration layer. We de-risk this from the start by sketching the full system architecture — firmware, messaging protocol, cloud ingestion, and UI — before any hardware is ordered.',
			'Our research prototypes are built around the real-world constraints of embedded systems: memory-limited microcontrollers, intermittent connectivity, and long device lifespans that need a secure OTA update strategy.',
			'Each prototype ends with a clear recommendation — what worked, what did not, and what a production rollout would require — so you can decide with evidence rather than assumptions.',
		],
		faqs: [],
		wpCategory: 'iot',
		contactValue: 'iot',
		contactLabel: 'Connected Systems (IoT)',
		ctaLabel: 'Discuss an IoT Idea',
		workLinkLabel: 'See Our IoT Research',
		metaTitle: 'Connected Systems — IoT Research & Prototyping',
		metaDescription:
			'SABAKO offers IoT research, prototyping and architecture consulting — embedded firmware proofs-of-concept, protocol design, and connected-system advisory.',
		// DRAFT — owner review required (Bahasa Indonesia copy)
		id: {
			name: 'Jasa IoT: Riset & Prototipe',
			navLabel: 'Riset & Prototipe IoT',
			tagline: 'Riset, Prototipe & Arsitektur IoT',
			summary:
				'SABAKO menyediakan jasa IoT berupa riset, pembuatan prototipe, dan konsultasi arsitektur sistem terhubung — firmware, protokol pesan, dan integrasi cloud — sebelum Anda berinvestasi pada perangkat produksi.',
			description:
				'Kami meriset, membuat prototipe, dan memberi saran untuk sistem terhubung — dari proof-of-concept firmware hingga tinjauan arsitektur IoT yang mengurangi risiko rencana perangkat keras Anda.',
			shortDescription: 'Riset IoT, prototipe, dan konsultasi arsitektur.',
			highlights: ['Konsultasi Arsitektur IoT', 'Prototipe Riset', 'PoC Firmware Embedded', 'Prototipe Dashboard'],
			h1: 'Jasa IoT: Riset, Prototipe & Konsultasi Arsitektur.',
			intro:
				'Kami membantu tim menguji ide perangkat terhubung sebelum diproduksi massal — melalui prototipe riset, proof-of-concept, dan konsultasi arsitektur dari firmware, protokol pesan, hingga cloud.',
			capabilities: [
				'Konsultasi Arsitektur IoT',
				'Pembuatan Proof-of-Concept & Prototipe',
				'Prototipe Firmware Embedded (C/C++)',
				'Desain Protokol MQTT / CoAP',
				'Prototipe Dashboard Monitoring',
				'Kajian Konektivitas Cloud (AWS IoT, Azure)',
				'Studi Kelayakan Edge Computing',
				'Tinjauan Keamanan & Strategi Pembaruan OTA',
			],
			process: [
				'Proyek IoT paling sering gagal di lapisan integrasi. Kami mengurangi risiko ini sejak awal dengan merancang arsitektur sistem secara utuh — firmware, protokol pesan, ingest data ke cloud, dan antarmuka — sebelum perangkat keras dipesan.',
				'Prototipe riset kami dibangun dengan memperhatikan batasan nyata sistem embedded: mikrokontroler dengan memori terbatas, koneksi yang tidak selalu stabil, dan umur perangkat yang panjang sehingga membutuhkan strategi pembaruan OTA yang aman.',
				'Setiap prototipe diakhiri dengan rekomendasi yang jelas — apa yang berhasil, apa yang tidak, dan apa yang dibutuhkan untuk implementasi produksi — sehingga Anda bisa mengambil keputusan berdasarkan bukti.',
			],
			ctaLabel: 'Diskusikan Ide IoT',
			workLinkLabel: 'Lihat Riset IoT Kami',
			metaTitle: 'Jasa IoT — Riset, Prototipe & Konsultasi Arsitektur',
			metaDescription:
				'Jasa IoT dari SABAKO di Jakarta: riset, pembuatan prototipe, proof-of-concept firmware, desain protokol, dan konsultasi arsitektur sistem terhubung.',
		},
	},
	// Published on owner request (2026-11-24). Client work is under NDA, so engagementNote stands in for case studies.
	{
		slug: 'ai',
		name: 'AI & Machine Learning Engineering',
		navLabel: 'Applied AI',
		tagline: 'AI Features, ML Pipelines & LLM Integration',
		published: true,
		icon: 'brain',
		summary:
			'SABAKO builds AI and machine-learning features into business software — LLM integrations, retrieval over company documents, visual AI for images and video, and data pipelines for prediction and classification.',
		description:
			'We turn AI from a demo into a dependable feature — integrating language models, retrieval, computer vision and machine-learning models into the products and workflows your team already uses.',
		shortDescription: 'LLM integration, visual AI, and ML pipelines.',
		highlights: [
			'LLM Integration',
			'Visual AI & Computer Vision',
			'Retrieval over Company Data',
			'ML Model Pipelines',
		],
		h1: 'AI & Machine Learning, Built into Your Product.',
		intro:
			'We design, build and evaluate AI features that solve a specific business problem — from language models to visual AI — with clear data boundaries, measurable quality, and costs you can predict.',
		capabilities: [
			'LLM Integration (chat, summarization, extraction)',
			'Retrieval-Augmented Generation over Internal Documents',
			'Image & Video Recognition',
			'OCR & Document Vision',
			'People Analytics (detection, counting) with privacy controls',
			'Multimodal LLM Apps (images, screenshots, forms)',
			'Document & Data Classification',
			'Forecasting & Prediction Models',
			'Data Pipelines & Feature Engineering',
			'Evaluation Sets & Quality Monitoring',
			'Prompt & Cost Optimization',
			'Privacy-aware Deployment (cloud or on-premise)',
		],
		techStack: ['Python', 'PyTorch', 'scikit-learn', 'OpenCV', 'YOLO', 'LangChain', 'PostgreSQL + pgvector', 'FastAPI', 'Node.js', 'Docker'],
		process: [
			'We start by defining the decision or task the model must support, and how we will measure whether it does — before choosing a model.',
			'We build a small, testable slice first: a representative dataset, an evaluation set, and a working prototype your team can try with real inputs.',
			'Once the quality bar is met, we harden the feature for production — monitoring, fallbacks, access control and cost limits — and hand over documentation your team can maintain.',
		],
		faqs: [
			{
				question: 'Can you work with confidential company data?',
				answer:
					'Yes. We scope data access up front, can deploy models inside your own cloud account or on-premise, and work under NDA.',
			},
			{
				question: 'Do we need our own training data?',
				answer:
					'Not always. Many use cases start with an existing language model plus your documents. Custom training is recommended only when evaluation shows it is needed.',
			},
			{
				question: 'Do you work with images and video?',
				answer:
					'Yes. We build image and video recognition, OCR and document vision, people detection and counting, and multimodal apps where a language model reads images, screenshots or forms.',
			},
			{
				question: 'How do you handle face and personal data?',
				answer:
					'We run models on-premise or in a cloud region in your country, so personal data never leaves your jurisdiction, and we set consent and retention rules per project. This supports compliance with Indonesia\'s PDP Law, GDPR and similar regulations.',
			},
		],
		showcase: [
			{
				name: 'ExploiterID',
				role: 'Our product',
				blurb: 'Our own security platform: a CVE monitoring API and open security tools.',
				href: 'https://exploiter.id/',
			},
			{
				name: 'RoxyAI Router',
				role: 'Joint project · ExploiterID × 99syn',
				blurb: 'An LLM router that sends each request to the model that fits its cost, speed and quality budget.',
			},
			{
				name: 'Dahono Labs',
				role: 'Research collaboration',
				blurb: 'An AI platform for contract and regulation analysis.',
				href: 'https://labs.dahono.com/',
			},
		],
		partners: [
			{
				name: 'Netra',
				blurb: 'AI inference platform — fast, efficient model serving through one API.',
				href: 'https://netra.sh/',
			},
			{
				name: 'Perfect10',
				blurb: 'AI consultancy building data-connected agents and workflow automation.',
				href: 'https://perfect10.id/',
			},
		],
		engagementNote:
			'Beyond the work above, we have delivered AI and machine-learning projects for several clients under non-disclosure agreements, so their names and details are not published here. We are glad to walk you through relevant engagements, anonymised, on a call.',
		wpCategory: 'ai',
		contactValue: 'ai',
		contactLabel: 'Applied AI (AI/ML)',
		ctaLabel: 'Discuss an AI Project',
		workLinkLabel: 'Our AI Engagements',
		metaTitle: 'Applied AI — AI & Machine Learning Engineering',
		metaDescription:
			'SABAKO builds AI and machine-learning features: LLM integration, retrieval over company documents, visual AI and computer vision, classification and prediction pipelines, with evaluation built in.',
		// DRAFT — owner review required (Bahasa Indonesia copy)
		id: {
			name: 'Jasa Pengembangan AI & Machine Learning',
			navLabel: 'AI Terapan',
			tagline: 'Fitur AI, Pipeline ML & Integrasi LLM',
			summary:
				'SABAKO membangun fitur AI dan machine learning ke dalam software bisnis — integrasi LLM, pencarian atas dokumen perusahaan, AI visual untuk gambar dan video, serta pipeline data untuk prediksi dan klasifikasi.',
			description:
				'Kami mengubah AI dari sekadar demo menjadi fitur yang andal — mengintegrasikan model bahasa, retrieval, computer vision, dan model machine learning ke produk dan alur kerja yang sudah dipakai tim Anda.',
			shortDescription: 'Integrasi LLM, AI visual, dan pipeline ML.',
			highlights: ['Integrasi LLM', 'AI Visual & Computer Vision', 'Pencarian atas Data Perusahaan', 'Pipeline Model ML'],
			h1: 'AI & Machine Learning, Langsung di Produk Anda.',
			intro:
				'Kami merancang, membangun, dan mengevaluasi fitur AI untuk masalah bisnis yang spesifik — dari model bahasa hingga AI visual — dengan batas data yang jelas, kualitas yang terukur, dan biaya yang bisa diprediksi.',
			capabilities: [
				'Integrasi LLM (chat, ringkasan, ekstraksi)',
				'Retrieval-Augmented Generation atas Dokumen Internal',
				'Pengenalan Gambar & Video',
				'OCR & Document Vision',
				'People Analytics (deteksi, penghitungan) dengan kontrol privasi',
				'Aplikasi LLM Multimodal (gambar, tangkapan layar, formulir)',
				'Klasifikasi Dokumen & Data',
				'Model Prediksi & Forecasting',
				'Pipeline Data & Feature Engineering',
				'Set Evaluasi & Pemantauan Kualitas',
				'Optimasi Prompt & Biaya',
				'Deployment yang Menjaga Privasi (cloud atau on-premise)',
			],
			process: [
				'Kami mulai dengan menentukan keputusan atau tugas yang harus didukung model, dan cara mengukur apakah model berhasil — sebelum memilih model.',
				'Kami membangun potongan kecil yang bisa diuji lebih dulu: dataset yang representatif, set evaluasi, dan prototipe yang bisa dicoba tim Anda dengan input nyata.',
				'Setelah standar kualitas tercapai, kami menyiapkan fitur untuk produksi — monitoring, fallback, kontrol akses, dan batas biaya — lalu menyerahkan dokumentasi yang bisa dirawat tim Anda.',
			],
			faqs: [
				{
					question: 'Apakah Anda bisa bekerja dengan data perusahaan yang rahasia?',
					answer:
						'Bisa. Kami menentukan akses data sejak awal, dapat men-deploy model di akun cloud Anda sendiri atau on-premise, dan bekerja di bawah NDA.',
				},
				{
					question: 'Apakah kami perlu punya data training sendiri?',
					answer:
						'Tidak selalu. Banyak kasus bisa dimulai dengan model bahasa yang sudah ada ditambah dokumen Anda. Training khusus hanya kami sarankan jika hasil evaluasi menunjukkan perlu.',
				},
				{
					question: 'Apakah Anda menangani gambar dan video?',
					answer:
						'Ya. Kami membangun pengenalan gambar dan video, OCR dan document vision, deteksi dan penghitungan orang, serta aplikasi multimodal di mana model bahasa membaca gambar, tangkapan layar, atau formulir.',
				},
				{
					question: 'Bagaimana Anda menangani data wajah dan data pribadi?',
					answer:
						'Kami menjalankan model secara on-premise atau di region cloud di negara Anda, sehingga data pribadi tidak keluar dari yurisdiksi Anda, dan kami menetapkan aturan persetujuan serta retensi per proyek. Ini mendukung kepatuhan terhadap UU PDP, GDPR, dan regulasi serupa.',
				},
			],
			showcase: [
				{
					name: 'ExploiterID',
					role: 'Produk kami',
					blurb: 'Platform keamanan milik kami: API pemantauan CVE dan open security tools.',
					href: 'https://exploiter.id/',
				},
				{
					name: 'RoxyAI Router',
					role: 'Proyek bersama · ExploiterID × 99syn',
					blurb: 'Router LLM yang mengarahkan setiap permintaan ke model yang sesuai dengan anggaran biaya, kecepatan, dan kualitasnya.',
				},
				{
					name: 'Dahono Labs',
					role: 'Kolaborasi riset',
					blurb: 'Platform AI untuk analisis kontrak dan regulasi.',
					href: 'https://labs.dahono.com/',
				},
			],
			partners: [
				{
					name: 'Netra',
					blurb: 'Platform inferensi AI — menjalankan model dengan cepat dan efisien lewat satu API.',
					href: 'https://netra.sh/',
				},
				{
					name: 'Perfect10',
					blurb: 'Konsultan AI yang membangun agen berbasis data dan otomasi alur kerja.',
					href: 'https://perfect10.id/',
				},
			],
			engagementNote:
				'Selain karya di atas, kami telah mengerjakan proyek AI dan machine learning untuk beberapa klien di bawah perjanjian kerahasiaan (NDA), sehingga nama dan detailnya tidak kami publikasikan. Kami dengan senang hati menjelaskan proyek yang relevan secara anonim lewat panggilan.',
			ctaLabel: 'Diskusikan Proyek AI',
			workLinkLabel: 'Proyek AI Kami',
			metaTitle: 'AI Terapan — Jasa Pengembangan AI & Machine Learning',
			metaDescription:
				'SABAKO membangun fitur AI dan machine learning: integrasi LLM, pencarian atas dokumen perusahaan, AI visual dan computer vision, serta pipeline klasifikasi dan prediksi, dengan evaluasi bawaan.',
		},
	},
	// DRAFT — owner review required
	{
		slug: 'software-engineering',
		name: 'Custom Software Engineering',
		navLabel: 'Software Engineering',
		tagline: 'Custom Systems, APIs & Integrations',
		published: false,
		icon: 'code',
		summary:
			'SABAKO engineers custom business software — internal systems, APIs and integrations — and modernizes legacy applications.',
		description:
			'We build the systems behind the screen — internal tools, APIs, integrations and back-office platforms — and modernize legacy software without stopping the business.',
		shortDescription: 'Custom systems, APIs, and legacy modernization.',
		highlights: [
			'Custom Business Systems',
			'API & Integration Development',
			'Legacy Modernization',
			'Cloud & DevOps',
		],
		h1: 'Custom Software, Engineered to Last.',
		intro:
			'We design and build business software that fits how your organization actually works — maintainable, documented, and ready to grow with you.',
		capabilities: [
			'Custom Business & Back-office Systems',
			'REST & GraphQL API Development',
			'Third-party & ERP Integrations',
			'Legacy Application Modernization',
			'Database Design & Migration',
			'Cloud Infrastructure & CI/CD',
			'Automated Testing & Code Review',
			'Technical Documentation & Handover',
		],
		techStack: ['TypeScript', 'Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP'],
		process: [
			'We map the workflows, data and existing systems first, so the software we build fits your operations instead of forcing new ones.',
			'We deliver in short, reviewable increments with automated tests and continuous deployment, so you see working software early and often.',
			'Every engagement ends with documentation and a handover plan, whether your team takes over or we stay on for maintenance.',
		],
		faqs: [
			{
				question: 'Can you take over an existing codebase?',
				answer:
					'Yes. We start with a technical assessment of the code, infrastructure and risks, then agree on a stabilization and improvement plan.',
			},
		],
		wpCategory: 'software-engineering',
		contactValue: 'software-engineering',
		contactLabel: 'Software Engineering',
		ctaLabel: 'Start a Software Project',
		workLinkLabel: 'See Our Engineering Work',
		metaTitle: 'Software Engineering — Custom Systems & APIs',
		metaDescription:
			'SABAKO engineers custom business software: internal systems, APIs, integrations and legacy modernization, delivered with tests, CI/CD and documentation.',
	},
	// DRAFT — owner review required
	{
		slug: 'consulting',
		name: 'IT Consulting',
		navLabel: 'IT Consulting',
		tagline: 'Technology Strategy, Architecture & Audits',
		published: false,
		icon: 'lightbulb',
		summary:
			'SABAKO provides IT consulting — technology strategy, solution architecture, and technical audits — to help businesses plan and de-risk software investments.',
		description:
			'We help you make technology decisions with confidence — from choosing a platform and planning a roadmap to auditing an existing system or vendor proposal.',
		shortDescription: 'Strategy, architecture, and technical audits.',
		highlights: [
			'Technology Strategy',
			'Solution Architecture',
			'Technical Audits',
			'Vendor & RFP Support',
		],
		h1: 'IT Consulting for Confident Technology Decisions.',
		intro:
			'We give independent, practical advice on what to build, buy or fix — grounded in hands-on engineering experience.',
		capabilities: [
			'Digital Transformation Roadmaps',
			'Solution & Cloud Architecture',
			'Codebase & Infrastructure Audits',
			'Build-vs-Buy Assessments',
			'Vendor Selection & RFP Preparation',
			'Project Rescue & Delivery Reviews',
			'Team & Process Advisory',
		],
		techStack: [],
		process: [
			'We begin with structured interviews and a review of your current systems, goals and constraints.',
			'We deliver a written recommendation with options, trade-offs, rough costs and a phased plan — not just a slide deck.',
			'If you choose to proceed, we can help you execute, hand the plan to your team, or review a vendor’s delivery against it.',
		],
		faqs: [
			{
				question: 'Do we have to hire SABAKO to build the recommendation?',
				answer:
					'No. Consulting engagements are standalone. The recommendation is yours to execute with any team.',
			},
		],
		wpCategory: 'consulting',
		contactValue: 'consulting',
		contactLabel: 'IT Consulting',
		ctaLabel: 'Book a Consultation',
		workLinkLabel: 'See Our Advisory Work',
		metaTitle: 'IT Consulting — Strategy, Architecture & Audits',
		metaDescription:
			'SABAKO provides IT consulting: technology strategy, solution architecture, codebase audits and vendor selection for businesses in Indonesia.',
	},
]

/** Services that may be shown anywhere on the site. */
export function publishedServices(): Service[] {
	return services.filter((s) => s.published)
}

/** Published services that have Bahasa Indonesia copy (served under /id). */
export function publishedServicesId(): Service[] {
	return publishedServices().filter((s) => s.id)
}

/** A service with its copy for the given locale merged over the English copy. */
export function localizeService(service: Service, locale: Locale): Service {
	return locale === 'id' && service.id ? { ...service, ...service.id } : service
}

/** Look up a service by slug. Throws if the slug is not in the catalog. */
export function getService(slug: string): Service {
	const service = services.find((s) => s.slug === slug)
	if (!service) throw new Error(`Unknown service slug: ${slug}`)
	return service
}

export function serviceHref(service: Service, locale: Locale = 'en'): string {
	return `${localePrefix(locale)}/services/${service.slug}`
}

/** Serializable, published-only service data for client components. */
export type ServiceSummary = {
	slug: string
	href: string
	name: string
	navLabel: string
	tagline: string
	description: string
	highlights: string[]
	contactValue: string
	contactLabel: string
	icon: ServiceIconKey
}

export function serviceSummaries(locale: Locale = 'en'): ServiceSummary[] {
	return (locale === 'id' ? publishedServicesId() : publishedServices()).map((service) => {
		const s = localizeService(service, locale)
		return {
			slug: s.slug,
			href: serviceHref(s, locale),
			name: s.name,
			navLabel: s.navLabel,
			tagline: s.tagline,
			description: s.description,
			highlights: s.highlights,
			contactValue: s.contactValue,
			contactLabel: s.contactLabel,
			icon: s.icon,
		}
	})
}
