import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { z } from 'zod';

const answerSchema = z.object({
	questionId: z.string().max(100),
	question: z.string().max(500),
	optionId: z.string().max(100),
	answer: z.string().max(500),
	detail: z.string().max(2000).optional(),
});

const leadSchema = z.object({
	funnel: z.string().min(1).max(100),
	company: z.string().min(2, 'Bitte den Firmennamen angeben.').max(200),
	name: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben.').max(100),
	email: z.string().email('Bitte eine gueltige E-Mail-Adresse eingeben.'),
	phone: z.string().max(50).optional(),
	answers: z.array(answerSchema).max(20),
	utm: z.record(z.string(), z.string().max(500)).optional(),
	page: z.string().max(2000).optional(),
	eventId: z.string().max(100).optional(),
	/**
	 * Kennung des versendeten Briefs (Brief-Kanal /b/). Kommt als `?r=` an der
	 * Landingpage an und wird nur durchgereicht — die Zuordnung Kennung → Firma
	 * liegt ausschliesslich im lokalen Sales-Backend, nicht hier.
	 *
	 * Bewusst ein eigenes Feld statt eines Eintrags in `utm`: Die Brief-ID ist
	 * kein Kampagnen-Parameter, und im utm-Record waere sie in Mail und Blob
	 * schwer auffindbar.
	 */
	letterRef: z.string().max(50).optional(),
	honeypot: z.string().max(0),
});

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

const parseJson = (value: string, fallback: unknown) => {
	try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
};

// SHA-256-Hash (hex), wie von der Meta Conversions API für PII gefordert.
const sha256 = async (value: string): Promise<string> => {
	const bytes = new TextEncoder().encode(value);
	const digest = await crypto.subtle.digest('SHA-256', bytes);
	return Array.from(new Uint8Array(digest))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
};

// Meta verlangt Normalisierung (trim + lowercase) vor dem Hashen.
const hashField = (value?: string) => {
	const normalized = value?.trim().toLowerCase();
	return normalized ? sha256(normalized) : undefined;
};

// Telefonnummer: nur Ziffern behalten (Meta-Empfehlung), dann hashen.
const hashPhone = (value?: string) => {
	const digits = value?.replace(/[^0-9]/g, '');
	return digits ? sha256(digits) : undefined;
};

interface CapiInput {
	pixelId: string;
	token: string;
	eventId?: string;
	email: string;
	phone?: string;
	name: string;
	fbp?: string;
	fbc?: string;
	fbclid?: string;
	sourceUrl?: string;
	clientIp?: string;
	userAgent?: string;
	receivedAt: string;
	testEventCode?: string;
}

// Serverseitiges Lead-Event an die Meta Conversions API senden.
// Läuft best-effort: Fehler dürfen die Lead-Verarbeitung nie blockieren.
const sendMetaCapiLead = async (input: CapiInput): Promise<void> => {
	const nameParts = input.name.trim().split(/\s+/);
	const firstName = nameParts[0];
	const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;

	const [em, ph, fn, ln] = await Promise.all([
		hashField(input.email),
		hashPhone(input.phone),
		hashField(firstName),
		hashField(lastName),
	]);

	const userData: Record<string, unknown> = {};
	if (em) userData.em = [em];
	if (ph) userData.ph = [ph];
	if (fn) userData.fn = [fn];
	if (ln) userData.ln = [ln];
	// Der fbc-Cookie hat Vorrang; sonst aus fbclid rekonstruieren.
	const fbc =
		input.fbc ||
		(input.fbclid
			? `fb.1.${Date.parse(input.receivedAt) || Date.now()}.${input.fbclid}`
			: undefined);
	if (input.fbp) userData.fbp = input.fbp;
	if (fbc) userData.fbc = fbc;
	if (input.clientIp) userData.client_ip_address = input.clientIp;
	if (input.userAgent) userData.client_user_agent = input.userAgent;

	const payload = {
		data: [
			{
				event_name: 'Lead',
				event_time: Math.floor((Date.parse(input.receivedAt) || Date.now()) / 1000),
				event_id: input.eventId,
				action_source: 'website',
				event_source_url: input.sourceUrl,
				user_data: userData,
			},
		],
		...(input.testEventCode ? { test_event_code: input.testEventCode } : {}),
	};

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);
	try {
		const res = await fetch(
			`https://graph.facebook.com/v21.0/${input.pixelId}/events?access_token=${encodeURIComponent(input.token)}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
				signal: controller.signal,
			},
		);
		if (!res.ok) {
			console.error('Meta CAPI error:', res.status, await res.text());
		}
	} catch (capiError) {
		console.error('Meta CAPI request failed:', capiError);
	} finally {
		clearTimeout(timeout);
	}
};

export default async (request: Request, context: Context) => {
	if (request.method !== 'POST') {
		return json({ success: false, error: 'Method not allowed' }, 405);
	}

	try {
		const formData = await request.formData();

		const data = {
			funnel: formData.get('funnel')?.toString() || '',
			company: formData.get('company')?.toString() || '',
			name: formData.get('name')?.toString() || '',
			email: formData.get('email')?.toString() || '',
			phone: formData.get('phone')?.toString() || undefined,
			answers: parseJson(formData.get('answers')?.toString() || '[]', []),
			utm: parseJson(formData.get('utm')?.toString() || '{}', {}),
			page: formData.get('page')?.toString() || undefined,
			eventId: formData.get('eventId')?.toString() || undefined,
			letterRef: formData.get('letterRef')?.toString() || undefined,
			honeypot: formData.get('honeypot')?.toString() || '',
		};

		const result = leadSchema.safeParse(data);

		if (!result.success) {
			const fieldErrors: Record<string, string[]> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as string;
				if (!fieldErrors[field]) fieldErrors[field] = [];
				fieldErrors[field].push(issue.message);
			}
			return json({ success: false, errors: fieldErrors }, 400);
		}

		if (result.data.honeypot) {
			return json({ success: true });
		}

		const lead = result.data;
		const receivedAt = new Date().toISOString();
		const geo = {
			city: context.geo?.city,
			country: context.geo?.country?.name,
			subdivision: context.geo?.subdivision?.name,
		};
		const userAgent = request.headers.get('user-agent') || undefined;

		// Lead dauerhaft ablegen - E-Mail ist nur die Benachrichtigung.
		// Abrufbar über das Netlify-Dashboard (Blobs) oder `netlify blobs:list funnel-leads`.
		try {
			const store = getStore('funnel-leads');
			const day = receivedAt.slice(0, 10);
			const key = `${day}/${receivedAt}-${crypto.randomUUID().slice(0, 8)}`;
			await store.setJSON(key, {
				receivedAt,
				funnel: lead.funnel,
				company: lead.company,
				name: lead.name,
				email: lead.email,
				phone: lead.phone,
				answers: lead.answers,
				attribution: lead.utm,
				letterRef: lead.letterRef,
				page: lead.page,
				geo,
				userAgent,
			});
		} catch (blobError) {
			console.error('Blob store error:', blobError);
		}

		// Meta Conversions API - serverseitiges Lead-Event (best-effort).
		// Nur senden, wenn Pixel-ID + Token konfiguriert sind. Die Attribution
		// (_fbp/_fbc/fbclid) liefert das Frontend nur nach Marketing-Consent mit,
		// sodass ohne Einwilligung keine Cookie-basierte Zuordnung stattfindet.
		const metaPixelId = Netlify.env.get('META_PIXEL_ID');
		const metaCapiToken = Netlify.env.get('META_CAPI_TOKEN');
		if (metaPixelId && metaCapiToken) {
			const attribution = lead.utm || {};
			const clientIp =
				request.headers.get('x-nf-client-connection-ip') ||
				request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
				undefined;
			await sendMetaCapiLead({
				pixelId: metaPixelId,
				token: metaCapiToken,
				eventId: lead.eventId,
				email: lead.email,
				phone: lead.phone,
				name: lead.name,
				fbp: attribution._fbp,
				fbc: attribution._fbc,
				fbclid: attribution.fbclid,
				sourceUrl: lead.page,
				clientIp,
				userAgent,
				receivedAt,
				testEventCode: Netlify.env.get('META_CAPI_TEST_EVENT_CODE'),
			});
		}

		const plunkSecretKey = Netlify.env.get('PLUNK_SECRET_KEY');
		const contactEmail = Netlify.env.get('CONTACT_NOTIFICATION_EMAIL');

		if (plunkSecretKey && contactEmail) {
			const answersHtml = lead.answers
				.map(
					(a) => `
            <p><strong>${a.question}</strong><br />
            ${a.answer}${a.detail ? `<br /><em style="white-space: pre-wrap">${a.detail}</em>` : ''}</p>
          `,
				)
				.join('');

			const utmEntries = Object.entries(lead.utm || {});
			const utmHtml = utmEntries.length
				? `<p><strong>Kampagnen-Daten:</strong><br />${utmEntries
						.map(([key, value]) => `${key}: ${value}`)
						.join('<br />')}</p>`
				: '';

			// Herkunft prominent oben: welcher Angle/Funnel + (falls gesetzt) welche Kampagne/Anzeige.
			const FUNNEL_LABELS: Record<string, string> = {
				'software-analyse': 'Angle 1 · Live-Zahlen / Software-Analyse',
				'live-zahlen': 'Angle 1 · Live-Zahlen',
				zeitfresser: 'Angle 2 · Zeitfresser / KI',
				'eigene-software': 'Angle 3 · Lizenz / Eigene Software',
				// Brief-Kanal (/b/) — eine Variante pro Branchencluster.
				'brief-fertigung': 'Brief · Fertigung & Handwerk',
			};
			const utm = lead.utm || {};
			const angleLabel = FUNNEL_LABELS[lead.funnel] || lead.funnel;
			const campaignBits = [utm.utm_campaign, utm.utm_content, utm.utm_source]
				.filter(Boolean)
				.join(' · ');
			const originHtml = `
				<div style="background:#f0f4ff;border:1px solid #c7d2fe;border-radius:8px;padding:12px 16px;margin-bottom:16px">
					<strong>Kam über:</strong> ${angleLabel}
					${lead.letterRef ? `<br /><strong>Brief-Kennung:</strong> <code>${lead.letterRef}</code>` : ''}
					${campaignBits ? `<br /><strong>Kampagne/Anzeige:</strong> ${campaignBits}` : ''}
				</div>`;

			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 8000);

			try {
				await fetch('https://next-api.useplunk.com/v1/send', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${plunkSecretKey}`,
					},
					body: JSON.stringify({
						to: contactEmail,
						from: 'kontakt@rocketbase.io',
						subject: `Funnel-Lead (${lead.funnel}): ${lead.company}`,
						body: `
              ${originHtml}
              <p><strong>Firma:</strong> ${lead.company}</p>
              <p><strong>Name:</strong> ${lead.name}</p>
              <p><strong>E-Mail:</strong> ${lead.email}</p>
              ${lead.phone ? `<p><strong>Telefon:</strong> ${lead.phone}</p>` : ''}
              <hr />
              ${answersHtml}
              <hr />
              ${lead.page ? `<p><strong>Seite:</strong> ${lead.page}</p>` : ''}
              ${geo.city ? `<p><strong>Herkunft:</strong> ${[geo.city, geo.subdivision, geo.country].filter(Boolean).join(', ')}</p>` : ''}
              ${utmHtml}
            `,
					}),
					signal: controller.signal,
				});
			} catch (emailError) {
				console.error('Plunk email error:', emailError);
			} finally {
				clearTimeout(timeout);
			}
		}

		return json({ success: true });
	} catch (error) {
		console.error('Funnel lead error:', error);
		return json(
			{
				success: false,
				errors: { form: ['Ein unerwarteter Fehler ist aufgetreten.'] },
			},
			500,
		);
	}
};

export const config = {
	path: '/api/funnel-lead',
};
