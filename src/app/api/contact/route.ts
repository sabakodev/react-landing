import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

/**
 * Contact form submission — internal API route.
 *
 * Validates and sanitizes input server-side.
 * Stores the submission in Firestore.
 *
 * POST /api/contact
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContactSubmission = {
	id: string           // generated UUID
	name: string
	email: string
	message: string
	segment: {
		service: string
		companySize: string
		preference: string
	}
	/** e.g. IP address, user-agent — omit if privacy-sensitive */
	meta?: {
		userAgent?: string
		ipAddress?: string
		country?: string
		city?: string
	}
}

type ContactFormPayload = {
	name: string
	email: string
	service?: string
	companySize?: string
	preference?: string
	message: string
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function sanitize(value: unknown): string {
	if (typeof value !== 'string') return ''
	// Strip leading/trailing whitespace and basic HTML
	return value.trim().replace(/<[^>]*>/g, '').slice(0, 2000)
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(payload: ContactFormPayload): string | null {
	if (!payload.name || payload.name.length < 2) return 'Name must be at least 2 characters.'
	if (!payload.email || !isValidEmail(payload.email)) return 'A valid email address is required.'
	if (!payload.message || payload.message.length < 10) return 'Message must be at least 10 characters.'
	return null
}

// ---------------------------------------------------------------------------
// Webhook helpers
// ---------------------------------------------------------------------------

async function sendDiscordWebhook(entry: ContactSubmission) {
	const webhookUrl = process.env.DISCORD_WEBHOOK_URL
	if (!webhookUrl) return

	const embed = {
		title: 'New Contact Form Submission',
		color: 16735270, // Matches Sabako brand
		fields: [
			{ name: 'Name', value: entry.name || 'N/A', inline: true },
			{ name: 'Email', value: entry.email || 'N/A', inline: true },
			{ name: 'Service', value: entry.segment.service || 'N/A', inline: true },
			{ name: 'Company Size', value: entry.segment.companySize || 'N/A', inline: true },
			{ name: 'Preference', value: entry.segment.preference || 'N/A', inline: true },
			{ name: 'Location', value: `${entry.meta?.city || 'Unknown'}, ${entry.meta?.country || 'Unknown'}`, inline: true },
			{ name: 'Message', value: entry.message || 'N/A' },
		],
		footer: { text: `IP: ${entry.meta?.ipAddress || 'Unknown'} | User Agent: ${entry.meta?.userAgent?.slice(0, 40) || 'Unknown'}` },
		timestamp: new Date().toISOString(),
	}

	try {
		await fetch(webhookUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ embeds: [embed] }),
		})
	} catch (error) {
		console.error('Discord webhook failed:', error)
	}
}

async function sendTelegramWebhook(entry: ContactSubmission) {
	const botToken = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID
	if (!botToken || !chatId) return

	const header = [
		{
			label: 'Name',
			content: entry.name,
		},
		{
			label: 'Email',
			content: entry.email,
		},
		{
			label: 'Service',
			content: entry.segment.service || 'N/A',
		},
		{
			label: 'Company',
			content: entry.segment.companySize || 'N/A',
		},
		{
			label: 'Location',
			content: `${entry.meta?.city || 'Unknown'}, ${entry.meta?.country || 'Unknown'}`
		}
	].map((item) => `<b>${item.label}</b>: ${item.content}`).join('\n')

	const text = `<b>New Contact Form Submission</b>\n\n${header}\n\n<b>Message:</b>\n${entry.message}`.trim()

	try {
		await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: 'HTML',
			}),
		})
	} catch (error) {
		console.error('Telegram webhook failed:', error)
	}
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
	let body: unknown
	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
	}

	const raw = body as Record<string, unknown>

	const payload: ContactFormPayload = {
		name: sanitize(raw.name),
		email: sanitize(raw.email),
		service: sanitize(raw.service),
		companySize: sanitize(raw.companySize),
		preference: sanitize(raw.preference),
		message: sanitize(raw.message),
	}

	const validationError = validate(payload)
	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 422 })
	}

	const ip = req.headers.get('cf-connecting-ip') ?? (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0].trim()

	const entry: ContactSubmission = {
		id: crypto.randomUUID(),
		name: payload.name,
		email: payload.email,
		message: payload.message,
		segment: {
			service: payload.service ?? '',
			companySize: payload.companySize ?? '',
			preference: payload.preference ?? '',
		},
		meta: {
			userAgent: req.headers.get('user-agent') ?? '',
			ipAddress: ip,
			country: req.headers.get('x-vercel-ip-country') ?? '',
			city: req.headers.get('x-vercel-ip-city') ?? '',
		},
	}

	try {
		// Save submission to Firestore
		await db.collection('contact_submissions').doc(entry.id).set({
			...entry,
			createdAt: new Date()
		})
	} catch (error) {
		console.error('Failed to save to Firestore:', error)
		return NextResponse.json(
			{ error: 'Failed to submit form. Please try again later.' },
			{ status: 500 }
		)
	}

	// Fire webhooks asynchronously so they don't block the request if they are slow
	Promise.allSettled([
		sendDiscordWebhook(entry),
		sendTelegramWebhook(entry),
	]).catch((err) => console.error('Webhook execution error:', err))

	return NextResponse.json(
		{ success: true, id: entry.id },
		{ status: 201 },
	)
}

/** Only POST is supported */
export async function GET() {
	return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
